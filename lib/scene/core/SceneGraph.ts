import Konva from 'konva'
import type { SceneDefinition, Node as NodeSpec } from '~/types/visualization/spec'
import { SceneLayer } from './SceneLayer'
import { SceneNode } from './SceneNode'
import { SceneEdge } from './SceneEdge'
import { LayoutEngine } from '../builders/LayoutEngine'

export class SceneGraph {
  public stage: Konva.Stage
  private layers: Map<string, SceneLayer>
  private nodes: Map<string, SceneNode>
  private edges: Map<string, SceneEdge>
  
  constructor(container: HTMLDivElement, definition: SceneDefinition, config: any) {
    // Create Konva stage
    this.stage = new Konva.Stage({
      container,
      width: config.canvas.width === 'auto' ? container.clientWidth : config.canvas.width,
      height: config.canvas.height === 'auto' ? container.clientHeight : config.canvas.height,
    })
    
    this.layers = new Map()
    this.nodes = new Map()
    this.edges = new Map()
    
    this.buildFromDefinition(definition)
  }
  
  private buildFromDefinition(definition: SceneDefinition): void {
    // Apply layout to get node positions
    const layoutResult = LayoutEngine.applyLayout(definition)
    
    // Create layers
    for (const layerDef of definition.layers) {
      const layer = new SceneLayer(layerDef, this.stage)
      this.layers.set(layerDef.id, layer)
      
      // Create nodes in this layer
      for (const nodeDef of layerDef.nodes) {
        // Apply layout position if auto
        const layoutInfo = layoutResult.nodes.get(nodeDef.id)
        const nodeDefWithPosition = {
          ...nodeDef,
          position: nodeDef.position === 'auto' && layoutInfo 
            ? { x: layoutInfo.x, y: layoutInfo.y }
            : nodeDef.position,
          size: nodeDef.size === 'auto' && layoutInfo
            ? { width: layoutInfo.width, height: layoutInfo.height }
            : nodeDef.size
        }
        
        const node = SceneNode.fromSpec(nodeDefWithPosition, layer)
        this.nodes.set(nodeDef.id, node)
        layer.addNode(node)
      }
      
      // Create edges in this layer
      if (layerDef.edges) {
        for (const edgeDef of layerDef.edges) {
          const fromNode = this.nodes.get(edgeDef.from)
          const toNode = this.nodes.get(edgeDef.to)
          
          if (fromNode && toNode) {
            const edge = new SceneEdge(edgeDef, fromNode, toNode, layer)
            this.edges.set(edgeDef.id, edge)
            layer.addEdge(edge)
          }
        }
      }
    }
  }
  
  // Query methods
  getNode(id: string): SceneNode | undefined {
    return this.nodes.get(id)
  }
  
  getLayer(id: string): SceneLayer | undefined {
    return this.layers.get(id)
  }
  
  getAllNodes(): SceneNode[] {
    return Array.from(this.nodes.values())
  }
  
  getVisibleLayers(): SceneLayer[] {
    return Array.from(this.layers.values()).filter(l => l.visible)
  }
  
  // Mutation methods
  updateNode(id: string, updates: Partial<NodeSpec>): void {
    const node = this.nodes.get(id)
    if (node) {
      node.update(updates)
    }
  }
  
  showLayer(id: string): void {
    this.layers.get(id)?.show()
  }
  
  hideLayer(id: string): void {
    this.layers.get(id)?.hide()
  }
  
  destroy(): void {
    this.stage.destroy()
  }
}

