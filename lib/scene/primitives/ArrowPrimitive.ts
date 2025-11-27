import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * ArrowPrimitive - Directional connector/arrow
 * Used for: Data flow, relationships, process connections
 * Note: This is a simplified version - actual arrows between nodes
 * are handled by SceneEdge. This is for standalone arrow shapes.
 * Dark mode themed
 */
export function createArrowPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
  })
  
  // Dark mode colors
  const arrowColor = node.style.border || '#737373'
  const labelColor = '#a3a3a3'
  
  // Get arrow configuration from node data
  const config = {
    direction: node.data?.direction || 'right', // 'right', 'left', 'down', 'up'
    length: node.data?.length || node.size.width || 100,
    color: arrowColor,
    strokeWidth: node.style.borderWidth || 2,
    animated: node.data?.animated || false,
  }
  
  // Calculate arrow points based on direction
  let points: number[] = []
  
  switch (config.direction) {
    case 'right':
      points = [0, node.size.height / 2, config.length, node.size.height / 2]
      break
    case 'left':
      points = [config.length, node.size.height / 2, 0, node.size.height / 2]
      break
    case 'down':
      points = [node.size.width / 2, 0, node.size.width / 2, config.length]
      break
    case 'up':
      points = [node.size.width / 2, config.length, node.size.width / 2, 0]
      break
  }
  
  const arrow = new Konva.Arrow({
    points,
    pointerLength: 10,
    pointerWidth: 10,
    fill: config.color,
    stroke: config.color,
    strokeWidth: config.strokeWidth,
  })
  
  group.add(arrow)
  
  // Label text (if provided)
  if (node.content.title) {
    const labelX = config.direction === 'right' || config.direction === 'left' 
      ? config.length / 2 - 30
      : node.size.width / 2 - 30
    const labelY = config.direction === 'right' || config.direction === 'left'
      ? node.size.height / 2 + 10
      : config.length / 2 + 10
    
    const label = new Konva.Text({
      text: node.content.title,
      x: labelX,
      y: labelY,
      width: 60,
      align: 'center',
      fontSize: 11,
      fontFamily: 'Inter, sans-serif',
      fill: labelColor,
    })
    
    group.add(label)
  }
  
  // Animation (if enabled)
  if (config.animated) {
    arrow.dash([10, 5])
    const anim = new Konva.Animation((frame) => {
      const dashOffset = (frame?.time ?? 0) / 20
      arrow.dashOffset(-dashOffset)
    }, group.getLayer())
    anim.start()
  }
  
  return group
}
