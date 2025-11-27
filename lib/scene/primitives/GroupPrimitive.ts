import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * GroupPrimitive - Container for grouping other components
 * Used for: JS Engine (contains Call Stack + Memory Heap), logical groupings
 * Displays a bordered container with title and optional description
 * Dark mode themed
 */
export function createGroupPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Blue theme for groups
  const bgColor = node.style.background || 'transparent'
  const borderColor = node.style.border || '#3b82f6'
  const descColor = '#a3a3a3'
  
  // Container box with dashed border to indicate it's a grouping
  const container = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: bgColor,
    stroke: borderColor,
    strokeWidth: node.style.borderWidth || 2,
    cornerRadius: node.style.borderRadius || 8,
    dash: [10, 5], // Dashed border to distinguish from regular boxes
  })
  
  group.add(container)
  
  // Title badge at top
  if (node.content.title) {
    const titleBg = new Konva.Rect({
      x: 16,
      y: -12,
      width: node.content.title.length * 8 + 16,
      height: 24,
      fill: borderColor,
      cornerRadius: 4,
    })
    
    const title = new Konva.Text({
      text: node.content.title,
      x: 24,
      y: -6,
      fontSize: 12,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: '#ffffff',
      letterSpacing: 0.5,
    })
    
    group.add(titleBg, title)
  }
  
  // Description (if provided)
  if (node.content.description) {
    const desc = new Konva.Text({
      text: node.content.description,
      x: 16,
      y: 20,
      width: node.size.width - 32,
      fontSize: 11,
      fontFamily: 'Inter, sans-serif',
      fill: descColor,
      fontStyle: 'italic',
    })
    group.add(desc)
  }
  
  return group
}
