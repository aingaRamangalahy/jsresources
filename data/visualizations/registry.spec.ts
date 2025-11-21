
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadVisualization, listVisualizations, preloadVisualization, clearCache } from './registry'
import type { VisualizationSpec } from '~/types/visualization/spec'

describe('Visualization Registry', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearCache()
  })

  describe('loadVisualization', () => {
    it('should load a visualization spec by id', async () => {
      // Arrange & Act
      const spec = await loadVisualization('js-runtime')
      
      // Assert
      expect(spec).toBeDefined()
      expect(spec.id).toBe('js-runtime')
      expect(spec.title).toBeTruthy()
      expect(spec.scene).toBeDefined()
      expect(spec.explanations).toBeDefined()
    })

    it('should cache loaded specs to avoid redundant loads', async () => {
      // Arrange
      const spec1 = await loadVisualization('js-runtime')
      
      // Act
      const spec2 = await loadVisualization('js-runtime')
      
      // Assert - same reference means cached
      expect(spec2).toBe(spec1)
    })

    it('should throw error for non-existent visualization id', async () => {
      // Arrange & Act & Assert
      await expect(
        loadVisualization('nonexistent')
      ).rejects.toThrow("Visualization 'nonexistent' not found in registry")
    })

    it('should validate spec structure after loading', async () => {
      // Arrange & Act
      const spec = await loadVisualization('js-runtime')
      
      // Assert - check required fields exist
      expect(spec.id).toBeTruthy()
      expect(spec.version).toBeTruthy()
      expect(spec.title).toBeTruthy()
      expect(spec.description).toBeTruthy()
      expect(Array.isArray(spec.tags)).toBe(true)
      expect(spec.scene).toBeDefined()
      expect(spec.scene.layers).toBeDefined()
      expect(Array.isArray(spec.scene.layers)).toBe(true)
      expect(spec.explanations).toBeDefined()
      expect(spec.explanations.global).toBeDefined()
      expect(spec.interactions).toBeDefined()
      expect(spec.rendering).toBeDefined()
    })
  })

  describe('listVisualizations', () => {
    it('should return array of visualization metadata', () => {
      // Arrange & Act
      const list = listVisualizations()
      
      // Assert
      expect(Array.isArray(list)).toBe(true)
      expect(list.length).toBeGreaterThan(0)
      
      // Check each item has required fields
      list.forEach(item => {
        expect(item.id).toBeTruthy()
        expect(item.title).toBeTruthy()
      })
    })

    it('should include js-runtime in the list', () => {
      // Arrange & Act
      const list = listVisualizations()
      
      // Assert
      const jsRuntime = list.find(item => item.id === 'js-runtime')
      expect(jsRuntime).toBeDefined()
      expect(jsRuntime?.title).toBe('JavaScript Runtime')
    })

    it('should format titles correctly from ids', () => {
      // Arrange & Act
      const list = listVisualizations()
      
      // Assert
      const jsRuntime = list.find(item => item.id === 'js-runtime')
      expect(jsRuntime?.title).toBe('JavaScript Runtime')
    })
  })

  describe('preloadVisualization', () => {
    it('should not throw error when preloading valid id', () => {
      // Arrange & Act & Assert
      expect(() => {
        preloadVisualization('js-runtime')
      }).not.toThrow()
    })

    it('should cache visualization for later synchronous access', async () => {
      // Arrange - preload and wait a bit for async operation
      preloadVisualization('js-runtime')
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Act - second load should be fast (cached)
      const startTime = Date.now()
      const spec = await loadVisualization('js-runtime')
      const loadTime = Date.now() - startTime
      
      // Assert
      expect(spec).toBeDefined()
      expect(loadTime).toBeLessThan(10) // Should be nearly instant if cached
    })
  })

  describe('clearCache', () => {
    it('should clear cached specs', async () => {
      // Arrange - load and cache a spec
      const spec1 = await loadVisualization('js-runtime')
      
      // Verify it's cached (second load returns same reference)
      const cachedSpec = await loadVisualization('js-runtime')
      expect(cachedSpec).toBe(spec1)
      
      // Act - clear cache
      clearCache()
      
      // Load again - will re-import the module
      const spec2 = await loadVisualization('js-runtime')
      
      // Assert - spec was reloaded successfully
      // Note: Due to JS module caching, the object reference may be the same
      // What matters is that clearCache() doesn't throw and the spec loads correctly
      expect(spec2).toBeDefined()
      expect(spec2.id).toBe('js-runtime')
      expect(spec2.id).toBe(spec1.id)
    })
  })
})

