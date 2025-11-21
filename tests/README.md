# Testing Documentation

This directory contains all tests for the jsresources project. We use **Vitest** for unit/component tests and **Playwright** for end-to-end (E2E) tests.

## Directory Structure

```
tests/
├── setup/
│   └── vitest.setup.ts       # Global Vitest setup and mocks
├── utils/
│   └── test-utils.ts         # Shared test utilities
├── e2e/
│   └── *.spec.ts             # Playwright E2E tests
└── README.md                 # This file
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode (auto-rerun on changes)
pnpm test

# Run tests with UI (visual test runner)
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests (headless)
pnpm test:e2e

# Run E2E tests with UI (visual test runner)
pnpm test:e2e:ui

# Run E2E tests in debug mode
pnpm test:e2e:debug
```

## Writing Tests

### Unit Tests

Unit tests should be co-located with the source files they test:

```
data/visualizations/registry.ts
data/visualizations/registry.spec.ts  ← Test file
```

**Example:**

```typescript
import { describe, it, expect } from 'vitest'
import { loadVisualization } from './registry'

describe('Visualization Registry', () => {
  it('should load a visualization spec by id', async () => {
    const spec = await loadVisualization('js-runtime')
    expect(spec.id).toBe('js-runtime')
  })
})
```

### Component Tests

Use Vue Test Utils to test Vue components:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('should render properly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })
    expect(wrapper.text()).toContain('Test')
  })
})
```

### E2E Tests

Place E2E tests in the `tests/e2e/` directory:

```typescript
import { test, expect } from '@playwright/test'

test('should navigate to visualization', async ({ page }) => {
  await page.goto('/visualize/js-runtime')
  await expect(page).toHaveTitle(/JavaScript Runtime/)
})
```

## Test Guidelines (from TDD Rules)

### When to Apply TDD

✅ **Use TDD for:**
- Business logic with clear inputs/outputs (registry, utilities, composables)
- Data structures and algorithms (scene graph, primitive registry)
- State management (useVisualization composable)
- Event handlers with deterministic behavior
- Pure functions and calculations

❌ **Don't use TDD for:**
- Visual components (use Storybook or visual testing)
- UI integration (use E2E tests after implementation)
- Data definitions (specs, configs)
- Manual testing tasks (accessibility audits)

### Test Structure (AAA Pattern)

```typescript
it('should do something specific when condition', () => {
  // Arrange - Set up test data and dependencies
  const input = createTestInput()
  
  // Act - Execute the code under test
  const result = functionUnderTest(input)
  
  // Assert - Verify the outcome
  expect(result).toBe(expectedValue)
})
```

### Test Naming Convention

Use descriptive names that explain behavior:

```typescript
// ❌ Bad
it('works')
it('test user')

// ✅ Good
it('should load visualization spec from registry by id')
it('should throw error when visualization id does not exist')
```

## Mocking

### Mock Konva for Unit Tests

```typescript
vi.mock('konva', () => ({
  default: {
    Stage: vi.fn(() => ({ /* mock implementation */ })),
    Layer: vi.fn(() => ({ /* mock implementation */ })),
    Group: vi.fn(() => ({ /* mock implementation */ })),
  }
}))
```

### Mock Nuxt Composables

```typescript
vi.mock('#app', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    params: { id: 'test-id' }
  })),
}))
```

## Coverage Goals

- **Business logic**: 80-90% coverage
- **Utilities/helpers**: 90-100% coverage
- **UI components**: 50-70% coverage (focus on critical paths)
- **Integration**: Focus on happy path + critical error cases

## CI/CD Integration

Tests automatically run in CI/CD pipelines:

- Unit tests run on every commit
- E2E tests run on pull requests
- Coverage reports are generated and tracked

## Troubleshooting

### "Cannot find module" errors

Make sure path aliases are configured in `vitest.config.ts`:

```typescript
resolve: {
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url)),
  }
}
```

### E2E tests timeout

Increase timeout in `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 10000,
  navigationTimeout: 30000,
}
```

### Konva mocking issues

Ensure Konva is properly mocked in the test setup. Check `lib/scene/SceneGraph.spec.ts` for examples.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Playwright Documentation](https://playwright.dev/)
- [Project TDD Rules](../logs/visualize_v0/todo.md#tdd-best-practices)

