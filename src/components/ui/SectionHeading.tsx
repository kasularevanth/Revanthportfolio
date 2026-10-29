import { AnimatedText } from './AnimatedText'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  title: string
  description?: string
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
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
