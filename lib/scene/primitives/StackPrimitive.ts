import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * StackPrimitive - LIFO (Last In, First Out) stack visualization
 * Used for: Call stack, execution context, undo/redo history
 * Items are rendered from bottom to top
 * Dark mode themed
 */
export function createStackPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Green theme for stack
  const bgColor = node.style.background || '#1a1f1a'
  const borderColor = node.style.border || '#22c55e'
  const textColor = node.style.text || '#4ade80'
  const descColor = '#a3a3a3'
  const itemBgColor = '#1f2b1f'
  const itemBorderColor = '#22c55e'
  const itemTextColor = '#86efac'
  
  // Container box
  const container = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: bgColor,
    stroke: borderColor,
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
      fill: textColor,
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
      fill: descColor,
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
        fill: itemBgColor,
        cornerRadius: 4,
      })
      
      const leftBorder = new Konva.Rect({
        width: 4,
        height: 40,
        fill: itemBorderColor,
        cornerRadius: [4, 0, 0, 4],
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 16,
        y: 12,
        fontSize: 14,
        fontFamily: 'monospace',
        fontStyle: 'bold',
        fill: itemTextColor,
      })
      
      itemGroup.add(itemBg, leftBorder, itemText)
      group.add(itemGroup)
    }
  }
  
  return group
}
