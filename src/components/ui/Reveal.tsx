import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/motion'

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
