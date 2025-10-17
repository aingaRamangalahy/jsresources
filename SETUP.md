# Setup Instructions

Follow these steps to get the JS Resources application running on your machine.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) - Install with: `npm install -g pnpm`

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

This will install all required packages including:
- Nuxt 3
- Nuxt Content
- NuxtUI
- TypeScript
- Tailwind CSS

### 2. Start Development Server

```bash
pnpm dev
```

The application will be available at: **http://localhost:3000**

### 3. Build for Production

To build the application for production:

```bash
pnpm build
```

### 4. Generate Static Site

To generate a static site (SSG):

```bash
pnpm generate
```

The static files will be in `.output/public/` ready for deployment.

### 5. Preview Production Build

To preview the production build locally:

```bash
pnpm preview
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Nuxt will automatically use another port (3001, 3002, etc.).

### Module Not Found Errors

If you see "module not found" errors:

1. Delete `node_modules` and `.nuxt` directories:
   ```bash
   rm -rf node_modules .nuxt
   ```

2. Reinstall dependencies:
   ```bash
   pnpm install
   ```

### TypeScript Errors

If you see TypeScript errors like "Cannot find type definition file for '@nuxt/types'", this is normal on first install. The `.nuxt` directory with auto-generated types hasn't been created yet.

**Solution**: Just start the dev server once:

```bash
pnpm dev
```

This will auto-generate the `.nuxt` directory with all TypeScript definitions. After that, TypeScript errors should disappear.

Alternatively, run:

```bash
pnpm postinstall
```

This regenerates the Nuxt TypeScript configuration.

### Cache Issues

Clear Nuxt cache:

```bash
rm -rf .nuxt .output
pnpm dev
```

## Using npm or yarn

If you prefer npm or yarn instead of pnpm:

### npm
```bash
npm install
npm run dev
```

### yarn
```bash
yarn install
yarn dev
```

## Development Tips

### Hot Reload

The development server supports hot module replacement (HMR). Changes to:
- Vue components
- Content files
- TypeScript files
- Tailwind styles

...will automatically reload in the browser.

### Adding New Resources

1. Create a new `.md` file in `content/resources/`
2. Add frontmatter with required fields
3. The resource will automatically appear on the site

See [HOW_TO_CONTRIBUTE.md](HOW_TO_CONTRIBUTE.md) for details.

### Theme Toggle

The site supports dark/light themes. Click the sun/moon icon in the header to toggle.

## Project Structure

```
jsresources/
├── content/resources/     # Resource markdown files
├── pages/                # Application pages
├── composables/          # Vue composables
├── types/               # TypeScript types
├── app.vue              # App root
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. 🎯 Explore the application at http://localhost:3000
4. 📝 Add your own resources
5. 🚀 Build and deploy

## Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Check [HOW_TO_CONTRIBUTE.md](HOW_TO_CONTRIBUTE.md) for adding resources
- Open an issue on GitHub for bugs or questions

Happy coding! 🚀

