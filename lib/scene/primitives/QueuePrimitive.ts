import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * QueuePrimitive - FIFO (First In, First Out) queue visualization
 * Used for: Callback queue, microtask queue, event queue
 * Items are rendered vertically for better readability
 * Dark mode themed with step number indicator
 */
export function createQueuePrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors
  const bgColor = node.style.background || '#1f1a0f'
  const borderColor = node.style.border || '#f59e0b'
  const textColor = node.style.text || '#fbbf24'
  const descColor = '#a3a3a3'
  const itemBgColor = '#2a2319'
  const itemBorderColor = '#f59e0b'
  const itemTextColor = '#fcd34d'
  
  // Outer glow effect
  const glowRect = new Konva.Rect({
    x: -2,
    y: -2,
    width: node.size.width + 4,
    height: node.size.height + 4,
    fill: 'transparent',
    stroke: borderColor,
    strokeWidth: 1,
    cornerRadius: (node.style.borderRadius || 8) + 2,
    opacity: 0.3,
  })
  group.add(glowRect)
  
  // Container box
  const container = new Konva.Rect({
    width: node.size.width,
    height: node.size.height,
    fill: bgColor,
    stroke: borderColor,
    strokeWidth: node.style.borderWidth || 2,
    cornerRadius: node.style.borderRadius || 8,
    shadowColor: borderColor,
    shadowBlur: 10,
    shadowOpacity: 0.2,
  })
  
  group.add(container)
  
  // Step number badge (if provided)
  if (node.data?.stepNumber) {
    const badgeSize = 24
    const badgeX = node.size.width - badgeSize - 12
    const badgeY = 12
    
    const badgeBg = new Konva.Circle({
      x: badgeX + badgeSize / 2,
      y: badgeY + badgeSize / 2,
      radius: badgeSize / 2,
      fill: borderColor,
    })
    
    const badgeText = new Konva.Text({
      text: String(node.data.stepNumber),
      x: badgeX,
      y: badgeY + 5,
      width: badgeSize,
      fontSize: 12,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: '#000000',
      align: 'center',
    })
    
    group.add(badgeBg)
    group.add(badgeText)
  }
  
  // Title
  if (node.content.title) {
    const title = new Konva.Text({
      text: node.content.title,
      x: 16,
      y: 14,
      width: node.size.width - 48 - (node.data?.stepNumber ? 32 : 0),
      fontSize: 14,
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
      y: 36,
      fontSize: 10,
      fontFamily: 'Inter, sans-serif',
      fill: descColor,
    })
    group.add(desc)
  }
  
  // Queue items (FIFO - vertical layout, horizontal flow indicator)
  if (node.content.items && node.content.items.length > 0) {
    const startY = 58
    const itemHeight = 28
    const itemWidth = (node.size.width - 60) / Math.min(node.content.items.length, 3)
    let xOffset = 16
    
    // Queue flow indicator
    const flowIndicator = new Konva.Group({ x: 16, y: startY })
    
    // IN arrow
    const inArrow = new Konva.Group({ x: 0, y: -2 })
    const inText = new Konva.Text({
      text: 'IN →',
      fontSize: 8,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: borderColor,
      opacity: 0.7,
    })
    inArrow.add(inText)
    flowIndicator.add(inArrow)
    
    // OUT arrow
    const outArrow = new Konva.Group({ x: node.size.width - 60, y: -2 })
    const outText = new Konva.Text({
      text: '→ OUT',
      fontSize: 8,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: borderColor,
      opacity: 0.7,
    })
    outArrow.add(outText)
    flowIndicator.add(outArrow)
    
    group.add(flowIndicator)
    
    // Items in horizontal row
    for (let i = 0; i < node.content.items.length; i++) {
      const item = node.content.items[i]
      const itemGroup = new Konva.Group({ x: xOffset, y: startY + 12 })
      
      // Position indicator
      const posIndicator = new Konva.Text({
        text: i === 0 ? 'NEXT' : i === node.content.items.length - 1 ? 'LAST' : `#${i + 1}`,
        x: 0,
        y: -10,
        width: itemWidth - 8,
        align: 'center',
        fontSize: 8,
        fontFamily: 'Inter, sans-serif',
        fill: descColor,
        opacity: 0.6,
      })
      
      const itemBg = new Konva.Rect({
        width: itemWidth - 8,
        height: itemHeight,
        fill: i === 0 ? itemBgColor : 'transparent',
        stroke: itemBorderColor,
        strokeWidth: i === 0 ? 2 : 1,
        cornerRadius: 4,
        opacity: i === 0 ? 1 : 0.6,
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 0,
        y: 7,
        width: itemWidth - 8,
        align: 'center',
        fontSize: 11,
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        fontStyle: i === 0 ? 'bold' : 'normal',
        fill: itemTextColor,
        opacity: i === 0 ? 1 : 0.7,
      })
      
      itemGroup.add(posIndicator, itemBg, itemText)
      group.add(itemGroup)
      
      xOffset += itemWidth
      
      // Arrow between items
      if (i < node.content.items.length - 1) {
        const arrowGroup = new Konva.Group({ x: xOffset - 14, y: startY + 26 })
        const arrow = new Konva.Arrow({
          points: [0, 0, 8, 0],
          pointerLength: 5,
          pointerWidth: 5,
          fill: itemBorderColor,
          stroke: itemBorderColor,
          strokeWidth: 1,
          opacity: 0.5,
        })
        arrowGroup.add(arrow)
        group.add(arrowGroup)
      }
    }
    
    // "First one out" indicator on the rightmost item
    if (node.content.items.length > 0) {
      const firstOutIndicator = new Konva.Text({
        text: '↑ dequeues first',
        x: 16,
        y: startY + itemHeight + 18,
        fontSize: 9,
        fontFamily: 'Inter, sans-serif',
        fill: borderColor,
        opacity: 0.5,
      })
      group.add(firstOutIndicator)
    }
  }
  
  return group
}
