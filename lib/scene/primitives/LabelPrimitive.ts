import Konva from 'konva'
import type { SceneNode } from '../core/SceneNode'

/**
 * LabelPrimitive - Text annotation/label
 * Used for: Annotations, captions, standalone text
 * Simple text display with optional background
 */
export function createLabelPrimitive(node: SceneNode): Konva.Group {
  const group = new Konva.Group({
    x: node.position.x,
    y: node.position.y,
    draggable: node.draggable,
  })
  
  // Optional background
  if (node.style.background) {
    const bg = new Konva.Rect({
      width: node.size.width,
      height: node.size.height,
      fill: node.style.background,
      stroke: node.style.border,
      strokeWidth: node.style.borderWidth || 1,
      cornerRadius: node.style.borderRadius || 4,
    })
    group.add(bg)
  }
  
  // Text
  if (node.content.title) {
    const text = new Konva.Text({
      text: node.content.title,
      x: node.style.background ? 12 : 0,
      y: node.style.background ? 8 : 0,
      width: node.size.width - (node.style.background ? 24 : 0),
      fontSize: node.style.fontSize || 14,
      fontFamily: node.style.fontFamily || 'Inter, sans-serif',
      fontStyle: node.style.fontStyle || 'normal',
      fill: node.style.text || '#1e293b',
      align: node.style.align || 'left',
      wrap: 'word',
    })
    group.add(text)
  }
  
  // Description (smaller text below title)
  if (node.content.description) {
    const desc = new Konva.Text({
      text: node.content.description,
      x: node.style.background ? 12 : 0,
      y: (node.style.background ? 8 : 0) + (node.style.fontSize || 14) + 8,
      width: node.size.width - (node.style.background ? 24 : 0),
      fontSize: (node.style.fontSize || 14) - 2,
      fontFamily: node.style.fontFamily || 'Inter, sans-serif',
      fill: '#64748b',
      align: node.style.align || 'left',
      wrap: 'word',
    })
    group.add(desc)
  }
  
  return group
}

