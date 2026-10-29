import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-content flex-col items-center justify-between gap-2 border-t border-white/10 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>Built with React, TypeScript, Tailwind and Framer Motion</p>
    </footer>
  )
}
