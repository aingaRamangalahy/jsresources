import Konva from 'konva'
import type { Edge as EdgeSpec } from '~/types/visualization/spec'
import type { SceneNode } from './SceneNode'
import type { SceneLayer } from './SceneLayer'

export class SceneEdge {
  public id: string
  public from: SceneNode
  public to: SceneNode
  public type: string
  public style: Record<string, any>
  public animated: boolean
  public label?: string
  public konvaGroup: Konva.Group
  
  constructor(spec: EdgeSpec, from: SceneNode, to: SceneNode, layer: SceneLayer) {
    this.id = spec.id
    this.from = from
    this.to = to
    this.type = spec.type
    this.style = spec.style
    this.animated = spec.animated ?? true
    this.label = spec.label
    
    // Create Konva arrow
    this.konvaGroup = this.createArrow()
  }
  
  private createArrow(): Konva.Group {
    const group = new Konva.Group()
    
    // Calculate smart connection points
    const points = this.calculateRoutedPath()
    
    // Create glow effect for better visibility
    const glowArrow = new Konva.Arrow({
      points,
      pointerLength: 14,
      pointerWidth: 14,
      fill: this.style.color,
      stroke: this.style.color,
      strokeWidth: (this.style.width || 2) + 4,
      opacity: 0.3,
      dash: this.animated ? [12, 6] : undefined,
      lineCap: 'round',
      lineJoin: 'round',
    })
    
    // Main arrow
    const arrow = new Konva.Arrow({
      points,
      pointerLength: 12,
      pointerWidth: 12,
      fill: this.style.color,
      stroke: this.style.color,
      strokeWidth: this.style.width || 2,
      dash: this.animated ? [10, 5] : undefined,
      lineCap: 'round',
      lineJoin: 'round',
    })
    
    group.add(glowArrow)
    group.add(arrow)
    
    // Add label if exists
    if (this.label) {
      // Calculate label position at midpoint
      const { x: labelX, y: labelY } = this.calculateLabelPosition(points)
      
      // Label background for better readability
      const labelBg = new Konva.Rect({
        x: labelX - 4,
        y: labelY - 12,
        width: this.label.length * 7 + 12,
        height: 18,
        fill: '#0a0a0a',
        cornerRadius: 4,
        opacity: 0.9,
      })
      
      const text = new Konva.Text({
        text: this.label,
        fontSize: 10,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontStyle: 'bold',
        fill: this.style.color,
        x: labelX,
        y: labelY - 9,
      })
      
      group.add(labelBg)
      group.add(text)
    }
    
    // Animate if needed (flowing animation)
    if (this.animated) {
      const anim = new Konva.Animation((frame) => {
        const dashOffset = (frame?.time ?? 0) / 30
        arrow.dashOffset(-dashOffset)
        glowArrow.dashOffset(-dashOffset)
      }, group.getLayer())
      anim.start()
    }
    
    return group
  }
  
  private calculateLabelPosition(points: number[]): { x: number; y: number } {
    // Find the midpoint of the path
    if (points.length === 4) {
      // Simple line: midpoint
      return {
        x: (points[0] + points[2]) / 2,
        y: (points[1] + points[3]) / 2 - 16
      }
    } else if (points.length >= 6) {
      // L-shape or more complex: use the bend point
      const midIdx = Math.floor(points.length / 2)
      return {
        x: points[midIdx] - 20,
        y: points[midIdx + 1] - 20
      }
    }
    return { x: points[0], y: points[1] - 20 }
  }
  
  /**
   * Calculate a routed path with smart edge detection
   * Determines the best exit/entry points based on relative positions
   */
  private calculateRoutedPath(): number[] {
    const fromBox = {
      x: this.from.position.x,
      y: this.from.position.y,
      width: this.from.size.width,
      height: this.from.size.height
    }
    
    const toBox = {
      x: this.to.position.x,
      y: this.to.position.y,
      width: this.to.size.width,
      height: this.to.size.height
    }
    
    // Calculate centers
    const fromCenterX = fromBox.x + fromBox.width / 2
    const fromCenterY = fromBox.y + fromBox.height / 2
    const toCenterX = toBox.x + toBox.width / 2
    const toCenterY = toBox.y + toBox.height / 2
    
    // Calculate distances
    const dx = toCenterX - fromCenterX
    const dy = toCenterY - fromCenterY
    
    let startX: number, startY: number, endX: number, endY: number
    
    // Determine best connection points based on relative positions
    // Prioritize shorter paths and avoid crossing through boxes
    
    const horizontalDist = Math.abs(dx)
    const verticalDist = Math.abs(dy)
    
    // If boxes are more horizontally separated, use left/right edges
    if (horizontalDist > verticalDist * 0.5) {
      if (dx > 0) {
        // Target is to the right
        startX = fromBox.x + fromBox.width
        startY = fromCenterY
        endX = toBox.x
        endY = toCenterY
      } else {
        // Target is to the left
        startX = fromBox.x
        startY = fromCenterY
        endX = toBox.x + toBox.width
        endY = toCenterY
      }
    } else {
      // Boxes are more vertically separated, use top/bottom edges
      if (dy > 0) {
        // Target is below
        startX = fromCenterX
        startY = fromBox.y + fromBox.height
        endX = toCenterX
        endY = toBox.y
      } else {
        // Target is above
        startX = fromCenterX
        startY = fromBox.y
        endX = toCenterX
        endY = toBox.y + toBox.height
      }
    }
    
    // Create path with optional bend for clarity
    const points: number[] = [startX, startY]
    
    // Add bend if there's significant offset in both directions
    const significantOffset = 40
    if (Math.abs(endX - startX) > significantOffset && Math.abs(endY - startY) > significantOffset) {
      // Create L-shaped path
      if (horizontalDist > verticalDist) {
        // Horizontal first, then vertical
        const midX = startX + (endX - startX) / 2
        points.push(midX, startY)
        points.push(midX, endY)
      } else {
        // Vertical first, then horizontal
        const midY = startY + (endY - startY) / 2
        points.push(startX, midY)
        points.push(endX, midY)
      }
    }
    
    points.push(endX, endY)
    
    return points
  }
  
  getPath(): { start: { x: number; y: number }; end: { x: number; y: number } } {
    return {
      start: this.from.position,
      end: this.to.position
    }
  }
}
