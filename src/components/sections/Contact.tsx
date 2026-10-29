import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { ThinkingOrb } from 'thinking-orbs'
import { profile, socials } from '@/data/profile'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <Reveal className="glass overflow-hidden px-6 py-16 text-center md:px-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber/30 via-violet/30 to-sky/30 blur-3xl"
        />
        <div className="relative mx-auto mb-8 grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-black/30">
          <ThinkingOrb state="composing" size={64} theme="dark" color="#c4b5fd" />
        </div>
        <AnimatedText
          as="h2"
          id="contact-title"
          text="Let's build something together"
          className="relative mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl"
        />
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted">
          Open to full-stack and backend roles, freelance builds and product collaborations.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={`mailto:${profile.email}`} icon={<Mail size={16} />}>
            {profile.email}
          </Button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'done' : 'copy'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy email'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <ul className="relative mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-paper"
              >
                {s.label}
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
