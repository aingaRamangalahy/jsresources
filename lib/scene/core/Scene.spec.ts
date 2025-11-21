
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { SceneGraph, SceneLayer, SceneNode, SceneEdge } from './'
import type { SceneDefinition, Layer, Node as NodeSpec, Edge as EdgeSpec } from '~/types/visualization/spec'

// Mock Konva
vi.mock('konva', () => ({
  default: {
    Stage: vi.fn(function(config: any) {
      return {
        add: vi.fn(),
        destroy: vi.fn(),
        on: vi.fn(),
        container: vi.fn(() => ({ style: {} })),
        getPointerPosition: vi.fn(() => ({ x: 0, y: 0 })),
        x: vi.fn(() => 0),
        y: vi.fn(() => 0),
        scaleX: vi.fn(() => 1),
        scale: vi.fn(),
        position: vi.fn(),
        draggable: vi.fn(),
      }
    }),
    Layer: vi.fn(function() {
      return {
        add: vi.fn(),
        visible: vi.fn(),
        batchDraw: vi.fn(),
        getStage: vi.fn(),
      }
    }),
    Group: vi.fn(function() {
      return {
        add: vi.fn(),
        on: vi.fn(),
        position: vi.fn(),
        opacity: vi.fn(),
        scale: vi.fn(),
        draggable: vi.fn(),
        getLayer: vi.fn(),
      }
    }),
    Rect: vi.fn(function() {
      return {
        add: vi.fn(),
      }
    }),
    Text: vi.fn(function() {
      return {
        add: vi.fn(),
      }
    }),
    Arrow: vi.fn(function() {
      return {
        add: vi.fn(),
        dashOffset: vi.fn(),
      }
    }),
    Animation: vi.fn(function(func, layers) {
      return {
        start: vi.fn(),
        stop: vi.fn(),
      }
    }),
  }
}))

describe('SceneGraph', () => {
  let container: HTMLDivElement
  let mockDefinition: SceneDefinition

  beforeEach(() => {
    container = document.createElement('div')
    container.style.width = '800px'
    container.style.height = '600px'
    document.body.appendChild(container)

    mockDefinition = {
      layout: {
        type: 'grid',
        config: { columns: 2 }
      },
      layers: [
        {
          id: 'main',
          name: 'Main Layer',
          zIndex: 1,
          visible: true,
          nodes: [
            {
              id: 'node-1',
              type: 'box',
              position: { x: 100, y: 100 },
              size: { width: 200, height: 100 },
              style: { border: '#000', background: '#fff' },
              content: { title: 'Node 1' },
              interactive: true,
              selectable: true,
              draggable: false,
              data: {}
            },
            {
              id: 'node-2',
              type: 'box',
              position: { x: 400, y: 100 },
              size: { width: 200, height: 100 },
              style: { border: '#000', background: '#fff' },
              content: { title: 'Node 2' },
              interactive: true,
              selectable: true,
              draggable: false,
              data: {}
            }
          ],
          edges: [
            {
              id: 'edge-1',
              from: 'node-1',
              to: 'node-2',
              type: 'arrow',
              style: { color: '#000', width: 2 },
              animated: false
            }
          ]
        }
      ],
      theme: {
        fontFamily: 'Arial',
        fontSize: 14,
        borderRadius: 8,
        spacing: 16
      }
    }
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('constructor', () => {
    it('should create a SceneGraph instance', () => {
      // Arrange & Act
      const config = {
        canvas: { width: 'auto', height: 600, backgroundColor: '#fff', pixelRatio: 'auto' }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Assert
      expect(sceneGraph).toBeDefined()
      expect(sceneGraph.stage).toBeDefined()
    })

    it('should create layers from definition', () => {
      // Arrange & Act
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Assert
      const layer = sceneGraph.getLayer('main')
      expect(layer).toBeDefined()
      expect(layer?.id).toBe('main')
      expect(layer?.name).toBe('Main Layer')
    })

    it('should create nodes from layer definition', () => {
      // Arrange & Act
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Assert
      const nodes = sceneGraph.getAllNodes()
      expect(nodes).toHaveLength(2)
      expect(nodes[0].id).toBe('node-1')
      expect(nodes[1].id).toBe('node-2')
    })

    it('should create edges from layer definition', () => {
      // Arrange & Act
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Assert
      const layer = sceneGraph.getLayer('main')
      const edges = layer?.getEdges()
      expect(edges).toHaveLength(1)
      expect(edges?.[0].id).toBe('edge-1')
    })
  })

  describe('getNode', () => {
    it('should return node by id', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Act
      const node = sceneGraph.getNode('node-1')

      // Assert
      expect(node).toBeDefined()
      expect(node?.id).toBe('node-1')
      expect(node?.content.title).toBe('Node 1')
    })

    it('should return undefined for non-existent node', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Act
      const node = sceneGraph.getNode('non-existent')

      // Assert
      expect(node).toBeUndefined()
    })
  })

  describe('getAllNodes', () => {
    it('should return all nodes from all layers', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Act
      const nodes = sceneGraph.getAllNodes()

      // Assert
      expect(nodes).toHaveLength(2)
      expect(nodes.map(n => n.id)).toEqual(['node-1', 'node-2'])
    })
  })

  describe('getVisibleLayers', () => {
    it('should return only visible layers', () => {
      // Arrange
      const defWithHiddenLayer: SceneDefinition = {
        ...mockDefinition,
        layers: [
          ...mockDefinition.layers,
          {
            id: 'hidden',
            name: 'Hidden Layer',
            zIndex: 2,
            visible: false,
            nodes: [],
            edges: []
          }
        ]
      }
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, defWithHiddenLayer, config)

      // Act
      const visibleLayers = sceneGraph.getVisibleLayers()

      // Assert
      expect(visibleLayers).toHaveLength(1)
      expect(visibleLayers[0].id).toBe('main')
    })
  })

  describe('updateNode', () => {
    it('should update node properties', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)

      // Act
      sceneGraph.updateNode('node-1', {
        position: { x: 200, y: 200 }
      })

      // Assert
      const node = sceneGraph.getNode('node-1')
      expect(node?.position).toEqual({ x: 200, y: 200 })
    })
  })

  describe('showLayer and hideLayer', () => {
    it('should show a layer', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)
      
      // Act
      sceneGraph.showLayer('main')

      // Assert
      const layer = sceneGraph.getLayer('main')
      expect(layer?.visible).toBe(true)
    })

    it('should hide a layer', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)
      
      // Act
      sceneGraph.hideLayer('main')

      // Assert
      const layer = sceneGraph.getLayer('main')
      expect(layer?.visible).toBe(false)
    })
  })

  describe('destroy', () => {
    it('should destroy the stage', () => {
      // Arrange
      const config = {
        canvas: { width: 800, height: 600, backgroundColor: '#fff', pixelRatio: 1 }
      }
      const sceneGraph = new SceneGraph(container, mockDefinition, config)
      const destroySpy = vi.spyOn(sceneGraph.stage, 'destroy')

      // Act
      sceneGraph.destroy()

      // Assert
      expect(destroySpy).toHaveBeenCalled()
    })
  })
})

