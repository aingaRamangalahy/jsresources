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
    
    const arrow = new Konva.Arrow({
      points: [
        this.from.position.x + this.from.size.width,
        this.from.position.y + this.from.size.height / 2,
        this.to.position.x,
        this.to.position.y + this.to.size.height / 2
      ],
      pointerLength: 10,
      pointerWidth: 10,
      fill: this.style.color,
      stroke: this.style.color,
      strokeWidth: this.style.width,
    })
    
    group.add(arrow)
    
    // Add label if exists
    if (this.label) {
      const text = new Konva.Text({
        text: this.label,
        fontSize: 12,
        fill: '#64748b',
        x: (this.from.position.x + this.to.position.x) / 2,
        y: (this.from.position.y + this.to.position.y) / 2 - 10,
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
  
  getPath(): { start: { x: number; y: number }; end: { x: number; y: number } } {
    return {
      start: this.from.position,
      end: this.to.position
    }
  }
}

