import { useMemo, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/cn'

export interface KineticWord {
  text: string
  /** Render in the italic serif accent face */
  accent?: boolean
}

// Deterministic pseudo-random so every load scatters words the same way.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function Word({ word, index, total, progress }: { word: KineticWord; index: number; total: number; progress: MotionValue<number> }) {
  const scatter = useMemo(
    () => ({ x: (rand(index + 1) - 0.5) * 520, y: (rand(index + 7) - 0.5) * 360, r: (rand(index + 3) - 0.5) * 30 }),
    [index],
  )
  // Each word lands in turn, overlapping its neighbours.
  const start = (index / total) * 0.55
  const end = start + 0.4
  const x = useTransform(progress, [start, end], [scatter.x, 0])
  const y = useTransform(progress, [start, end], [scatter.y, 0])
  const rotate = useTransform(progress, [start, end], [scatter.r, 0])
  const opacity = useTransform(progress, [start, end], [0, 1])
  const blur = useTransform(progress, [start, end], [16, 0])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.span
      style={{ x, y, rotate, opacity, filter }}
      className={cn(
        'mr-[0.25em] inline-block will-change-transform',
        word.accent && 'font-serif italic font-normal text-gradient pr-[0.08em]',
      )}
    >
      {word.text}
    </motion.span>
  )
}

/**
 * A pinned statement whose words start scattered and blurred, then fly into
 * place as the reader scrolls through the section.
 */
export function KineticText({ words, className }: { words: KineticWord[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sentence = words.map((w) => w.text).join(' ')
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className="flex min-h-[60svh] items-center justify-center px-4">
        <p className={cn('max-w-5xl text-center', className)}>
          {words.map((w, i) => (
            <span key={i} className={cn('mr-[0.25em]', w.accent && 'font-serif italic font-normal text-gradient')}>
              {w.text}
            </span>
          ))}
        </p>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-4">
        <p className={cn('max-w-5xl text-center', className)}>
          <span className="sr-only">{sentence}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
            ))}
          </span>
        </p>
      </div>
    </div>
  )
}
