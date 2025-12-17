# JS Resources

A beautiful, minimalist curation site for JavaScript/TypeScript learning resources. Built with Nuxt 3, Nuxt Content, and NuxtUI.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jsresources.git
cd jsresources

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the site.

## 📦 Scripts

```bash
# Development
pnpm dev              # Start dev server

# Production
pnpm build            # Build for production
pnpm generate         # Generate static site
pnpm preview          # Preview production build
```

## 📝 Adding Resources

Resources are markdown files in `/content/resources/` with frontmatter:

```markdown
---
title: "Resource Title"
author: "Author Name"
platform: "YouTube"
type: "video"
topics: ["vue", "typescript"]
level: "beginner"
language: "en"
price: "free"
url: "https://example.com"
---

Brief description of the resource.
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## ✨ Features

### 📚 Resource Library
Browse and filter curated JavaScript/TypeScript learning resources including courses, videos, and articles.

### 🎨 Interactive Visualizations
Understand complex JavaScript concepts through interactive animations:

- **Event Loop Visualizer** - See how JavaScript schedules tasks, microtasks, and callback queues
  - 3 interactive examples (setTimeout, Promises, Mixed)
  - Play/pause controls with adjustable speed
  - Click components to learn more
  - Real-time code highlighting synchronized with execution

Visit `/visualize` to explore interactive explanations of JavaScript internals.

## 🛠️ Tech Stack

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS
- **[shadcn-vue](https://www.shadcn-vue.com/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[GSAP](https://greensock.com/gsap/)** - Animation library
- **[Shiki](https://shiki.style/)** - Syntax highlighting

## 🤝 Contributing

We welcome contributions! Please see:

- [CONTRIBUTING.md](CONTRIBUTING.md) - Complete contributing guide

## 📄 Resource Types

- **Video** 🎥 - Individual video tutorials
- **Course** 🎓 - Complete course series
- **Article** 📝 - Blog posts and written guides

## 🎯 Supported Topics

- Vue.js, React, Angular, Svelte
- TypeScript, JavaScript
- Node.js, Express, NestJS
- Nuxt, Next.js, Remix
- And many more...

## 📊 Resource Levels

- **Beginner** - For those just starting out
- **Intermediate** - Some experience required
- **Advanced** - For experienced developers

## 🌍 Resource Languages

Currently supporting:
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)

## 🚀 Deployment

Generate static site for deployment:

```bash
pnpm generate
```

The static files will be in `.output/public/` ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting

## 📝 License

MIT

## 🙏 Acknowledgments

- All the amazing educators creating learning resources
- The Nuxt and Vue.js communities
- Contributors to this project

---

Made with ❤️ for the JavaScript community

