import Konva from 'konva'
import type { PrimitiveType } from '~/types/visualization/spec'
import type { SceneNode } from '../core/SceneNode'

type PrimitiveFactory = (node: SceneNode) => Konva.Group

// Simple placeholder implementations for primitives
// These will be fully implemented in Phase 2
function createBoxPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
    draggable: node.draggable,
  })
  
  // Background rectangle
  const rect = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: node.style.background || '#ffffff',
    stroke: node.style.border || '#000000',
    strokeWidth: node.style.borderWidth || 2,
    cornerRadius: node.style.borderRadius || 8,
  })
  
  group.add(rect)
  
  // Title text
  if (node.content.title) {
    const title = new Konva.Text({
      text: node.content.title,
      x: 16,
      y: 16,
      width: node.size.width - 32,
      fontSize: 16,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: node.style.text || '#1e293b',
    })
    group.add(title)
  }
  
  return group
}

function createStackPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createQueuePrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createHeapPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createTimelinePrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createArrowPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createLabelPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createGroupPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createCodeBlockPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

function createCustomPrimitive(node: SceneNode): Konva.Group {
  // Placeholder - will be fully implemented in Phase 2
  return createBoxPrimitive(node)
}

const primitiveRegistry = new Map<PrimitiveType, PrimitiveFactory>([
  ['box', createBoxPrimitive],
  ['stack', createStackPrimitive],
  ['queue', createQueuePrimitive],
  ['heap', createHeapPrimitive],
  ['timeline', createTimelinePrimitive],
  ['arrow', createArrowPrimitive],
  ['label', createLabelPrimitive],
  ['group', createGroupPrimitive],
  ['code-block', createCodeBlockPrimitive],
  ['custom', createCustomPrimitive],
])

export function createPrimitive(node: SceneNode): Konva.Group {
  const factory = primitiveRegistry.get(node.type as PrimitiveType)
  
  if (!factory) {
    console.warn(`Primitive type '${node.type}' not found, falling back to 'box'`)
    return primitiveRegistry.get('box')!(node)
  }
  
  return factory(node)
}

export function registerPrimitive(type: string, factory: PrimitiveFactory): void {
  primitiveRegistry.set(type as PrimitiveType, factory)
}

export function listPrimitives(): PrimitiveType[] {
  return Array.from(primitiveRegistry.keys())
}

