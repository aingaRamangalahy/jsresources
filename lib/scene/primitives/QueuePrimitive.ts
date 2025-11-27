import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * QueuePrimitive - FIFO (First In, First Out) queue visualization
 * Used for: Callback queue, microtask queue, event queue
 * Items are rendered horizontally from left to right
 * Dark mode themed
 */
export function createQueuePrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Amber theme for queue
  const bgColor = node.style.background || '#1f1a14'
  const borderColor = node.style.border || '#f59e0b'
  const textColor = node.style.text || '#fbbf24'
  const descColor = '#a3a3a3'
  const itemBgColor = '#2a2319'
  const itemBorderColor = '#f59e0b'
  const itemTextColor = '#fcd34d'
  
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
  
  // Queue items (FIFO - horizontal layout)
  if (node.content.items && node.content.items.length > 0) {
    let xOffset = 16
    const yStart = 80
    const itemWidth = 80
    const itemSpacing = 90
    
    for (let i = 0; i < node.content.items.length; i++) {
      const item = node.content.items[i]
      const itemGroup = new Konva.Group({ x: xOffset, y: yStart })
      
      const itemBg = new Konva.Rect({
        width: itemWidth,
        height: 60,
        fill: itemBgColor,
        stroke: itemBorderColor,
        strokeWidth: 2,
        cornerRadius: 4,
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 0,
        y: 20,
        width: itemWidth,
        align: 'center',
        fontSize: 14,
        fontFamily: 'monospace',
        fontStyle: 'bold',
        fill: itemTextColor,
      })
      
      itemGroup.add(itemBg, itemText)
      group.add(itemGroup)
      
      xOffset += itemSpacing
      
      // Arrow between items (if not the last item)
      if (i < node.content.items.length - 1 && xOffset < node.size.width - itemWidth) {
        const arrow = new Konva.Arrow({
          points: [xOffset - itemSpacing + itemWidth + 5, yStart + 30, xOffset - 5, yStart + 30],
          pointerLength: 8,
          pointerWidth: 8,
          fill: itemBorderColor,
          stroke: itemBorderColor,
          strokeWidth: 2,
        })
        group.add(arrow)
      }
    }
  }
  
  return group
}
