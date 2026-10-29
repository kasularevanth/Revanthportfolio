import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ScrambleTextProps {
  text: string
  className?: string
  /** ms before the decode starts once visible */
  delay?: number
  /** ms for the whole string to resolve */
  duration?: number
}

/**
 * Text that decodes from random glyphs into the real string, left to right,
 * the first time it scrolls into view. Re-runs whenever `text` changes.
 */
export function ScrambleText({ text, className, delay = 0, duration = 900 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [output, setOutput] = useState(text)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text)
      return
    }
    let frame = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now + delay
      const progress = Math.max(0, Math.min(1, (now - start) / duration))
      const resolved = Math.floor(progress * text.length)
      let next = text.slice(0, resolved)
      for (let i = resolved; i < text.length; i++) {
        next += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOutput(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, text, delay, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  )
}