describe('SceneNode', () => {
  describe('fromSpec', () => {
    it('should create node from spec with auto position', () => {
      // Arrange
      const mockLayer = {
        konvaLayer: { batchDraw: vi.fn(), getStage: vi.fn() }
      } as any
      
      const spec: NodeSpec = {
        id: 'test-node',
        type: 'box',
        position: 'auto',
        size: { width: 100, height: 100 },
        style: {},
        content: {},
        interactive: false,
        selectable: false,
        draggable: false,
        data: {}
      }

      // Act
      const node = SceneNode.fromSpec(spec, mockLayer)

      // Assert
      expect(node.id).toBe('test-node')
      expect(node.position).toEqual({ x: 0, y: 0 })
    })

    it('should create node from spec with auto size', () => {
      // Arrange
      const mockLayer = {
        konvaLayer: { batchDraw: vi.fn(), getStage: vi.fn() }
      } as any
      
      const spec: NodeSpec = {
        id: 'test-node',
        type: 'box',
        position: { x: 50, y: 50 },
        size: 'auto',
        style: {},
        content: {},
        interactive: false,
        selectable: false,
        draggable: false,
        data: {}
      }

      // Act
      const node = SceneNode.fromSpec(spec, mockLayer)

      // Assert
      expect(node.id).toBe('test-node')
      expect(node.size).toEqual({ width: 200, height: 100 })
    })
  })

  describe('setPosition', () => {
    it('should update node position', () => {
      // Arrange
      const mockLayer = {
        konvaLayer: { batchDraw: vi.fn(), getStage: vi.fn() }
      } as any
      
      const spec: NodeSpec = {
        id: 'test-node',
        type: 'box',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
        style: {},
        content: {},
        interactive: false,
        selectable: false,
        draggable: false,
        data: {}
      }
      const node = SceneNode.fromSpec(spec, mockLayer)

      // Act
      node.setPosition(100, 200)

      // Assert
      expect(node.position).toEqual({ x: 100, y: 200 })
    })
  })

  describe('selection state', () => {
    it('should select a selectable node', () => {
      // Arrange
      const mockLayer = {
        konvaLayer: { batchDraw: vi.fn(), getStage: vi.fn() }
      } as any
      
      const spec: NodeSpec = {
        id: 'test-node',
        type: 'box',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
        style: {},
        content: {},
        interactive: true,
        selectable: true,
        draggable: false,
        data: {}
      }
      const node = SceneNode.fromSpec(spec, mockLayer)

      // Act
      node.select()

      // Assert
      expect(node.selected).toBe(true)
    })

    it('should deselect a node', () => {
      // Arrange
      const mockLayer = {
        konvaLayer: { batchDraw: vi.fn(), getStage: vi.fn() }
      } as any
      
      const spec: NodeSpec = {
        id: 'test-node',
        type: 'box',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
        style: {},
        content: {},
        interactive: true,
        selectable: true,
        draggable: false,
        data: {}
      }
      const node = SceneNode.fromSpec(spec, mockLayer)
      node.select()

      // Act
      node.deselect()

      // Assert
      expect(node.selected).toBe(false)
    })
  })
})

