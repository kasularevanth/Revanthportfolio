import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Ashima/Stefan Gustavson 3D simplex noise, compact form.
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform vec2 uPointer;
varying float vNoise;
varying float vDepth;
${noise}
void main(){
  vec3 p = position;
  // two octaves of noise push each point out along its normal: a slow blob
  float n = snoise(p * 1.1 + vec3(uTime * 0.18)) * 0.55
          + snoise(p * 2.6 - vec3(uTime * 0.25)) * 0.18;
  // the side facing the pointer swells a little
  float lean = max(dot(normalize(p), normalize(vec3(uPointer, 0.6))), 0.0);
  p += normalize(p) * (n * 0.32 + lean * 0.18);
  vNoise = n;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = smoothstep(-3.2, 1.2, mv.z);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (3.4 + n * 2.4) * uPixelRatio * (4.6 / -mv.z);
}`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying float vNoise;
varying float vDepth;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.4, 0.5, vNoise));
  col = mix(col, uColorC, smoothstep(0.35, 0.8, vNoise));
  gl_FragColor = vec4(col * 1.25, alpha * (0.35 + vDepth * 0.65));
}`

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions.set([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius], i * 3)
  }
  return positions
}

function starfield(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, -Math.random() * 14 - 2], i * 3)
  }
  return positions
}

/**
 * A breathing sphere of glowing particles over a slow starfield. It leans
 * toward the pointer, pauses offscreen and holds still for reduced motion.
 */
export default function ParticleOrb({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    const dpr = Math.min(window.devicePixelRatio, 1.75)
    renderer.setPixelRatio(dpr)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 5.2

    const orbGeo = new THREE.BufferGeometry()
    orbGeo.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(small ? 5000 : 11000, 1.35), 3))
    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uPointer: { value: new THREE.Vector2(0.4, 0.2) },
      uColorA: { value: new THREE.Color('#6d4dff') },
      uColorB: { value: new THREE.Color('#a78bfa') },
      uColorC: { value: new THREE.Color('#7fd8ff') },
    }
    const orbMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const orb = new THREE.Points(orbGeo, orbMat)
    scene.add(orb)

    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starfield(small ? 500 : 1200), 3))
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: '#cfc8ff', size: 0.035, transparent: true, opacity: 0.6, depthWrite: false }),
    )
    scene.add(stars)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // keep the orb a sensible size on narrow screens
      camera.position.z = w < 768 ? 6.4 : 5.2
      camera.updateProjectionMatrix()
    }
    resize()

    const target = new THREE.Vector2(0.4, 0.2)
    const onPointer = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
    }

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(mount)

    const clock = new THREE.Clock()
    let frame = 0
    const render = () => {
      frame = requestAnimationFrame(render)
      if (!visible) return
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      uniforms.uPointer.value.lerp(target, 0.04)
      orb.rotation.y = t * 0.08 + uniforms.uPointer.value.x * 0.35
      orb.rotation.x = -uniforms.uPointer.value.y * 0.25
      stars.rotation.y = t * 0.01
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', resize)
    if (reduce) {
      uniforms.uTime.value = 4
      renderer.render(scene, camera)
    } else {
      window.addEventListener('pointermove', onPointer)
      render()
    }

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      orbGeo.dispose()
      orbMat.dispose()
      starGeo.dispose()
      ;(stars.material as THREE.Material).dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" className={className} />
}
