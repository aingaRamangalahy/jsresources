import type { SceneDefinition, Node, GridLayoutConfig } from '~/types/visualization/spec'

interface LayoutResult {
  nodes: Map<string, { x: number; y: number; width: number; height: number }>
}

export class LayoutEngine {
  static applyLayout(definition: SceneDefinition): LayoutResult {
    const layoutType = definition.layout.type
    const config = definition.layout.config
    
    switch (layoutType) {
      case 'grid':
        return this.gridLayout(definition, config as GridLayoutConfig)
      case 'flow':
        return this.flowLayout(definition, config)
      default:
        return this.defaultLayout(definition)
    }
  }
  
  private static gridLayout(definition: SceneDefinition, config: GridLayoutConfig): LayoutResult {
    const nodes = new Map<string, { x: number; y: number; width: number; height: number }>()
    
    // Collect all nodes from all layers
    const allNodes: Node[] = []
    for (const layer of definition.layers) {
      allNodes.push(...layer.nodes)
    }
    
    // Grid configuration
    const columns = config.columns || 2
    const gap = config.gap || 24
    const rowGap = config.rowGap ?? gap
    const columnGap = config.columnGap ?? gap
    const padding = config.padding || 40
    const columnWidth = config.columnWidth || 340
    const masonry = config.masonry ?? false
    
    // Calculate sizes for all nodes
    const nodeSizes = new Map<string, { width: number; height: number }>()
    
    for (const node of allNodes) {
      const colSpan = node.layout?.colSpan || 1
      let width: number
      let height: number
      
      if (node.size !== 'auto') {
        width = node.size.width
        height = node.size.height
      } else {
        // Calculate width based on colSpan
        width = colSpan > 1 
          ? (columnWidth * colSpan) + (columnGap * (colSpan - 1))
          : columnWidth
        
        // Default heights by type
        switch (node.type) {
          case 'stack':
            height = 380
            break
          case 'queue':
            height = 160
            break
          case 'heap':
            height = 200
            break
          case 'timeline':
            width = (columnWidth * columns) + (columnGap * (columns - 1))
            height = 240
            break
          case 'box':
            height = 200
            break
          case 'group':
            height = 300
            break
          default:
            height = 200
        }
      }
      
      nodeSizes.set(node.id, { width, height })
    }
    
    // Use masonry or standard grid layout
    if (masonry) {
      return this.masonryLayout(allNodes, nodeSizes, columns, columnWidth, columnGap, rowGap, padding)
    }
    
    return this.standardGridLayout(allNodes, nodeSizes, columns, columnWidth, columnGap, rowGap, padding)
  }
  
  private static masonryLayout(
    allNodes: Node[],
    nodeSizes: Map<string, { width: number; height: number }>,
    columns: number,
    columnWidth: number,
    columnGap: number,
    rowGap: number,
    padding: number
  ): LayoutResult {
    const nodes = new Map<string, { x: number; y: number; width: number; height: number }>()
    
    // Track height of each column independently
    const columnHeights: number[] = new Array(columns).fill(padding)
    
    // Separate nodes: explicit column vs auto-placed
    const explicitColumnNodes: Node[] = []
    const autoNodes: Node[] = []
    
    for (const node of allNodes) {
      if (node.layout?.column !== undefined) {
        explicitColumnNodes.push(node)
      } else {
        autoNodes.push(node)
      }
    }
    
    // Sort explicit nodes by column, then by any row hint
    explicitColumnNodes.sort((a, b) => {
      const colA = a.layout?.column ?? 0
      const colB = b.layout?.column ?? 0
      if (colA !== colB) return colA - colB
      const rowA = a.layout?.row ?? 0
      const rowB = b.layout?.row ?? 0
      return rowA - rowB
    })
    
    // Place nodes with explicit column
    for (const node of explicitColumnNodes) {
      const col = node.layout!.column!
      const colSpan = node.layout?.colSpan || 1
      const size = nodeSizes.get(node.id)!
      
      // For colSpan > 1, find the max height among spanned columns
      let y = padding
      for (let c = col; c < Math.min(col + colSpan, columns); c++) {
        y = Math.max(y, columnHeights[c])
      }
      
      const x = padding + (col * (columnWidth + columnGap))
      const width = colSpan > 1
        ? (columnWidth * colSpan) + (columnGap * (colSpan - 1))
        : size.width
      
      nodes.set(node.id, { x, y, width, height: size.height })
      
      // Update column heights for all spanned columns
      const newHeight = y + size.height + rowGap
      for (let c = col; c < Math.min(col + colSpan, columns); c++) {
        columnHeights[c] = newHeight
      }
    }
    
    // Auto-place remaining nodes in shortest column
    for (const node of autoNodes) {
      const colSpan = node.layout?.colSpan || 1
      const size = nodeSizes.get(node.id)!
      
      // Find the column(s) with minimum height that can fit colSpan
      let bestCol = 0
      let minHeight = Infinity
      
      for (let c = 0; c <= columns - colSpan; c++) {
        // Get max height among columns this node would span
        let maxHeightInSpan = 0
        for (let s = c; s < c + colSpan; s++) {
          maxHeightInSpan = Math.max(maxHeightInSpan, columnHeights[s])
        }
        
        if (maxHeightInSpan < minHeight) {
          minHeight = maxHeightInSpan
          bestCol = c
        }
      }
      
      const x = padding + (bestCol * (columnWidth + columnGap))
      const y = minHeight
      const width = colSpan > 1
        ? (columnWidth * colSpan) + (columnGap * (colSpan - 1))
        : size.width
      
      nodes.set(node.id, { x, y, width, height: size.height })
      
      // Update column heights
      const newHeight = y + size.height + rowGap
      for (let c = bestCol; c < bestCol + colSpan; c++) {
        columnHeights[c] = newHeight
      }
    }
    
    return { nodes }
  }
  
