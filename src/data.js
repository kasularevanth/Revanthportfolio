export const links = {
  email: 'kasularevanth1@gmail.com',
  linkedin: 'https://linkedin.com/in/revanth-kasula',
  github: 'https://github.com/kasularevanth',
  leetcode: 'https://leetcode.com/u/kasularevanth1/',
  hackerrank: 'https://www.hackerrank.com/profile/kasularevanth1',
}

export const experience = [
  {
    period: 'April 2025 – now',
    company: 'Persist Ventures',
    role: 'Full Stack Developer & Co-founder, Backend Lead',
    place: 'Remote',
    points: [
      'Own the end-to-end architecture of HeyCLO and Vyspar AI, from API design to deploys',
      'Designed 20+ REST APIs for auth, chat and file management with strict security and latency targets',
      'Real-time WebSocket workflows and scheduled data pipelines, including a daily 2 AM UTC ingestion',
      'Rate limiting, pagination, Redis caching and async job queues to stay stable through traffic spikes',
      'WhatsApp engagement automation; better logging and error handling cut recurring production issues by 30%',
      'AI-assisted development with Cursor and Windsurf shortened development cycles by 40%',
    ],
  },
  {
    period: 'June 2022 – March 2024',
    company: 'Argano',
    role: 'Associate Technical Consultant',
    place: 'Hybrid',
    points: [
      'Automated provisional credit limit assignment across enterprise systems, cutting manual effort by 25%',
      'Refactored legacy async checkout flows, removing duplicate API calls and improving transaction stability by 20%',
      'Server-side validation for coupons and shipping rules that helped lift average order value by 15%',
      'Connected Oracle Commerce Cloud with Oracle EBS for enterprise-scale transaction volumes',
      'Received the Best Client Experience award',
    ],
  },
  {
    period: 'June 2018 – July 2022',
    company: 'Guru Nanak Institute of Technical Campus',
    role: 'B.Tech, Computer Science and Engineering. GPA 8.05',
    place: 'Rangareddy',
    points: [],
  },
]

