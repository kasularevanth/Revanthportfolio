export type Accent = 'amber' | 'sky' | 'violet'

export interface Project {
  id: string
  name: string
  kind: string
  accent: Accent
  featured?: boolean
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Job {
  period: string
  company: string
  role: string
  place: string
  points: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface NavItem {
  id: string
  label: string
}
