import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Use happy-dom for better performance than jsdom
    environment: 'happy-dom',
    
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Test file patterns
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'components/**/*.{vue,ts,js}',
        'composables/**/*.{ts,js}',
        'lib/**/*.{ts,js}',
        'data/**/*.{ts,js}',
        'utils/**/*.{ts,js}'
      ],
      exclude: [
        '**/*.spec.{ts,js}',
        '**/*.test.{ts,js}',
        '**/node_modules/**',
        '**/dist/**',
        '**/.nuxt/**',
        '**/tests/**'
      ],
      // Aim for 80% coverage on business logic
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    },
    
    // Setup files to run before tests
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    
    // Timeout for tests
    testTimeout: 10000,
    
    // Isolate each test file
    isolate: true,
    
    // UI for test visualization (optional)
    ui: true,
  },
  
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    }
  }
})

