import { KineticText, type KineticWord } from '@/components/ui/KineticText'

const words: KineticWord[] = [
  { text: 'I' },
  { text: 'build' },
  { text: 'software' },
  { text: 'that' },
  { text: 'listens,', accent: true },
  { text: 'thinks', accent: true },
  { text: 'and' },
  { text: 'scales.', accent: true },
  { text: 'Designed' },
  { text: 'with' },
  { text: 'care,' },
  { text: 'engineered' },
  { text: 'to' },
  { text: 'last.', accent: true },
]

export function Manifesto() {
  return (
    <section aria-label="What I do">
      <KineticText
        words={words}
        className="font-display text-[clamp(2.2rem,6.5vw,5.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
      />
    </section>
  )
}
