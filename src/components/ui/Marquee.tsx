import { cn } from '@/lib/cn'

/** An endless row of items that drifts sideways and pauses on hover. */
export function Marquee({ items, reverse, className }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((item) => (
        <li
          key={item}
          className="glass flex items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 text-sm text-paper/85"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber to-violet" />
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={cn('group relative flex overflow-hidden py-2', className)}
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className={cn(
          'flex w-max group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
