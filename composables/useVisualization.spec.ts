
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useVisualization } from './useVisualization'
import { flushPromises } from '@vue/test-utils'

// Mock the registry
vi.mock('~/data/visualizations/registry', () => ({
  loadVisualization: vi.fn(async (id: string) => {
    if (id === 'event-loop') {
      return {
        id: 'event-loop',
        version: '2.0.0',
        title: 'Event Loop',
        description: 'Test description',
        tags: ['javascript', 'runtime'],
        scene: {
          layout: { type: 'grid', config: {} },
          layers: [],
          theme: { fontFamily: 'Arial', fontSize: 14, borderRadius: 8, spacing: 16 }
        },
        explanations: {
          global: {
            title: 'Global Title',
            content: 'Global content',
            details: ['Detail 1', 'Detail 2']
          },
          nodes: {
            'node-1': {
              title: 'Node 1 Title',
              content: 'Node 1 content',
              details: ['Node detail 1'],
              codeExample: 'const x = 1;'
            }
          }
        },
        interactions: {
          onClick: 'select' as const,
          onHover: 'highlight' as const,
          keyboardShortcuts: {}
        },
        rendering: {
          canvas: {
            width: 800,
            height: 600,
            backgroundColor: '#fff',
            pixelRatio: 1
          },
          interactions: {
            enableDrag: false,
            enableZoom: true,
            enablePan: true,
            zoomMin: 0.5,
            zoomMax: 2.0
          },
          complexity: 'medium' as const,
          nodeCount: 7
        }
      }
    }
    throw new Error(`Visualization '${id}' not found`)
  })
}))

describe('useVisualization', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should load visualization spec on mount', async () => {
      // Arrange & Act
      const { spec, isLoading } = useVisualization('event-loop')
      
      // Initially loading
      expect(isLoading.value).toBe(true)
      expect(spec.value).toBeNull()
      
      // Wait for load to complete
      await flushPromises()
      
      // Assert
      expect(isLoading.value).toBe(false)
      expect(spec.value).toBeDefined()
      expect(spec.value?.id).toBe('event-loop')
      expect(spec.value?.title).toBe('JavaScript Runtime')
    })

    it('should set error state when load fails', async () => {
      // Arrange & Act
      const { spec, isLoading, error } = useVisualization('nonexistent')
      
      await flushPromises()
      
      // Assert
      expect(isLoading.value).toBe(false)
      expect(spec.value).toBeNull()
      expect(error.value).toBeDefined()
      expect(error.value?.message).toContain('not found')
    })

    it('should start with no selected node', async () => {
      // Arrange & Act
      const { selectedNodeId } = useVisualization('event-loop')
      
      await flushPromises()
      
      // Assert
      expect(selectedNodeId.value).toBeNull()
    })
  })

  describe('selectNode', () => {
    it('should update selectedNodeId when node is selected', async () => {
      // Arrange
      const { selectedNodeId, selectNode } = useVisualization('event-loop')
      await flushPromises()
      
      // Act
      selectNode('node-1')
      
      // Assert
      expect(selectedNodeId.value).toBe('node-1')
    })

    it('should update explanation state when node is selected', async () => {
      // Arrange
      const { explanationState, selectNode } = useVisualization('event-loop')
      await flushPromises()
      
      // Act
      selectNode('node-1')
      
      // Assert
      expect(explanationState.value.type).toBe('component')
      expect(explanationState.value.title).toBe('Node 1 Title')
      expect(explanationState.value.description).toBe('Node 1 content')
      expect(explanationState.value.details).toEqual(['Node detail 1'])
    })
  })

  describe('deselectNode', () => {
    it('should clear selectedNodeId when node is deselected', async () => {
      // Arrange
      const { selectedNodeId, selectNode, deselectNode } = useVisualization('event-loop')
      await flushPromises()
      selectNode('node-1')
      
      // Act
      deselectNode()
      
      // Assert
      expect(selectedNodeId.value).toBeNull()
    })

    it('should show global explanation when node is deselected', async () => {
      // Arrange
      const { explanationState, selectNode, deselectNode } = useVisualization('event-loop')
      await flushPromises()
      selectNode('node-1')
      
      // Act
      deselectNode()
      
      // Assert
      expect(explanationState.value.type).toBe('global')
      expect(explanationState.value.title).toBe('Global Title')
      expect(explanationState.value.description).toBe('Global content')
    })
  })

  describe('explanationState', () => {
    it('should show global explanation by default', async () => {
      // Arrange & Act
      const { explanationState } = useVisualization('event-loop')
      await flushPromises()
      
      // Assert
      expect(explanationState.value.type).toBe('global')
      expect(explanationState.value.title).toBe('Global Title')
      expect(explanationState.value.description).toBe('Global content')
      expect(explanationState.value.details).toEqual(['Detail 1', 'Detail 2'])
    })

    it('should fallback to global when selected node has no explanation', async () => {
      // Arrange
      const { explanationState, selectNode } = useVisualization('event-loop')
      await flushPromises()
      
      // Act - select node that doesn't exist in explanations
      selectNode('non-existent-node')
      
      // Assert - should fallback to global
      expect(explanationState.value.type).toBe('global')
      expect(explanationState.value.title).toBe('Global Title')
    })
  })

  describe('isNodeSelected', () => {
    it('should return true for selected node', async () => {
      // Arrange
      const { isNodeSelected, selectNode } = useVisualization('event-loop')
      await flushPromises()
      
      // Act
      selectNode('node-1')
      
      // Assert
      expect(isNodeSelected('node-1')).toBe(true)
      expect(isNodeSelected('node-2')).toBe(false)
    })

    it('should return false when no node is selected', async () => {
      // Arrange
      const { isNodeSelected } = useVisualization('event-loop')
      await flushPromises()
      
      // Assert
      expect(isNodeSelected('node-1')).toBe(false)
    })
  })

  describe('showGlobalExplanation', () => {
    it('should deselect node and show global explanation', async () => {
      // Arrange
      const { selectedNodeId, explanationState, selectNode, showGlobalExplanation } = useVisualization('event-loop')
      await flushPromises()
      selectNode('node-1')
      
      // Act
      showGlobalExplanation()
      
      // Assert
      expect(selectedNodeId.value).toBeNull()
      expect(explanationState.value.type).toBe('global')
    })
  })

  describe('load method', () => {
    it('should allow manual reload of spec', async () => {
      // Arrange
      const { spec, load } = useVisualization('event-loop')
      await flushPromises()
      expect(spec.value).toBeDefined()
      
      // Act - manually reload
      await load()
      
      // Assert
      expect(spec.value).toBeDefined()
      expect(spec.value?.id).toBe('event-loop')
    })
  })
})

