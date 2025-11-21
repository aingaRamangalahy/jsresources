import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * StackPrimitive - LIFO (Last In, First Out) stack visualization
 * Used for: Call stack, execution context, undo/redo history
 * Items are rendered from bottom to top
 */
export function createStackPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
    draggable: node.draggable,
  })
  
  // Container box
  const container = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: node.style.background || '#ffffff',
    stroke: node.style.border || '#16a34a',
    strokeWidth: node.style.borderWidth || 2,
    cornerRadius: node.style.borderRadius || 8,
  })
  
  group.add(container)
  
  // Title
  if (node.content.title) {
    const title = new Konva.Text({
      text: node.content.title,
      x: 16,
      y: 16,
      fontSize: 16,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: node.style.text || '#15803d',
    })
    group.add(title)
  }
  
  // Description
  if (node.content.description) {
    const desc = new Konva.Text({
      text: node.content.description,
      x: 16,
      y: 45,
      fontSize: 12,
      fontFamily: 'Inter, sans-serif',
      fill: '#64748b',
    })
    group.add(desc)
  }
  
  // Stack items (LIFO - rendered bottom to top)
  if (node.content.items && node.content.items.length > 0) {
    const items = [...node.content.items].reverse()
    let yOffset = node.size.height - 16
    
    for (const item of items) {
      yOffset -= 44
      
      const itemGroup = new Konva.Group({ x: 16, y: yOffset })
      
      // Item background with left border
      const itemBg = new Konva.Rect({
        width: node.size.width - 32,
        height: 40,
        fill: '#f0fdf4',
        cornerRadius: 4,
      })
      
      const leftBorder = new Konva.Rect({
        width: 4,
        height: 40,
        fill: '#16a34a',
        cornerRadius: [4, 0, 0, 4],
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 16,
        y: 12,
        fontSize: 14,
        fontFamily: 'monospace',
        fontStyle: 'bold',
        fill: '#15803d',
      })
      
      itemGroup.add(itemBg, leftBorder, itemText)
      group.add(itemGroup)
    }
  }
  
  return group
}

