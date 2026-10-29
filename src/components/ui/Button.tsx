import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'glass'
  icon?: ReactNode
}

export function Button({ variant = 'primary', icon, className, children, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300',
        variant === 'primary' &&
          'bg-paper text-ink shadow-[0_0_0_0_rgba(255,181,71,0)] hover:shadow-[0_8px_30px_-6px_rgba(255,181,71,0.55)] hover:-translate-y-0.5',
        variant === 'glass' &&
          'border border-white/15 bg-white/5 text-paper backdrop-blur-md hover:border-white/30 hover:bg-white/10',
        className,
      )}
      {...props}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </a>
  )
}
