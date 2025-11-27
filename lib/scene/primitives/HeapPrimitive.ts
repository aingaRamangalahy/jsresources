import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * HeapPrimitive - Memory heap visualization
 * Used for: Memory allocation, object storage, reference management
 * Displays items in a grid-like memory layout
 * Dark mode themed
 */
export function createHeapPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Orange theme for heap
  const bgColor = node.style.background || '#1f1714'
  const borderColor = node.style.border || '#f97316'
  const textColor = node.style.text || '#fb923c'
  const descColor = '#a3a3a3'
  const itemBgColor = '#2a1f19'
  const itemBorderColor = '#f97316'
  const itemTextColor = '#fdba74'
  
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
        fill: itemBgColor,
        stroke: itemBorderColor,
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
        fill: itemTextColor,
        wrap: 'word',
      })
      
      itemGroup.add(itemBg, itemText)
      group.add(itemGroup)
    })
  }
  
  return group
}
