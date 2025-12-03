import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * StackPrimitive - LIFO (Last In, First Out) stack visualization
 * Used for: Call stack, execution context, undo/redo history
 * Items are rendered from bottom to top
 * Dark mode themed with step number indicator
 */
export function createStackPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Green theme for stack
  const bgColor = node.style.background || '#0f1f0f'
  const borderColor = node.style.border || '#22c55e'
  const textColor = node.style.text || '#4ade80'
  const descColor = '#a3a3a3'
  const itemBgColor = '#1a2f1a'
  const itemBorderColor = '#22c55e'
  const itemTextColor = '#86efac'
  
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
      fill: '#ffffff',
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
      y: 16,
      width: node.size.width - 48 - (node.data?.stepNumber ? 32 : 0),
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
      fontSize: 11,
      fontFamily: 'Inter, sans-serif',
      fill: descColor,
    })
    group.add(desc)
  }
  
  // Stack items (LIFO - rendered bottom to top)
  if (node.content.items && node.content.items.length > 0) {
    const items = [...node.content.items].reverse()
    let yOffset = node.size.height - 16
    
    // Draw push/pop indicator
    const indicatorText = new Konva.Text({
      text: '↑ PUSH / POP ↓',
      x: 0,
      y: 65,
      width: node.size.width,
      align: 'center',
      fontSize: 9,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: borderColor,
      opacity: 0.6,
    })
    group.add(indicatorText)
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      yOffset -= 40
      
      const itemGroup = new Konva.Group({ x: 16, y: yOffset })
      
      // Item background with gradient effect
      const itemBg = new Konva.Rect({
        width: node.size.width - 32,
        height: 36,
        fill: itemBgColor,
        cornerRadius: 4,
        opacity: 0.9 - (i * 0.1), // Fade older items slightly
      })
      
      // Left accent border
      const leftBorder = new Konva.Rect({
        width: 4,
        height: 36,
        fill: itemBorderColor,
        cornerRadius: [4, 0, 0, 4],
        opacity: 0.9 - (i * 0.1),
      })
      
      // Index indicator (shows stack position)
      const indexText = new Konva.Text({
        text: `[${items.length - 1 - i}]`,
        x: 12,
        y: 10,
        fontSize: 10,
        fontFamily: 'JetBrains Mono, monospace',
        fill: descColor,
        opacity: 0.7,
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 40,
        y: 10,
        fontSize: 13,
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        fontStyle: 'bold',
        fill: itemTextColor,
      })
      
      itemGroup.add(itemBg, leftBorder, indexText, itemText)
      group.add(itemGroup)
    }
    
    // Top of stack indicator
    const topIndicator = new Konva.Text({
      text: '← TOP',
      x: node.size.width - 50,
      y: yOffset + 10,
      fontSize: 10,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: borderColor,
      opacity: 0.7,
    })
    group.add(topIndicator)
  }
  
  return group
}
