import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Smooth wheel scrolling, skipped when the user prefers reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.1 })
    let frame = 0
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // In-page links glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || e.defaultPrevented) return
      e.preventDefault()
      scrollToId(link.hash.slice(1))
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: -80 })
  else target.scrollIntoView({ behavior: 'smooth' })
}
