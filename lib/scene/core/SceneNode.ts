import Konva from 'konva'
import type { Node as NodeSpec } from '~/types/visualization/spec'
import type { SceneLayer } from './SceneLayer'
import { createPrimitive } from '../primitives/registry'

export class SceneNode {
  public id!: string
  public type!: string
  public position!: { x: number; y: number }
  public size!: { width: number; height: number }
  public style!: Record<string, any>
  public content!: Record<string, any>
  public interactive!: boolean
  public selectable!: boolean
  public draggable!: boolean
  public data!: Record<string, any>
  public layer!: SceneLayer
  public konvaGroup!: Konva.Group
  
  // Runtime state
  public selected: boolean = false
  public hovered: boolean = false
  
  static fromSpec(spec: NodeSpec, layer: SceneLayer): SceneNode {
    return new SceneNode({
      ...spec,
      layer,
      position: spec.position === 'auto' ? { x: 0, y: 0 } : spec.position,
      size: spec.size === 'auto' ? { width: 200, height: 100 } : spec.size
    })
  }
  
  constructor(config: any) {
    Object.assign(this, config)
    
    // Create Konva group and primitives
    this.konvaGroup = createPrimitive(this)
    
    // Set up interactions
    if (this.interactive) {
      this.konvaGroup.on('click tap', () => {
        this.select()
      })
      
      this.konvaGroup.on('mouseenter', () => {
        this.hover()
        const stage = this.layer.konvaLayer.getStage()
        if (stage) {
          stage.container().style.cursor = 'pointer'
        }
      })
      
      this.konvaGroup.on('mouseleave', () => {
        this.unhover()
        const stage = this.layer.konvaLayer.getStage()
        if (stage) {
          stage.container().style.cursor = 'default'
        }
      })
    }
    
    if (this.draggable) {
      this.konvaGroup.draggable(true)
    }
  }
  
  update(updates: Partial<NodeSpec>): void {
    Object.assign(this, updates)
    // Update Konva representation
    if (updates.position && updates.position !== 'auto') {
      this.konvaGroup.position(updates.position)
    }
    this.layer.konvaLayer.batchDraw()
  }
  
  setPosition(x: number, y: number): void {
    this.position = { x, y }
    this.konvaGroup.position({ x, y })
    this.layer.konvaLayer.batchDraw()
  }
  
  setSize(width: number, height: number): void {
    this.size = { width, height }
    // Primitives handle their own size updates
    this.layer.konvaLayer.batchDraw()
  }
  
  select(): void {
    if (this.selectable) {
      this.selected = true
      // Visual feedback
      this.konvaGroup.opacity(1)
      this.konvaGroup.scale({ x: 1.05, y: 1.05 })
      this.layer.konvaLayer.batchDraw()
    }
  }
  
  deselect(): void {
    this.selected = false
    this.konvaGroup.opacity(1)
    this.konvaGroup.scale({ x: 1, y: 1 })
    this.layer.konvaLayer.batchDraw()
  }
  
  hover(): void {
    this.hovered = true
    if (!this.selected) {
      this.konvaGroup.opacity(0.9)
      this.konvaGroup.scale({ x: 1.02, y: 1.02 })
      this.layer.konvaLayer.batchDraw()
    }
  }
  
  unhover(): void {
    this.hovered = false
    if (!this.selected) {
      this.konvaGroup.opacity(1)
      this.konvaGroup.scale({ x: 1, y: 1 })
      this.layer.konvaLayer.batchDraw()
    }
  }
}

