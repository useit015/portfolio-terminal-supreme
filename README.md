# Oussama Nahiz Terminal Portfolio

A terminal-driven portfolio built from `dabit3/portfolio-terminal-supreme` and reworked into a personal site for Oussama Nahiz. It keeps the command-line interaction model, but swaps the original Supreme branding for a custom profile, expanded command set, and a darker editorial terminal aesthetic.

## Features

- Terminal UI with command history and auto-completion
- Expanded commands: `about`, `experience`, `projects`, `skills`, `contact`
- Typed portfolio content source in [`app/content.ts`](./app/content.ts)
- Responsive shell layout for desktop and mobile
- Keyboard shortcuts for history, completion, and clearing input

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Customization

- Edit [`app/content.ts`](./app/content.ts) to update identity, projects, experience, links, and theme tokens.
- Command definitions and rendering live in [`app/utils/commands.tsx`](./app/utils/commands.tsx).
- The interactive shell chrome lives in [`app/components/Terminal.tsx`](./app/components/Terminal.tsx).

## Deployment

This project is intended to be deployed as a standard Next.js app on Vercel.

```bash
npm run build
```

If the build passes locally, import the repo into Vercel and deploy from the default branch.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
