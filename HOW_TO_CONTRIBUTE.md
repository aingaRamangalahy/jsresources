# How to Contribute

Thank you for your interest in contributing to JS Resources! This guide will help you add new learning resources to our curated collection.

## Quick Start

1. **Fork the repository**
2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR_USERNAME/jsresources.git
   cd jsresources
   ```
3. **Install dependencies**
   ```bash
   pnpm install
   ```
4. **Create a new resource file**
5. **Submit a pull request**

## Adding a New Resource

### Step 1: Create a Markdown File

Create a new file in `/content/resources/` with a descriptive filename using kebab-case:

```
content/resources/your-resource-name.md
```

### Step 2: Add Frontmatter

Use this template for the frontmatter (metadata) at the top of your file:

```yaml
---
title: "Resource Title"
author: "Author Name"
platform: "YouTube" # or Udemy, Blog, etc.
type: "video" # video | course | article | documentation
topics: ["vue", "typescript"] # lowercase tags
level: "beginner" # beginner | intermediate | advanced
language: "en" # en | fr
price: "free" # free | paid
url: "https://example.com/resource"
---
```

### Step 3: Add Description

Below the frontmatter, add a brief description (2-3 sentences) of what the resource covers:

```markdown
---
title: "..."
...
---

A comprehensive guide to Vue 3 Composition API. This course covers reactive refs, computed properties, and composables. Perfect for developers transitioning from Options API.
```

## Resource Guidelines

### Quality Standards

- ✅ High-quality, up-to-date content
- ✅ Clear learning objectives
- ✅ Well-structured and organized
- ✅ Suitable for the specified skill level
- ❌ Outdated or deprecated content
- ❌ Clickbait or low-quality resources
- ❌ Duplicate entries

### Topics

Use lowercase for topic tags. Common topics include:

- `vue`, `react`, `angular`, `svelte`
- `javascript`, `typescript`
- `node`, `express`, `nestjs`
- `nuxt`, `next`, `vite`
- `testing`, `performance`, `security`

### Example Resource

```markdown
---
title: "Vue 3 Complete Guide 2024"
author: "Maximilian Schwarzmüller"
platform: "Udemy"
type: "course"
topics: ["vue", "javascript", "vite"]
level: "intermediate"
language: "en"
price: "paid"
url: "https://www.udemy.com/course/vuejs-complete-guide"
---

A comprehensive Vue 3 course covering everything from basics to advanced topics. Includes the Composition API, Vuex, Vue Router, and real-world projects. Updated for 2024 with the latest Vue 3 features.
```

## Testing Locally

Before submitting, test your changes locally:

```bash
# Run development server
pnpm dev

# Generate static site
pnpm generate
```

Visit `http://localhost:3000` and verify:
- Your resource appears in the list
- Filters work correctly
- Detail page displays properly
- All metadata is correct

## Submitting Your Contribution

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: [Resource Title]"
   ```

2. **Push to your fork**
   ```bash
   git push origin main
   ```

3. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your addition

### PR Guidelines

- **Title**: `Add: [Resource Title]`
- **Description**: Brief explanation of why this resource is valuable
- **One resource per PR**: Keep PRs focused and easy to review

## Questions?

If you have questions or need help:
- Open an issue on GitHub
- Check existing issues for similar questions
- Review the [Contributing Guide](CONTRIBUTING.md) for more details

Thank you for helping make JS Resources better! 🎉

