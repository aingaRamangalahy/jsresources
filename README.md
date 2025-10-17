# JS Resources

A beautiful, minimalist curation site for JavaScript/TypeScript learning resources. Built with Nuxt 3, Nuxt Content, and NuxtUI.

## ✨ Features

- 🎯 **Curated Resources** - High-quality courses, videos, articles, and documentation
- 🔍 **Advanced Filtering** - Filter by technology, type, level, language, and price
- 🔎 **Full-Text Search** - Search across titles, authors, and descriptions
- 📊 **Smart Sorting** - Sort alphabetically or by date
- 🌑 **Dark Theme** - Beautiful dark theme design
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **Static Site** - Fast, generated with Nuxt SSG
- 🎨 **Modern UI** - Clean, developer-friendly design with NuxtUI

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

## 🏗️ Project Structure

```
jsresources/
├── content/
│   └── resources/          # Resource markdown files
├── pages/
│   ├── index.vue          # Home page
│   └── resources/
│       └── [...slug].vue  # Resource detail page
├── composables/
│   └── useResourceFilters.ts
├── types/
│   └── resource.ts
├── nuxt.config.ts
└── package.json
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

See [HOW_TO_CONTRIBUTE.md](HOW_TO_CONTRIBUTE.md) for detailed instructions.

## 🛠️ Tech Stack

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS
- **[NuxtUI](https://ui.nuxt.com/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

## 🤝 Contributing

We welcome contributions! Please see:

- [HOW_TO_CONTRIBUTE.md](HOW_TO_CONTRIBUTE.md) - Quick guide to adding resources
- [CONTRIBUTING.md](CONTRIBUTING.md) - Detailed contributing guide

## 📄 Resource Types

- **Video** 🎥 - Individual video tutorials
- **Course** 🎓 - Complete course series
- **Article** 📝 - Blog posts and written guides
- **Documentation** 📚 - Official documentation

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

## 🌍 Languages

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

