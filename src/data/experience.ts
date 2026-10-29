import type { Job } from '@/types'

export const experience: Job[] = [
  {
    period: 'Apr 2025 – Present',
    company: 'Persist Ventures',
    role: 'Full Stack Developer & Co-founder, Backend Lead',
    place: 'Remote',
    points: [
      'Own the end-to-end architecture of HeyCLO and Vyspar AI, from API design to deploys',
      'Designed 20+ REST APIs for auth, chat and file management with strict security and latency targets',
      'Real-time WebSocket workflows and scheduled pipelines, including a daily 2 AM UTC ingestion',
      'Rate limiting, pagination, Redis caching and async job queues to stay stable through traffic spikes',
      'WhatsApp engagement automation; better logging and error handling cut recurring production issues by 30%',
      'AI-assisted development with Cursor and Windsurf shortened development cycles by 40%',
    ],
  },
  {
    period: 'Jun 2022 – Mar 2024',
    company: 'Argano',
    role: 'Associate Technical Consultant',
    place: 'Hybrid',
    points: [
      'Automated provisional credit limit assignment across enterprise systems, cutting manual effort by 25%',
      'Refactored legacy async checkout flows, improving transaction stability by 20%',
      'Server-side coupon and shipping validation that helped lift average order value by 15%',
      'Connected Oracle Commerce Cloud with Oracle EBS for enterprise-scale transaction volumes',
      'Received the Best Client Experience award',
    ],
  },
  {
    period: 'Jun 2018 – Jul 2022',
    company: 'Guru Nanak Institute of Technical Campus',
    role: 'B.Tech, Computer Science and Engineering, GPA 8.05',
    place: 'Rangareddy',
    points: [],
  },
]
