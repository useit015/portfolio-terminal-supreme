# Supreme Terminal Portfolio

A terminal-styled personal portfolio website with "Supreme" branding aesthetics. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Terminal UI**: Fully functional command-line interface with history navigation and auto-completion.
- **Supreme Theme**: Minimalist white/red/black aesthetic inspired by Supreme.
- **Configurable**: All content and theming (ASCII art, social links, colors) are driven by a single JSON config file.
- **Responsive**: Works seamlessly on desktop and mobile devices.
- **Keyboard Navigation**: 
  - `Tab` to auto-complete commands
  - `↑` / `↓` to navigate command history
  - `Esc` to clear input

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

Edit `app/config.json` to update your identity, social links, projects, and theme settings.

```json
{
  "identity": {
    "username": "yourname",
    "hostname": "supreme"
  },
  "content": {
    "social": { ... },
    "projects": [ ... ]
  }
}
```

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