  private static standardGridLayout(
    allNodes: Node[],
    nodeSizes: Map<string, { width: number; height: number }>,
    columns: number,
    columnWidth: number,
    columnGap: number,
    rowGap: number,
    padding: number
  ): LayoutResult {
    const nodes = new Map<string, { x: number; y: number; width: number; height: number }>()
    
    // Separate nodes into explicitly positioned and auto-positioned
    const explicitNodes: Node[] = []
    const autoNodes: Node[] = []
    
    for (const node of allNodes) {
      if (node.layout?.row !== undefined && node.layout?.column !== undefined) {
        explicitNodes.push(node)
      } else {
        autoNodes.push(node)
      }
    }
    
    // Build grid occupancy map and track row heights
    let maxRow = 0
    for (const node of explicitNodes) {
      const row = node.layout!.row!
      const rowSpan = node.layout?.rowSpan || 1
      maxRow = Math.max(maxRow, row + rowSpan)
    }
    
    const rowHeights: number[] = new Array(Math.max(maxRow, 10)).fill(0)
    
    interface GridCell {
      nodeId: string | null
      occupied: boolean
    }
    
    const grid: GridCell[][] = []
    for (let r = 0; r < rowHeights.length; r++) {
      grid[r] = []
      for (let c = 0; c < columns; c++) {
        grid[r][c] = { nodeId: null, occupied: false }
      }
    }
    
    // Place explicitly positioned nodes
    for (const node of explicitNodes) {
      const row = node.layout!.row!
      const col = node.layout!.column!
      const rowSpan = node.layout?.rowSpan || 1
      const colSpan = node.layout?.colSpan || 1
      const size = nodeSizes.get(node.id)!
      
      for (let r = row; r < row + rowSpan; r++) {
        if (!grid[r]) {
          grid[r] = []
          for (let c = 0; c < columns; c++) {
            grid[r][c] = { nodeId: null, occupied: false }
          }
        }
        for (let c = col; c < Math.min(col + colSpan, columns); c++) {
          grid[r][c] = { nodeId: node.id, occupied: true }
        }
      }
      
      const heightPerRow = size.height / rowSpan
      for (let r = row; r < row + rowSpan; r++) {
        if (!rowHeights[r]) rowHeights[r] = 0
        rowHeights[r] = Math.max(rowHeights[r], heightPerRow)
      }
    }
    
    // Auto-place remaining nodes
    let autoRow = 0
    let autoCol = 0
    
    for (const node of autoNodes) {
      const colSpan = node.layout?.colSpan || 1
      const rowSpan = node.layout?.rowSpan || 1
      const size = nodeSizes.get(node.id)!
      
      let placed = false
      while (!placed) {
        while (autoRow >= grid.length) {
          grid.push([])
          for (let c = 0; c < columns; c++) {
            grid[grid.length - 1][c] = { nodeId: null, occupied: false }
          }
          rowHeights.push(0)
        }
        
        let fits = true
        if (autoCol + colSpan > columns) {
          fits = false
        } else {
          for (let r = autoRow; r < autoRow + rowSpan && fits; r++) {
            if (r >= grid.length) {
              grid[r] = []
              for (let c = 0; c < columns; c++) {
                grid[r][c] = { nodeId: null, occupied: false }
              }
              rowHeights[r] = 0
            }
            for (let c = autoCol; c < autoCol + colSpan && fits; c++) {
              if (grid[r][c].occupied) fits = false
            }
          }
        }
        
        if (fits) {
          for (let r = autoRow; r < autoRow + rowSpan; r++) {
            for (let c = autoCol; c < autoCol + colSpan; c++) {
              grid[r][c] = { nodeId: node.id, occupied: true }
            }
          }
          
          const heightPerRow = size.height / rowSpan
          for (let r = autoRow; r < autoRow + rowSpan; r++) {
            rowHeights[r] = Math.max(rowHeights[r] || 0, heightPerRow)
          }
          
          if (!node.layout) (node as any).layout = {}
          ;(node as any).layout.row = autoRow
          ;(node as any).layout.column = autoCol
          
          placed = true
          autoCol += colSpan
          if (autoCol >= columns) {
            autoCol = 0
            autoRow++
          }
        } else {
          autoCol++
          if (autoCol >= columns) {
            autoCol = 0
            autoRow++
          }
        }
      }
    }
    
    // Calculate actual positions
    for (const node of allNodes) {
      const row = node.layout?.row ?? 0
      const col = node.layout?.column ?? 0
      const rowSpan = node.layout?.rowSpan || 1
      const colSpan = node.layout?.colSpan || 1
      const size = nodeSizes.get(node.id)!
      
      const x = padding + (col * (columnWidth + columnGap))
      
      let y = padding
      for (let r = 0; r < row; r++) {
        y += (rowHeights[r] || 0) + rowGap
      }
      
      const width = colSpan > 1
        ? (columnWidth * colSpan) + (columnGap * (colSpan - 1))
        : size.width
      
      let height = 0
      for (let r = row; r < row + rowSpan; r++) {
        height += rowHeights[r] || 0
        if (r < row + rowSpan - 1) height += rowGap
      }
      height = Math.max(height, size.height)
      
      nodes.set(node.id, { x, y, width, height })
    }
    
    return { nodes }
  }
  
