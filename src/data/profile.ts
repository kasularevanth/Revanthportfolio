import type { NavItem } from '@/types'

export const profile = {
  name: 'Revanth Kasula',
  role: 'Full-stack engineer',
  status: 'Co-founder & Backend Lead at Persist Ventures',
  location: 'Telangana, India',
  email: 'kasularevanth1@gmail.com',
  photo: `${import.meta.env.BASE_URL}revanth.jpg`,
  rotating: ['real-time backends', 'voice AI products', 'healthcare platforms', 'Web3 escrow systems'],
  about: [
    'I am a full-stack engineer and the co-founder and backend lead at Persist Ventures, where I architect HeyCLO and Vyspar AI from the API layer to production.',
    'Before that I spent two years at Argano making Oracle Commerce faster and more reliable for global clients, and won their Best Client Experience award.',
    'I care about systems that stay calm under load: clean APIs, real-time pipelines, careful migrations, and AI features that actually help people.',
  ],
  facts: [
    { value: '3+ yrs', label: 'shipping production software' },
    { value: '20+', label: 'REST APIs designed at Persist' },
    { value: '100+', label: 'early users on HeyCLO' },
  ],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/kasularevanth' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/revanth-kasula' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/kasularevanth1/' },
  { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/kasularevanth1' },
]

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
