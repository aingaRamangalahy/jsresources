import Konva from 'konva'
import type { Layer } from '~/types/visualization/spec'
import type { SceneNode } from './SceneNode'
import type { SceneEdge } from './SceneEdge'

export class SceneLayer {
  public id: string
  public name: string
  public zIndex: number
  public visible: boolean
  public konvaLayer: Konva.Layer
  private nodes: SceneNode[] = []
  private edges: SceneEdge[] = []
  
  constructor(definition: Layer, stage: Konva.Stage) {
    this.id = definition.id
    this.name = definition.name
    this.zIndex = definition.zIndex
    this.visible = definition.visible
    
    // Create Konva layer
    this.konvaLayer = new Konva.Layer({
      visible: this.visible
    })
    
    stage.add(this.konvaLayer)
  }
  
  addNode(node: SceneNode): void {
    this.nodes.push(node)
    this.konvaLayer.add(node.konvaGroup)
  }
  
  addEdge(edge: SceneEdge): void {
    this.edges.push(edge)
    this.konvaLayer.add(edge.konvaGroup)
  }
  
  getNodes(): SceneNode[] {
    return this.nodes
  }
  
  getEdges(): SceneEdge[] {
    return this.edges
  }
  
  show(): void {
    this.visible = true
    this.konvaLayer.visible(true)
    this.konvaLayer.batchDraw()
  }
  
  hide(): void {
    this.visible = false
    this.konvaLayer.visible(false)
    this.konvaLayer.batchDraw()
  }
}

