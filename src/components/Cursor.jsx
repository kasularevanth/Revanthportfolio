import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A soft ring that trails the pointer and grows over links. Fine pointers only.
export default function Cursor() {
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const el = ring.current
    el.style.display = 'block'
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    const move = (e) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e) => el.classList.toggle('is-link', !!e.target.closest('a, button'))
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return <div ref={ring} className="cursor" aria-hidden="true" />
}
