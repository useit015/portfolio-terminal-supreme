import { PortfolioContent } from './types';

const content: PortfolioContent = {
  identity: {
    title: 'Oussama Nahiz | Terminal Portfolio',
    username: 'oussama',
    hostname: 'portfolio',
    name: 'Oussama Nahiz',
    role: 'Senior full-stack engineer',
    location: 'Casablanca Metropolitan Area, Morocco',
    intro:
      'Senior full-stack engineer and 42-grad with 9+ years shipping production software across React, Node.js, TypeScript, and AI.',
    summary:
      "I work best on end-to-end product problems, from architecture and infrastructure to front end, testing, and deployment. I've solo-delivered a six-figure enterprise app, led product teams, shipped 8 Toptal engagements, and most recently co-founded a fintech startup as CTO.",
    availability:
      'Open to direct-hire roles, selective consulting, and ambitious product work with real-world users.',
  },
  banner: [
    '  ____  __  __  _____ ____    _    __  __    _',
    ' / __ \\/ / / / / ___// __ \\  / |  / / / /   / |',
    '/ / / / / / /  \\__ \\/ /_/ / /  | / / / /   /  |',
    '/ /_/ / /_/ /  ___/ / ____/ / /| |/ /_/ /___/ /| |',
    '\\____/\\____/  /____/_/     /_/ |_/_____/____/_/ |_|',
    '',
    'terminal portfolio v1',
  ],
  boot: [
    'Portfolio runtime initialized.',
    'Loaded profile, selected work, and contact routes.',
    'Type `help` to navigate.',
  ],
  links: [
    {
      label: 'Email',
      href: 'mailto:useit015@gmail.com',
      display: 'useit015@gmail.com',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/useit015',
      display: 'github.com/useit015',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/useit015',
      display: 'linkedin.com/in/useit015',
    },
  ],
  highlights: [
    'Solo-built the Radiometer Course Creator and delivered a six-figure enterprise deal.',
    'Led a 9-person engineering org as co-founder and CTO at LendStack.',
    'Delivered 8 Toptal engagements across healthcare, insurance, media, agritech, and AI.',
    'Builds across product surfaces, infra, AI tooling, realtime systems, and game-tech experiments.',
  ],
  skills: [
    {
      category: 'Core stack',
      items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS'],
    },
    {
      category: 'Backend and data',
      items: ['NestJS', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs'],
    },
    {
      category: 'Cloud and delivery',
      items: ['AWS SAM', 'Lambda', 'API Gateway', 'S3', 'Docker', 'CI/CD'],
    },
    {
      category: 'AI and ML-adjacent',
      items: ['OpenAI APIs', 'OpenRouter', 'Replicate', 'FAL', 'annotation workflows', 'OCR/KYC flows'],
    },
    {
      category: 'Specialty work',
      items: ['React Native', 'Flutter', 'WebRTC', 'Pixi.js 8', 'Three.js', 'game-loop architecture'],
    },
  ],
  experience: [
    {
      company: 'Acurai',
      role: 'Senior Software Developer',
      period: 'Jan 2025 - Jun 2025',
      summary: 'Shipped the main front-end product surface for an AI startup focused on reducing hallucinations in LLMs.',
      bullets: [
        'Owned and shipped Chat, Wiki, and Brain Builder.',
        'Built front-end tooling for a five-person research-driven team.',
        'Worked across TypeScript, Next.js, Node.js, and AI integration workflows.',
      ],
    },
    {
      company: 'Independent',
      role: 'AI Developer and Researcher',
      period: 'Oct 2024 - Present',
      summary: 'Building AI developer tools and experimental software across AI, real-time systems, and interactive web apps.',
      bullets: [
        'Authored whichmodel, an open-source TypeScript CLI for AI model selection across providers.',
        'Built souk-fighter, a browser fighting game on Pixi.js 8, React 19, and Tailwind 4.',
        'Continued hands-on exploration across blockchain, trading research, and 3D/game work.',
      ],
    },
    {
      company: 'LendStack',
      role: 'Co-Founder and CTO',
      period: 'Oct 2023 - May 2024',
      summary: 'Co-founded a microfinance operating system for lending startups and ran the technical side of the company.',
      bullets: [
        'Led a 9-person engineering team inside a 14-person startup.',
        'Shipped the platform to two pilot clients in Zambia with 12 prospects in the pipeline.',
        'Owned architecture across Next.js, Node.js microservices, KYC, OCR, and AI-assisted workflows.',
      ],
    },
    {
      company: 'Toptal Clients',
      role: 'Senior Software Engineer',
      period: 'Apr 2022 - Oct 2024',
      summary: 'Delivered 8 engagements across clients including Blue River Technology, What\'s Next Media, and Axion Ray.',
      bullets: [
        'Solo-built Clicky Clicky, a labeling toolchain for Blue River\'s See & Spray workflow.',
        'Built editorial-grade data visualizations and backend integrations for What\'s Next Media.',
        'Enhanced data-operations tooling and reusable UI primitives for Axion Ray.',
      ],
    },
    {
      company: 'VO2 Group',
      role: 'Senior Software Engineer',
      period: 'Jan 2021 - Jan 2022',
      summary: 'Delivered enterprise software across health-tech and healthcare products.',
      bullets: [
        'Solo-built the Radiometer Course Creator on React, Node.js, TypeScript, AWS SAM, and PostgreSQL.',
        'Saved roughly $20K per year by replacing a paid AQURE integration with an in-house JavaScript API layer.',
        'Led a 3-engineer team on AXA Health Keeper, including the Quasar/Vue to React/React Native migration.',
      ],
    },
    {
      company: 'Earlier roles',
      role: 'Full-stack and front-end engineering',
      period: '2016 - 2020',
      summary: 'Shipped freelance work, realtime communication products, KYC tooling, and e-commerce flows.',
      bullets: [
        'Built client sites, internal tools, and storefront work as an independent developer.',
        'Built the NestJS signaling server for Peer, a Flutter messaging and video-calling app at Spotbills.',
        'Led front-end KYC integrations at Caronae and contributed to Nespresso checkout flows at SQLI.',
      ],
    },
  ],
  projects: [
    {
      name: 'whichmodel',
      tag: 'open source',
      description:
        'A TypeScript CLI that recommends the right AI model for a task across OpenRouter, FAL, and Replicate.',
      stack: ['TypeScript', 'Node.js', 'OpenRouter', 'Replicate', 'FAL'],
      outcome: 'MIT licensed, v1.0.0, 90+ commits.',
      link: 'https://github.com/useit015/whichmodel',
    },
    {
      name: 'souk-fighter',
      tag: 'game-tech',
      description:
        'A KOF-style browser fighting game with a custom asset-pack format and a fixed-timestep engine.',
      stack: ['React 19', 'Pixi.js 8', 'Tailwind CSS 4', 'IndexedDB'],
      outcome: 'Shows engine-level breadth beyond business software.',
      link: 'https://github.com/useit015/souk-fighter',
    },
    {
      name: 'Radiometer Course Creator',
      tag: 'hero project',
      description:
        'Solo-built course-authoring platform for Radiometer\'s AQURE healthcare ecosystem.',
      stack: ['React', 'Node.js', 'TypeScript', 'AWS SAM', 'PostgreSQL'],
      outcome: 'Delivered a six-figure enterprise deal as sole engineer.',
      link: 'https://github.com/useit015',
    },
    {
      name: 'Clicky Clicky',
      tag: 'computer vision ops',
      description:
        'Solo-built a labeling tool and dashboard for See & Spray boom-height ground-truth collection.',
      stack: ['React', 'NestJS', 'MongoDB', 'Docker', 'Leaflet', 'AWS'],
      outcome: 'Built for Blue River Technology, acquired by John Deere for $300M.',
      link: 'https://github.com/useit015',
    },
    {
      name: 'AXA Health Keeper',
      tag: 'consumer health',
      description:
        'Led the front-end team on a gamified health-incentive platform and migration from Quasar/Vue.',
      stack: ['React', 'React Native', 'Redux', 'Node.js', 'MongoDB'],
      outcome: 'Combined leadership, mobile delivery, and migration work in one product.',
      link: 'https://github.com/useit015',
    },
    {
      name: 'Peer Chat',
      tag: 'realtime',
      description:
        'Hybrid mobile messaging and calling app with a custom signaling stack and deployment oversight.',
      stack: ['Flutter', 'NestJS', 'Redis', 'MongoDB', 'WebRTC', 'Twilio'],
      outcome: 'Demonstrates mobile, backend, and realtime systems experience together.',
      link: 'https://spotbills.com/our-companies',
    },
  ],
  theme: {
    background: '#09111f',
    foreground: '#eaf2ff',
    panel: '#0f1a2e',
    panelEdge: '#21324d',
    accent: '#7dd3fc',
    accentSoft: '#fbbf24',
    muted: '#93accf',
    promptUser: '#f8fafc',
    promptHost: '#7dd3fc',
    promptInput: '#eaf2ff',
    headerGlow: '#fbbf24',
    fontStack:
      '"IBM Plex Mono", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "Liberation Mono", monospace',
  },
};

export default content;
