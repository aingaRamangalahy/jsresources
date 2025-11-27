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
    this.animated = spec.animated
    this.label = spec.label
    
    // Create Konva arrow
    this.konvaGroup = this.createArrow()
  }
  
  private createArrow(): Konva.Group {
    const group = new Konva.Group()
    
    // Calculate smart connection points
    const points = this.calculateRoutedPath()
    
    const arrow = new Konva.Arrow({
      points,
      pointerLength: 10,
      pointerWidth: 10,
      fill: this.style.color,
      stroke: this.style.color,
      strokeWidth: this.style.width,
      dash: this.animated ? [10, 5] : undefined,
    })
    
    group.add(arrow)
    
    // Add label if exists
    if (this.label) {
      // Position label at midpoint of path
      const midIdx = Math.floor(points.length / 4) * 2
      const labelX = points[midIdx]
      const labelY = points[midIdx + 1]
      
      const text = new Konva.Text({
        text: this.label,
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
        fill: '#64748b',
        x: labelX + 8,
        y: labelY - 20,
      })
      group.add(text)
    }
    
    // Animate if needed
    if (this.animated) {
      const anim = new Konva.Animation((frame) => {
        const dashOffset = (frame?.time ?? 0) / 20
        arrow.dashOffset(-dashOffset)
      }, group.getLayer())
      anim.start()
    }
    
    return group
  }
  
  /**
   * Calculate a routed path that avoids straight line crossing
   * Uses orthogonal routing (horizontal and vertical segments)
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
    
    // Determine best exit and entry points
    const fromCenterX = fromBox.x + fromBox.width / 2
    const fromCenterY = fromBox.y + fromBox.height / 2
    const toCenterX = toBox.x + toBox.width / 2
    const toCenterY = toBox.y + toBox.height / 2
    
    // Decide which edges to use based on relative positions
    let startX, startY, endX, endY
    
    // If "to" is to the right of "from", exit right and enter left
    if (toCenterX > fromCenterX) {
      startX = fromBox.x + fromBox.width
      startY = fromCenterY
      endX = toBox.x
      endY = toCenterY
    }
    // If "to" is to the left of "from", exit left and enter right
    else {
      startX = fromBox.x
      startY = fromCenterY
      endX = toBox.x + toBox.width
      endY = toCenterY
    }
    
    // Create orthogonal path (L-shape or straight)
    const points: number[] = []
    
    points.push(startX, startY)
    
    // If there's significant vertical offset, add a bend
    if (Math.abs(endY - startY) > 50) {
      // Add intermediate points for L-shape
      const midX = startX + (endX - startX) / 2
      points.push(midX, startY)
      points.push(midX, endY)
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

