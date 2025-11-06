# Contributing Guide

Welcome to the JS Resources contributing guide! We're excited to have you contribute to this curated collection of JavaScript/TypeScript learning resources.

**Contributing means**: Adding new learning resources by creating a Pull Request (PR) to the `master` branch. All contributions should follow the workflow outlined in this guide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Adding Resources](#adding-resources)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project follows a standard code of conduct:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Git

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
```bash
git clone https://github.com/YOUR_USERNAME/jsresources.git
cd jsresources
```

3. **Add the upstream remote** (to sync with the original repository):
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/jsresources.git
```

4. **Install dependencies**:
```bash
pnpm install
```

5. **Run development server**:
```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
jsresources/
├── content/
│   └── resources/          # Resource markdown files
├── pages/
│   ├── index.vue          # Home page with grid and filters
├── composables/
│   └── useResourceFilters.ts  # Filtering logic
├── types/
│   └── resource.ts        # TypeScript types
├── nuxt.config.ts         # Nuxt configuration
└── package.json
```

## Development Workflow

### Local Development

```bash
# Start dev server with hot reload
pnpm dev

# Type checking
pnpm postinstall  # Generates .nuxt types

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

### Creating a Branch

Always create a new branch from `master` for your changes:

```bash
# Make sure you're on master and up to date
git checkout master
git pull upstream master

# Create a feature branch
git checkout -b add-resource-name

# Or for bug fixes
git checkout -b fix-issue-description
```

## Adding Resources

### Resource File Format

Each resource is a markdown file in `/content/resources/` with YAML frontmatter:

```markdown
---
title: string              # Required: Resource title
author: string             # Required: Creator/author name
platform: string           # Required: Platform name
type: string              # Required: video | course | article | documentation
topics: string[]          # Required: Array of topics (lowercase)
level: string             # Required: beginner | intermediate | advanced
language: string          # Required: en | fr
price: string             # Required: free | paid
url: string               # Required: Resource URL
---

Resource description goes here. 2-3 sentences explaining what the resource covers and who it's for.
```

### Resource Quality Checklist

Before adding a resource, ensure it meets these criteria:

- [ ] Content is current and up-to-date
- [ ] Resource is from a reputable source
- [ ] Clear learning outcomes
- [ ] Appropriate for the specified level
- [ ] No duplicates exist
- [ ] All required frontmatter fields are filled
- [ ] Description is clear and concise
- [ ] URL is valid and accessible
- [ ] Topics are relevant and lowercase

### Topic Guidelines

Use standardized topic names:

**Frameworks/Libraries:**
- `vue`, `react`, `angular`, `svelte`
- `nuxt`, `next`, `remix`, `gatsby`

**Languages:**
- `javascript`, `typescript`

**Backend:**
- `node`, `express`, `nestjs`, `fastify`

**Tools/Concepts:**
- `vite`, `webpack`, `testing`, `performance`, `security`

## Code Standards

### TypeScript

- Use strict mode (enabled by default)
- Define types for all data structures
- No `any` types (use `unknown` if necessary)
- Follow camelCase naming convention [[memory:2851823]]

### Vue Components

- Use Composition API with `<script setup>`
- **Script section must come first, then template** [[memory:5466977]]
- Use TypeScript for all components
- Follow camelCase for properties [[memory:2851823]]

Example structure:
```vue
<script setup lang="ts">
// Imports and logic here
</script>

<template>
  <!-- Template here -->
</template>

<style scoped>
/* Styles here if needed */
</style>
```

### Styling

- Use Tailwind CSS utilities
- Follow shadcn/ui component patterns
- Maintain dark mode support
- Keep responsive design (mobile-first)

### Commit Messages

Follow conventional commits:

```
type(scope): description

Examples:
- feat(resources): add Vue 3 course by Maximilian
- fix(filters): resolve topic filter not clearing
- docs: update contributing guide
- style: improve card hover states
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## Pull Request Process

### Workflow Summary

The standard contribution workflow is:
1. Fork the repository
2. Create a branch from `master`
3. Add your new resource file(s)
4. Test locally
5. Commit and push to your fork
6. Open a Pull Request to the `master` branch

### Before Submitting

1. **Test locally**
   ```bash
   pnpm dev
   ```
   - Verify resource appears
   - Check filters work
   - Test detail page
   - Confirm responsive design

2. **Check types**
   ```bash
   pnpm build
   ```

3. **Review changes**
   - Ensure only relevant files are modified
   - Check for typos
   - Verify frontmatter accuracy

### Submitting Your PR

1. **Commit your changes**:
   ```bash
   git add content/resources/your-resource-name.md
   git commit -m "feat(resources): add [Resource Title]"
   ```

2. **Push to your fork**:
   ```bash
   git push origin add-resource-name
   ```

3. **Open a Pull Request** on GitHub:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - **Target branch**: `master`
   - Fill out the PR template below

### PR Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] New resource
- [ ] Bug fix
- [ ] Documentation update
- [ ] Feature enhancement

## Resource Details (if applicable)
- **Title**: Resource name
- **Type**: video/course/article/documentation
- **Topics**: List topics
- **Why valuable**: Brief explanation

## Checklist
- [ ] Tested locally
- [ ] Follows coding standards
- [ ] Updated documentation if needed
- [ ] No console errors
- [ ] Responsive design verified
```

### Review Process

1. A maintainer will review your PR to the `master` branch
2. Address any feedback or requested changes
3. Once approved, your PR will be merged into `master`
4. Your contribution will be live on the next deployment! 🎉

## Development Tips

### Hot Reload

Nuxt provides hot reload for:
- Vue components
- TypeScript files
- Content files

Changes should reflect immediately in the browser.

### Content Query

To fetch resources programmatically:

```typescript
// Get all resources
const resources = await queryContent('/resources').find()

// Filter by type
const videos = await queryContent('/resources')
  .where({ type: 'video' })
  .find()

// Get one resource
const resource = await queryContent('/resources/vue-fundamentals').findOne()
```

### State Management

Use composables for shared state:

```typescript
// In composables/useResourceFilters.ts
const filters = useState('resourceFilters', () => ({
  topics: [],
  // ...
}))
```

## Questions & Support

- **Issues**: For bugs or feature requests
- **Discussions**: For questions and ideas
- **Email**: For private concerns

## Recognition

Contributors will be:
- Listed in the project README 
- Part of the JS Resources community!

Thank you for contributing! 🚀

