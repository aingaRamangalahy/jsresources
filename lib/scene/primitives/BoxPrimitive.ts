import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * BoxPrimitive - Generic container for displaying content
 * Used for: Simple components, containers, groups with items
 * Dark mode themed with optional step number indicator
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
  
  // Outer glow effect for better visual hierarchy
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
  
  // Background rectangle
  const rect = new Konva.Rect({
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
  
  group.add(rect)
  
  let yOffset = 20
  const leftPadding = 16
  
  // Step number badge (if provided in node data)
  if (node.data?.stepNumber) {
    const badgeSize = 24
    const badgeX = node.size.width - badgeSize - 12
    const badgeY = 12
    
    // Badge background
    const badgeBg = new Konva.Circle({
      x: badgeX + badgeSize / 2,
      y: badgeY + badgeSize / 2,
      radius: badgeSize / 2,
      fill: borderColor,
    })
    
    // Badge number
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
  
  // Title text
  if (node.content.title) {
    const title = new Konva.Text({
      text: node.content.title,
      x: leftPadding,
      y: yOffset,
      width: node.size.width - 48 - (node.data?.stepNumber ? 32 : 0),
      fontSize: 16,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
      fill: textColor,
    })
    group.add(title)
    yOffset += 32
  }
  
  // Description text
  if (node.content.description) {
    const desc = new Konva.Text({
      text: node.content.description,
      x: leftPadding,
      y: yOffset,
      width: node.size.width - 32,
      fontSize: 11,
      fontFamily: 'Inter, sans-serif',
      fill: descColor,
      lineHeight: 1.4,
    })
    group.add(desc)
    yOffset += 28
  }
  
  // Items
  if (node.content.items && node.content.items.length > 0) {
    yOffset += 8
    for (const item of node.content.items) {
      const itemGroup = new Konva.Group({ x: leftPadding, y: yOffset })
      
      const itemBg = new Konva.Rect({
        width: node.size.width - 32,
        height: 30,
        fill: itemBgColor,
        cornerRadius: 4,
        stroke: borderColor,
        strokeWidth: 1,
        opacity: 0.5,
      })
      
      const itemText = new Konva.Text({
        text: item.label,
        x: 10,
        y: 7,
        fontSize: 12,
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        fill: itemTextColor,
      })
      
      itemGroup.add(itemBg, itemText)
      group.add(itemGroup)
      
      yOffset += 36
    }
  }
  
  // Add custom SVG if provided (for event loop visualization)
  if (node.data?.svg) {
    // Create a simple visual representation instead of actual SVG
    const svgGroup = new Konva.Group({
      x: node.size.width / 2 - 80,
      y: node.size.height - 70,
    })
    
    // Animated loop ellipse
    const loopEllipse = new Konva.Ellipse({
      x: 80,
      y: 30,
      radiusX: 70,
      radiusY: 25,
      stroke: textColor,
      strokeWidth: 3,
      dash: [8, 4],
    })
    
    // Arrow indicator
    const arrowHead = new Konva.RegularPolygon({
      x: 145,
      y: 30,
      sides: 3,
      radius: 8,
      fill: textColor,
      rotation: 90,
    })
    
    // Loop text
    const loopText = new Konva.Text({
      text: '∞ loop',
      x: 50,
      y: 22,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      fill: textColor,
    })
    
    svgGroup.add(loopEllipse, arrowHead, loopText)
    group.add(svgGroup)
    
    // Animate the loop
    const anim = new Konva.Animation((frame) => {
      const dashOffset = (frame?.time ?? 0) / 40
      loopEllipse.dashOffset(-dashOffset)
    }, group.getLayer())
    anim.start()
  }
  
  return group
}
