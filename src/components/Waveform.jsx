import { useEffect, useRef } from 'react'

// A voice-style waveform that swells around the pointer, a nod to HeyCLO.
// `energy` (0..1) is driven from outside so scroll can calm it down.
export default function Waveform({ energyRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0.62, y: 0.5, tx: 0.62, ty: 0.5, active: 0, tActive: 0.35 }
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = (e.clientX - r.left) / r.width
      pointer.ty = (e.clientY - r.top) / r.height
      pointer.tActive = 1
    }
    const onLeave = () => { pointer.tActive = 0.35 }

    const lines = [
      { color: '#ffb547', amp: 1, freq: 1, speed: 1, width: 2.2, alpha: 1 },
      { color: '#7fd8ff', amp: 0.75, freq: 1.35, speed: -0.8, width: 1.6, alpha: 0.85 },
      { color: '#c9b8ff', amp: 0.5, freq: 1.9, speed: 1.4, width: 1.1, alpha: 0.6 },
      { color: '#f3efff', amp: 0.28, freq: 2.6, speed: -1.7, width: 0.8, alpha: 0.35 },
    ]

    const draw = () => {
      t += reduce ? 0 : 0.016
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      pointer.active += (pointer.tActive - pointer.active) * 0.04
      const energy = energyRef?.current ?? 1

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      const mid = h * 0.5
      const base = Math.min(h * 0.32, 220) * energy

      for (const l of lines) {
        ctx.beginPath()
        ctx.lineWidth = l.width
        ctx.strokeStyle = l.color
        ctx.globalAlpha = l.alpha
        for (let x = 0; x <= w; x += 3) {
          const u = x / w
          // bell-shaped envelope centred on the pointer, plus a quiet idle swell
          const d = u - pointer.x
          const env = Math.exp(-(d * d) / 0.018) * (0.35 + pointer.active * 0.9) + 0.12 * Math.sin(u * Math.PI)
          const y = mid
            + Math.sin(u * 22 * l.freq + t * 3 * l.speed) * base * l.amp * env
            * (0.6 + 0.4 * Math.sin(t * 1.3 + u * 6))
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    // With reduced motion the wave only redraws in answer to the pointer.
    const onMoveReduced = (e) => {
      onMove(e)
      pointer.x = pointer.tx
      pointer.active = pointer.tActive = 1
      draw()
    }
    const move = reduce ? onMoveReduced : onMove
    const onResize = () => { resize(); if (reduce) draw() }

    resize()
    draw()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [energyRef])

  return <canvas ref={canvasRef} className="wave" aria-hidden="true" />
}
