import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/cn'

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  /** RGB triplet for the glow, e.g. "255 181 71" */
  glow?: string
}

/** Glass card with a soft light that follows the pointer across its surface. */
export function SpotlightCard({ children, className, glow = '255 255 255', ...props }: SpotlightCardProps) {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(${glow} / 0.14), transparent 70%)`
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(${glow} / 0.55), transparent 70%)`

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }
  const onPointerLeave = () => {
    x.set(-400)
    y.set(-400)
  }

  return (
    <motion.div
      className={cn('glass group overflow-hidden', className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...props}
    >
      {/* lit border: a gradient masked down to the 1px edge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: border,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
