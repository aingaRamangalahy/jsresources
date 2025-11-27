import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * TimelinePrimitive - Step-by-step timeline visualization
 * Used for: Event loop steps, process flows, sequential operations
 * Displays items as numbered steps in a vertical timeline
 * Dark mode themed
 */
export function createTimelinePrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors - Indigo theme for timeline
  const bgColor = node.style.background || '#1a1a2e'
  const borderColor = node.style.border || '#6366f1'
  const textColor = node.style.text || '#818cf8'
  const descColor = '#a3a3a3'
  const stepBgColor = '#1e1e3f'
  const stepCircleColor = '#6366f1'
  const stepCircleBorder = '#818cf8'
  const stepTextColor = '#c7d2fe'
  const lineColor = '#818cf8'
  
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
      width: node.size.width - 32,
      fontSize: 11,
      fontFamily: 'monospace',
      fill: descColor,
    })
    group.add(desc)
  }
  
  // Timeline items
  if (node.content.items && node.content.items.length > 0) {
    let yOffset = 80
    
    node.content.items.forEach((item, index) => {
      const itemGroup = new Konva.Group({ x: 16, y: yOffset })
      
      // Step number circle
      const circle = new Konva.Circle({
        x: 16,
        y: 16,
        radius: 14,
        fill: stepCircleColor,
        stroke: stepCircleBorder,
        strokeWidth: 2,
      })
      
      const stepNumber = new Konva.Text({
        text: String(index + 1),
        x: 16 - 10,
        y: 16 - 8,
        width: 20,
        align: 'center',
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'bold',
        fill: '#ffffff',
      })
      
      // Step content
      const stepBg = new Konva.Rect({
        x: 40,
        y: 0,
        width: node.size.width - 72,
        height: 32,
        fill: stepBgColor,
        cornerRadius: 4,
      })
      
      const stepText = new Konva.Text({
        text: item.label,
        x: 48,
        y: 8,
        width: node.size.width - 88,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
        fill: stepTextColor,
      })
      
      itemGroup.add(stepBg, circle, stepNumber, stepText)
      group.add(itemGroup)
      
      // Connecting line to next step (if not last item)
      if (index < node.content.items.length - 1) {
        const line = new Konva.Line({
          points: [32, yOffset + 32, 32, yOffset + 44],
          stroke: lineColor,
          strokeWidth: 2,
          dash: [4, 4],
        })
        group.add(line)
      }
      
      yOffset += 44
    })
  }
  
  return group
}
