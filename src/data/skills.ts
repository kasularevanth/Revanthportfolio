import type { SkillGroup } from '@/types'

export const skills: SkillGroup[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Solidity', 'Java'] },
  { group: 'Frontend', items: ['React 19', 'Next.js 15', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query', 'React Hook Form', 'Zod', 'Framer Motion', 'Recharts'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST', 'WebSockets', 'Server-sent events', 'Celery', 'Cron & job queues', 'Rate limiting', 'JWT & bcrypt'] },
  { group: 'Data', items: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic', 'MongoDB', 'Redis', 'Supabase', 'MySQL'] },
  { group: 'AI & voice', items: ['OpenAI GPT', 'Whisper', 'Cartesia', 'RAG pipelines', 'Vector memory', 'MCP servers', 'Cursor', 'Windsurf'] },
  { group: 'Cloud & DevOps', items: ['AWS EC2', 'AWS S3', 'Docker', 'GitHub Actions', 'Firebase', 'FCM & APNs'] },
  { group: 'Web3', items: ['Solidity', 'Hardhat', 'Ethers.js', 'Wagmi', 'Viem', 'BNB Smart Chain'] },
  { group: 'Payments & integrations', items: ['RevenueCat', 'UltraCart', 'WhatsApp automation', 'Apify', 'Google APIs', 'Resend'] },
  { group: 'Enterprise commerce', items: ['Oracle CPQ', 'BML', 'Oracle Commerce Cloud', 'Oracle EBS', 'Dell Boomi'] },
]