  private static flowLayout(definition: SceneDefinition, config: any): LayoutResult {
    const nodes = new Map<string, { x: number; y: number; width: number; height: number }>()
    
    const allNodes: Node[] = []
    for (const layer of definition.layers) {
      allNodes.push(...layer.nodes)
    }
    
    const gap = config.gap || 24
    const padding = config.padding || 40
    let currentX = padding
    let currentY = padding
    let rowHeight = 0
    const maxWidth = config.maxWidth || 1200
    
    for (const node of allNodes) {
      const width = node.size !== 'auto' ? node.size.width : 300
      const height = node.size !== 'auto' ? node.size.height : 200
      
      if (currentX + width > maxWidth && currentX > padding) {
        currentX = padding
        currentY += rowHeight + gap
        rowHeight = 0
      }
      
      nodes.set(node.id, { x: currentX, y: currentY, width, height })
      
      currentX += width + gap
      rowHeight = Math.max(rowHeight, height)
    }
    
    return { nodes }
  }
  
  private static defaultLayout(definition: SceneDefinition): LayoutResult {
    const nodes = new Map<string, { x: number; y: number; width: number; height: number }>()
    
    const allNodes: Node[] = []
    for (const layer of definition.layers) {
      allNodes.push(...layer.nodes)
    }
    
    let currentY = 40
    
    for (const node of allNodes) {
      const width = node.size !== 'auto' ? node.size.width : 300
      const height = node.size !== 'auto' ? node.size.height : 200
      
      nodes.set(node.id, { x: 40, y: currentY, width, height })
      
      currentY += height + 24
    }
    
    return { nodes }
  }
}
