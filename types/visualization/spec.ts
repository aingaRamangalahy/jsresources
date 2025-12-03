// Core TypeScript interfaces for visualization specifications

export interface VisualizationSpec {
  // Metadata
  id: string                        // 'js-runtime', 'closures', etc.
  version: string                   // Semantic versioning
  title: string
  description: string
  tags: string[]                    // For filtering/search
  
  // Scene Definition
  scene: SceneDefinition
  
  // Content
  explanations: ExplanationMap
  
  // Behavior
  interactions: InteractionConfig
  
  // Rendering Hints
  rendering: RenderingConfig
}

export interface SceneDefinition {
  // Layout strategy
  layout: {
    type: 'grid' | 'flow' | 'tree' | 'force-directed' | 'custom'
    config: GridLayoutConfig | Record<string, any>
  }
  
  // Layers (like Photoshop layers)
  layers: Layer[]
  
  // Global styles
  theme: ThemeConfig
}

// Grid layout configuration
export interface GridLayoutConfig {
  columns: number                   // Number of columns in the grid
  rows?: number | 'auto'            // Number of rows ('auto' = grows as needed)
  gap: number                       // Gap between cells in pixels
  rowGap?: number                   // Optional separate row gap (overrides gap)
  columnGap?: number                // Optional separate column gap (overrides gap)
  padding?: number                  // Padding around the grid
  columnWidth?: number              // Base width per column (default: 340)
  rowHeight?: number | 'auto'       // Base height per row ('auto' = fit content)
  masonry?: boolean                 // Enable masonry layout (items stack in shortest column)
  responsive?: {
    mobile?: { columns: number }
    tablet?: { columns: number }
    desktop?: { columns: number }
  }
}

export interface Layer {
  id: string
  name: string
  zIndex: number
  visible: boolean
  
  // Nodes in this layer
  nodes: Node[]
  
  // Relationships between nodes
  edges: Edge[]
}

export interface Node {
  id: string
  type: PrimitiveType           // 'box', 'stack', 'queue', 'arrow', 'timeline'
  
  // Positioning
  position: { x: number; y: number } | 'auto'
  size: { width: number; height: number } | 'auto'
  
  // Appearance
  style: NodeStyle
  
  // Content
  content: {
    title?: string
    items?: Array<{ id: string; label: string }>
    description?: string
  }
  
  // Behavior
  interactive: boolean
  selectable: boolean
  
  // Grid layout positioning (CSS Grid-like)
  layout?: {
    row?: number                // 0-based row index (auto-placed if not specified)
    column?: number             // 0-based column index (auto-placed if not specified)
    rowSpan?: number            // Number of rows this block spans (default: 1)
    colSpan?: number            // Number of columns this block spans (default: 1)
  }
  
  // Data binding
  data: Record<string, any>
}

export interface Edge {
  id: string
  from: string                  // Node ID
  to: string                    // Node ID
  type: 'arrow' | 'line' | 'curve' | 'bezier'
  style: EdgeStyle
  animated: boolean
  label?: string
}

// Primitive types (basic building blocks)
export type PrimitiveType = 
  | 'box'                       // Generic container
  | 'stack'                     // LIFO stack (call stack)
  | 'queue'                     // FIFO queue (callback queue)
  | 'heap'                      // Memory heap visualization
  | 'timeline'                  // Step-by-step timeline
  | 'arrow'                     // Directional connector
  | 'label'                     // Text annotation
  | 'group'                     // Grouped components
  | 'code-block'                // Syntax-highlighted code
  | 'custom'                    // Custom component

export interface NodeStyle {
  border?: string
  background?: string
  borderWidth?: number
  borderRadius?: number
  text?: string
  opacity?: number
  // Extended style properties for label primitive
  fontSize?: number
  fontFamily?: string
  fontStyle?: string
  align?: string
}

export interface EdgeStyle {
  color: string
  width: number
  dashArray?: number[]
  opacity?: number
}

export interface ThemeConfig {
  fontFamily: string
  fontSize: number
  borderRadius: number
  spacing: number
}

export interface ExplanationMap {
  global: {
    title: string
    content: string
    details: string[]
    codeExample?: string           // Code example with comments
    keyPoints?: string[]           // Key takeaways
    commonMistakes?: string[]      // Common pitfalls to avoid
    tryThis?: string               // Interactive suggestion
  }
  nodes: Record<string, {          // Keyed by node ID
    title: string
    content: string
    details: string[]
    codeExample?: string           // Code example with comments
    keyPoints?: string[]           // Key takeaways
    commonMistakes?: string[]      // Common pitfalls to avoid
    tryThis?: string               // Interactive suggestion
  }>
}

export interface InteractionConfig {
  // What happens on node click
  onClick: 'select' | 'expand' | 'navigate' | 'custom'
  
  // Hover behavior
  onHover: 'highlight' | 'tooltip' | 'preview' | 'none'
  
  // Keyboard shortcuts
  keyboardShortcuts: Record<string, string>
  
  // Animation triggers
  animationTriggers?: Array<{
    event: string
    target: string
    animation: string
  }>
}

export interface RenderingConfig {
  // Canvas configuration
  canvas: {
    width: number | 'auto'
    height: number | 'auto'
    backgroundColor: string
    pixelRatio: number | 'auto'  // For high-DPI displays
  }
  
  // Performance hints
  complexity: 'low' | 'medium' | 'high'
  nodeCount: number
}
