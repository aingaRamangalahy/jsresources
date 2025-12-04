import { test, expect } from '@playwright/test'

/**
 * Example E2E test using Playwright
 * This demonstrates how to write end-to-end tests for your Nuxt app
 */

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')
    
    // Check that the page loaded
    await expect(page).toHaveTitle(/jsresources/i)
  })
  
  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Example: Check if navigation exists
    // Adjust selectors based on your actual app structure
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })
})


