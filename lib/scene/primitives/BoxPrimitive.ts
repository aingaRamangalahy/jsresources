import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * BoxPrimitive - Generic container for displaying content
 * Used for: Simple components, containers, groups with items
 * Dark mode themed
 */
export function createBoxPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors
  const bgColor = node.style.background || '#1f1f1f'
  const borderColor = node.style.border || '#404040'
  const textColor = node.style.text || '#fafafa'
  const descColor = '#a3a3a3'
  const itemBgColor = '#2a2a2a'
  const itemTextColor = '#e5e5e5'
  
  // Background rectangle
  const rect = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: bgColor,
    stroke: borderColor,
    strokeWidth: node.style.borderWidth || 2,
    cornerRadius: node.style.borderRadius || 8,
  })
  
  group.add(rect)
  
  let yOffset = 20
  
  // Title text
  if (node.content.title) {
    const title = new Konva.Text({
      text: node.content.title,
      x: 16,
      y: yOffset,
      width: node.size.width - 32,
      fontSize: 16,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: textColor,
    })
    group.add(title)
    yOffset += 40
  }
  
  // Description text
  if (node.content.description) {
    const desc = new Konva.Text({
      text: node.content.description,
      x: 16,
      y: yOffset,
      width: node.size.width - 32,
      fontSize: 12,
      fontFamily: 'Inter, sans-serif',
      fill: descColor,
    })
    group.add(desc)
    yOffset += 30
  }
  
  // Items
  if (node.content.items && node.content.items.length > 0) {
    for (const item of node.content.items) {
      const itemGroup = new Konva.Group({ x: 16, y: yOffset })
      
      const itemBg = new Konva.Rect({
        width: node.size.width - 32,
        height: 32,
        fill: itemBgColor,
        cornerRadius: 4,
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 12,
        y: 8,
        fontSize: 14,
        fontFamily: 'monospace',
        fill: itemTextColor,
      })
      
      itemGroup.add(itemBg, itemText)
      group.add(itemGroup)
      
      yOffset += 40
    }
  }
  
  return group
}
