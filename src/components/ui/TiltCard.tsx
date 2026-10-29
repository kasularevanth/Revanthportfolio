import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

/** Tilts gently toward the pointer in 3D, springing flat again on leave. */
export function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springCfg = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springCfg)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springCfg)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={cn('[perspective:1400px]', className)}>
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
