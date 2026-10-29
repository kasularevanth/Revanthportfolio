import { useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToId } from '@/hooks/useSmoothScroll'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/cn'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex max-w-content items-center justify-between rounded-full px-3 py-2 transition-all duration-500',
          scrolled ? 'glass-strong' : 'border border-transparent',
        )}
      >
        <a href="#top" onClick={go('top')} className="flex items-center gap-2 rounded-full px-3 py-1.5 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber to-violet text-xs text-ink">RK</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-300',
                  active === item.id ? 'text-paper' : 'text-muted hover:text-paper',
                )}
              >
                {item.label}
              </a>
              {active === item.id && (
                <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-full bg-white/10" />
              )}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:bg-amber md:inline-block"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="glass-strong mx-auto mt-2 flex max-w-content flex-col rounded-3xl p-2 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={go(item.id)} className="block rounded-2xl px-4 py-3 text-paper hover:bg-white/5">
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
