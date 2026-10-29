import type { Transition, Variants } from 'framer-motion'

// One easing curve for the whole site keeps motion consistent.
export const ease = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 380, damping: 32 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewport = { once: true, margin: '-80px' } as const
