import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '@/lib/motion'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
}

/** Cycles through words, each one sliding up and out as the next arrives. */
export function RotatingText({ words, interval = 2600, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval])

  return (
    <span className="relative inline-grid overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className={className}
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
