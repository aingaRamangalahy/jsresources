import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * HeapPrimitive - Memory heap visualization
 * Used for: Memory allocation, object storage, reference management
 * Displays items in a grid-like memory layout
 */
export function createHeapPrimitive(node: SceneNode): Konva.Group {
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
    stroke: node.style.border || '#ea580c',
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
      fill: node.style.text || '#c2410c',
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
  
  // Heap items (grid layout to simulate memory blocks)
  if (node.content.items && node.content.items.length > 0) {
    const startY = 80
    const itemsPerRow = 2
    const itemWidth = (node.size.width - 48) / itemsPerRow
    const itemHeight = 60
    const gap = 8
    
    node.content.items.forEach((item, index) => {
      const row = Math.floor(index / itemsPerRow)
      const col = index % itemsPerRow
      
      const x = 16 + col * (itemWidth + gap)
      const y = startY + row * (itemHeight + gap)
      
      const itemGroup = new Konva.Group({ x, y })
      
      // Memory block background
      const itemBg = new Konva.Rect({
        width: itemWidth,
        height: itemHeight,
        fill: '#fff7ed',
        stroke: '#ea580c',
        strokeWidth: 2,
        cornerRadius: 4,
        dash: [5, 5],
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 8,
        y: itemHeight / 2 - 8,
        width: itemWidth - 16,
        align: 'center',
        fontSize: 12,
        fontFamily: 'monospace',
        fill: '#c2410c',
        wrap: 'word',
      })
      
      itemGroup.add(itemBg, itemText)
      group.add(itemGroup)
    })
  }
  
  return group
}

