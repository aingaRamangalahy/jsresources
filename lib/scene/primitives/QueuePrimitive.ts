import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * QueuePrimitive - FIFO (First In, First Out) queue visualization
 * Used for: Callback queue, microtask queue, event queue
 * Items are rendered horizontally from left to right
 */
export function createQueuePrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
    draggable: node.draggable,
  })
  
  // Container box
  const container = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: node.style.background || '#fffbeb',
    stroke: node.style.border || '#ca8a04',
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
      fill: node.style.text || '#a16207',
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
        fill: '#fef3c7',
        stroke: '#ca8a04',
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
        fill: '#a16207',
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
          fill: '#ca8a04',
          stroke: '#ca8a04',
          strokeWidth: 2,
        })
        group.add(arrow)
      }
    }
  }
  
  return group
}

