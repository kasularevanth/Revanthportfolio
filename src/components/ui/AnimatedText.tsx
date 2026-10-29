import { motion, type Variants } from 'framer-motion'
import { ease, viewport } from '@/lib/motion'
import { cn } from '@/lib/cn'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface AnimatedTextProps {
  text: string
  id?: string
  as?: Tag
  className?: string
  /** Animate by letter (headlines) or by word (sentences). */
  by?: 'letter' | 'word'
  delay?: number
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean
}

const container = (delay: number, by: 'letter' | 'word'): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: by === 'letter' ? 0.03 : 0.045, delayChildren: delay } },
})

const piece: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(10px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

/**
 * Text that rises out of a mask piece by piece. Screen readers get the
 * plain string; the split pieces are hidden from them.
 */
export function AnimatedText({ text, id, as = 'p', className, by = 'word', delay = 0, immediate }: AnimatedTextProps) {
  const MotionTag = motion[as]
  const words = text.split(' ')

  const trigger = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport }

  return (
    <MotionTag id={id} className={cn(className)} variants={container(delay, by)} {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {by === 'word' ? (
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block will-change-transform" variants={piece}>
                {word}
              </motion.span>
            </span>
          ) : (
            [...word].map((char, ci) => (
              <span key={ci} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span className="inline-block will-change-transform" variants={piece}>
                  {char}
                </motion.span>
              </span>
            ))
          )}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </MotionTag>
  )
}
