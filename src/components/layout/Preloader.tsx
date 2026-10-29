import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Short intro: a counter runs to 100 while the name settles, then the panel
 * lifts away. Shown once per browser session, skipped for reduced motion.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('intro-seen') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const width = useTransform(count, (v) => `${v}%`)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const controls = animate(count, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem('intro-seen', '1')
        } catch {
          /* storage blocked: the intro simply shows again next time */
        }
        setShow(false)
      },
    })
    return () => controls.stop()
  }, [show, count, onDone])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = ''
        onDone()
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted"
          >
            Revanth Kasula — Portfolio {new Date().getFullYear()}
          </motion.p>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-[-0.04em]"
            >
              Designing <span className="font-serif font-normal italic text-gradient">systems</span>
            </motion.p>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <span className="text-sm text-muted">Loading experience</span>
              <motion.span className="font-display text-5xl font-bold tabular-nums md:text-7xl">{rounded}</motion.span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-amber via-violet to-sky" style={{ width }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