export const projects = [
  {
    id: 'vyspar',
    name: 'Vyspar AI',
    kind: 'Healthcare professional network',
    hue: 'amber',
    summary:
      'A network where healthcare providers, students, organizations and advertisers meet. Providers keep their credentials verified, organizations manage compliance for their staff, and everyone talks in real time.',
    built: [
      'FastAPI and async PostgreSQL services for real-time chat, file uploads and social integrations',
      'Live messaging over WebSockets with end-to-end encrypted group keys',
      'Credentialing and compliance: licences, NPI ownership checks, continuing education, PDF resume export',
      'UltraCart checkout with webhook-driven subscriptions, token packs and ad billing',
      'Celery and Redis background jobs for scheduled content updates and Instagram sync',
      'Alembic migrations and backfills that upgrade production data without downtime',
    ],
    stack: ['React 19', 'Vite 7', 'Redux Toolkit', 'Tailwind', 'Framer Motion', 'Recharts', 'FastAPI', 'SQLAlchemy (async)', 'PostgreSQL', 'Alembic', 'Celery', 'Redis', 'WebSockets', 'JWT', 'AWS S3', 'Google APIs', 'OpenAI', 'Docker'],
  },
  {
    id: 'heyclo',
    name: 'HeyCLO',
    kind: 'Voice-first AI confidant',
    hue: 'sky',
    summary:
      'You talk, CLO listens. A voice companion that asks thoughtful questions about your relationships and yourself, and helps you notice emotional patterns you would miss alone.',
    built: [
      'Launched on Node.js and MongoDB with secure sign-in and transcript sharing for 100+ early users',
      'RAG pipelines over past conversations improved insight relevance by 40%',
      'Led the move to a FastAPI backend: platform, auth, CI, voice and background jobs',
      'Real-time voice conversations over WebSockets, with Whisper transcription and Cartesia speech',
      'Long-term chat memory with pgvector recall, streamed journeys over server-sent events',
      'RevenueCat subscriptions, Firebase auth, FCM/APNs reminders and an MCP server with OAuth',
    ],
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic', 'WebSockets', 'SSE', 'OpenAI GPT', 'Whisper', 'Cartesia', 'RevenueCat', 'Firebase', 'MCP', 'AWS S3', 'React 19', 'TypeScript', 'TanStack Query', 'Tailwind', 'Motion', 'Vitest', 'Playwright', 'Docker'],
  },
  {
    id: 'chainreach',
    name: 'Chain Reach',
    kind: 'Web3 marketing and ad-tech platform',
    hue: 'lilac',
    summary:
      'Brands fund campaigns, creators post, and the money moves only when the post is verified. No middleman holding the payout.',
    built: [
      'VaultEscrow smart contracts in Solidity and Hardhat on BNB Smart Chain that release payouts after verification',
      'Automated verification pipeline with Apify and social media APIs that checks creator posts against the brief',
      'Node.js, Express and PostgreSQL backend with JWT and bcrypt auth, files on AWS S3',
      'Dockerized and deployed on AWS EC2 with matching dev and production environments',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Solidity', 'Hardhat', 'BSC', 'Wagmi', 'Viem', 'Ethers.js', 'Apify', 'Docker', 'AWS EC2', 'AWS S3', 'JWT'],
  },
  {
    id: 'oracle',
    name: 'Oracle Commerce at Argano',
    kind: 'Enterprise commerce consulting',
    hue: 'amber',
    summary:
      'Configure-price-quote and storefront work for global clients, from the quoting UI down to checkout, payments and credit.',
    built: [
      'Avery Dennison: rebuilt the CPQ interface, lifting active users by 30%',
      'Automated provisional credit limits, cutting manual processing by 25%',
      'Refactored async checkout flows for 20% better transaction stability',
      'Coupon and shipping validation that helped raise average order value by 15%',
      'United States Pharmacopeia: pay several invoices in one card payment, with currency conversion',
    ],
    stack: ['Oracle CPQ', 'BML', 'Oracle Commerce Cloud', 'Oracle EBS', 'JavaScript', 'REST APIs', 'Dell Boomi'],
  },
]

export const earlier = [
  { name: 'Heart disease prediction', note: 'Random forest model for early detection' },
  { name: 'IPL analysis', note: 'Pandas, scikit-learn and seaborn on match data' },
  { name: 'Face recognition', note: 'Real-time detection from camera input' },
  { name: 'Angular store', note: 'Product catalogue with full CRUD' },
]

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Solidity', 'Java'] },
  { group: 'Frontend', items: ['React 19', 'Next.js 15', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query', 'React Hook Form', 'Zod', 'Motion', 'GSAP', 'Recharts', 'Angular'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST', 'WebSockets', 'Server-sent events', 'Celery', 'Job queues & cron', 'Rate limiting', 'JWT & bcrypt'] },
  { group: 'Data', items: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic', 'MongoDB', 'Redis', 'Supabase', 'MySQL'] },
  { group: 'AI & voice', items: ['OpenAI GPT', 'Whisper', 'Cartesia', 'RAG pipelines', 'Vector memory', 'MCP servers', 'Cursor', 'Windsurf'] },
  { group: 'Cloud & DevOps', items: ['AWS EC2', 'AWS S3', 'Docker', 'GitHub Actions', 'Firebase', 'FCM & APNs'] },
  { group: 'Web3', items: ['Solidity', 'Hardhat', 'Ethers.js', 'Wagmi', 'Viem', 'BNB Smart Chain'] },
  { group: 'Payments & integrations', items: ['RevenueCat', 'UltraCart', 'WhatsApp automation', 'Apify', 'Google APIs', 'Resend'] },
  { group: 'Commerce', items: ['Oracle CPQ', 'BML', 'Oracle Commerce Cloud', 'Oracle EBS', 'Dell Boomi'] },
]
