import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'vyspar',
    name: 'Vyspar AI',
    kind: 'Healthcare professional network',
    accent: 'amber',
    featured: true,
    summary:
      'A network where healthcare providers, students, organizations and advertisers meet. Providers keep credentials verified, organizations manage staff compliance, and everyone talks in real time.',
    highlights: [
      'FastAPI and async PostgreSQL services for real-time chat, file uploads and social integrations',
      'Live messaging over WebSockets with end-to-end encrypted group keys',
      'Credentialing and compliance: licences, NPI ownership checks, continuing education, PDF resume export',
      'UltraCart checkout with webhook-driven subscriptions, token packs and ad billing',
      'Celery and Redis background jobs; Alembic migrations and backfills with zero downtime',
    ],
    stack: ['React 19', 'Vite 7', 'Redux Toolkit', 'Tailwind', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Celery', 'Redis', 'WebSockets', 'AWS S3', 'Google APIs', 'OpenAI'],
  },
  {
    id: 'heyclo',
    name: 'HeyCLO',
    kind: 'Voice-first AI confidant',
    accent: 'sky',
    featured: true,
    summary:
      'You talk, CLO listens. A voice companion that asks thoughtful questions about your relationships and yourself, and helps you notice emotional patterns you would miss alone.',
    highlights: [
      'Launched on Node.js and MongoDB with secure sign-in and transcript sharing for 100+ early users',
      'RAG pipelines over past conversations improved insight relevance by 40%',
      'Led the move to FastAPI: platform, auth, CI, voice and background jobs',
      'Real-time voice over WebSockets with Whisper transcription and Cartesia speech',
      'pgvector chat memory, RevenueCat subscriptions, Firebase auth, push reminders and an MCP server',
    ],
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'pgvector', 'WebSockets', 'SSE', 'OpenAI', 'Whisper', 'Cartesia', 'RevenueCat', 'Firebase', 'MCP', 'React 19', 'TypeScript', 'TanStack Query'],
  },
  {
    id: 'chainreach',
    name: 'Chain Reach',
    kind: 'Web3 marketing & ad-tech platform',
    accent: 'violet',
    summary:
      'Brands fund campaigns, creators post, and payouts release only after the post is verified. No middleman holding the money.',
    highlights: [
      'VaultEscrow smart contracts in Solidity and Hardhat on BNB Smart Chain',
      'Automated post verification with Apify and social media APIs',
      'Node.js, Express and PostgreSQL backend with JWT auth and S3 storage',
      'Dockerized and deployed on AWS EC2',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Solidity', 'Hardhat', 'Wagmi', 'Viem', 'Ethers.js', 'Docker', 'AWS EC2'],
  },
  {
    id: 'oracle',
    name: 'Oracle Commerce',
    kind: 'Enterprise consulting at Argano',
    accent: 'amber',
    summary:
      'Configure-price-quote and storefront work for global clients, from the quoting UI down to checkout, payments and credit.',
    highlights: [
      'Rebuilt the Avery Dennison CPQ interface, lifting active users by 30%',
      'Automated provisional credit limits, cutting manual processing by 25%',
      'Refactored async checkout flows for 20% better transaction stability',
      'Coupon and shipping validation that helped raise average order value by 15%',
    ],
    stack: ['Oracle CPQ', 'BML', 'Oracle Commerce Cloud', 'Oracle EBS', 'JavaScript', 'REST APIs', 'Dell Boomi'],
  },
]
