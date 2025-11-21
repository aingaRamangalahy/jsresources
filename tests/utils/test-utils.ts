// tests/utils/test-utils.ts
import { mount, VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'

/**
 * Test utilities for Vue component testing
 * Provides helper functions and common test setup
 */

/**
 * Mount a Vue component with common test configuration
 * @param component - The Vue component to mount
 * @param options - Mount options
 * @returns VueWrapper instance
 */
export function mountComponent<T extends Component>(
  component: T,
  options: Parameters<typeof mount>[1] = {}
): VueWrapper {
  return mount(component, {
    // Global plugins, components, directives, etc.
    global: {
      stubs: {
        // Stub Nuxt-specific components if needed
        NuxtLink: true,
        // Add other stubs as needed
      },
      mocks: {
        // Mock Nuxt composables if needed
        // useRouter: vi.fn(),
        // useRoute: vi.fn(),
      },
      ...options.global,
    },
    ...options,
  })
}

/**
 * Wait for next Vue tick and all pending promises
 */
export async function flushPromises(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

/**
 * Create a mock function with proper typing
 */
export function createMockFn<T extends (...args: any[]) => any>(): jest.Mock<ReturnType<T>, Parameters<T>> {
  return vi.fn() as any
}

/**
 * Wait for a condition to be true
 * @param condition - Function that returns true when condition is met
 * @param timeout - Maximum time to wait in milliseconds
 */
export async function waitFor(
  condition: () => boolean,
  timeout = 5000
): Promise<void> {
  const startTime = Date.now()
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition')
    }
    await new Promise(resolve => setTimeout(resolve, 50))
  }
}

/**
 * Helper to trigger a DOM event
 */
export async function triggerEvent(
  element: Element,
  eventName: string,
  eventData?: any
): Promise<void> {
  const event = new Event(eventName, { bubbles: true, ...eventData })
  element.dispatchEvent(event)
  await flushPromises()
}

