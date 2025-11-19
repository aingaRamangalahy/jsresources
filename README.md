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

## 🛠️ Tech Stack

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS
- **[NuxtUI](https://ui.nuxt.com/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

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

