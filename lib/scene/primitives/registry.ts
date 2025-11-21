import Konva from 'konva'
import type { PrimitiveType } from '~/types/visualization/spec'
import type { SceneNode } from '../core/SceneNode'

import { createBoxPrimitive } from './BoxPrimitive'
import { createStackPrimitive } from './StackPrimitive'
import { createQueuePrimitive } from './QueuePrimitive'
import { createHeapPrimitive } from './HeapPrimitive'
import { createTimelinePrimitive } from './TimelinePrimitive'
import { createArrowPrimitive } from './ArrowPrimitive'
import { createLabelPrimitive } from './LabelPrimitive'
import { createGroupPrimitive } from './GroupPrimitive'

/**
 * Type for primitive factory functions
 * Each factory takes a SceneNode and returns a Konva.Group
 */
export type PrimitiveFactory = (node: SceneNode) => Konva.Group

/**
 * Registry mapping primitive types to their factory functions
 */
const primitiveRegistry = new Map<PrimitiveType, PrimitiveFactory>([
  ['box', createBoxPrimitive],
  ['stack', createStackPrimitive],
  ['queue', createQueuePrimitive],
  ['heap', createHeapPrimitive],
  ['timeline', createTimelinePrimitive],
  ['arrow', createArrowPrimitive],
  ['label', createLabelPrimitive],
  ['group', createGroupPrimitive],
])

/**
 * Creates a primitive Konva.Group for a given SceneNode
 * Falls back to 'box' primitive if the requested type is not found
 * 
 * @param node - The SceneNode to create a primitive for
 * @returns Konva.Group representing the primitive
 */
export function createPrimitive(node: SceneNode): Konva.Group {
  const factory = primitiveRegistry.get(node.type as PrimitiveType)
  
  if (!factory) {
    console.warn(`Primitive type '${node.type}' not found in registry, falling back to 'box'`)
    return primitiveRegistry.get('box')!(node)
  }
  
  return factory(node)
}

/**
 * Registers a custom primitive factory
 * Useful for adding project-specific primitives
 * 
 * @param type - The primitive type identifier
 * @param factory - Factory function that creates the primitive
 */
export function registerPrimitive(type: string, factory: PrimitiveFactory): void {
  primitiveRegistry.set(type as PrimitiveType, factory)
}

/**
 * Lists all registered primitive types
 * 
 * @returns Array of primitive type identifiers
 */
export function listPrimitives(): PrimitiveType[] {
  return Array.from(primitiveRegistry.keys())
}

/**
 * Checks if a primitive type is registered
 * 
 * @param type - The primitive type to check
 * @returns True if the primitive is registered
 */
export function hasPrimitive(type: string): boolean {
  return primitiveRegistry.has(type as PrimitiveType)
}
