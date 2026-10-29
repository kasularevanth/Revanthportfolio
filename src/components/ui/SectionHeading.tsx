import { AnimatedText } from './AnimatedText'
import { Reveal } from './Reveal'
import { ScrambleText } from './ScrambleText'

// "Selected work" -> "SelectedWork", styled like a React component tag
const toPascalCase = (s: string) =>
  s.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')

interface SectionHeadingProps {
  id: string
  title: string
  description?: string
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <ScrambleText
        text={`<${toPascalCase(title)} />`}
        className="mb-4 block text-sm font-medium tracking-wide text-sky/80"
      />
      <AnimatedText
        as="h2"
        text={title}
        id={`${id}-title`}
        className="font-display text-4xl font-bold tracking-tight md:text-6xl"
      />
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
