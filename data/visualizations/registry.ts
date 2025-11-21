import type { VisualizationSpec } from '~/types/visualization/spec'

type SpecLoader = () => Promise<{ default: VisualizationSpec }>

// Registry maps ID → lazy loader
const registry = new Map<string, SpecLoader>([
  ['js-runtime', () => import('./js-runtime/spec')],
  // More visualizations will be added here in future phases
])

// Cache loaded specs
const cache = new Map<string, VisualizationSpec>()

/**
 * Validates that a spec has all required fields
 */
function validateSpec(spec: any): asserts spec is VisualizationSpec {
  if (!spec.id || typeof spec.id !== 'string') {
    throw new Error('Spec validation failed: missing or invalid id')
  }
  if (!spec.version || typeof spec.version !== 'string') {
    throw new Error('Spec validation failed: missing or invalid version')
  }
  if (!spec.title || typeof spec.title !== 'string') {
    throw new Error('Spec validation failed: missing or invalid title')
  }
  if (!spec.description || typeof spec.description !== 'string') {
    throw new Error('Spec validation failed: missing or invalid description')
  }
  if (!Array.isArray(spec.tags)) {
    throw new Error('Spec validation failed: tags must be an array')
  }
  if (!spec.scene || !spec.scene.layers || !Array.isArray(spec.scene.layers)) {
    throw new Error('Spec validation failed: missing or invalid scene definition')
  }
  if (!spec.explanations || !spec.explanations.global) {
    throw new Error('Spec validation failed: missing or invalid explanations')
  }
  if (!spec.interactions) {
    throw new Error('Spec validation failed: missing interactions config')
  }
  if (!spec.rendering) {
    throw new Error('Spec validation failed: missing rendering config')
  }
}

/**
 * Load a visualization spec by ID
 * @param id - The visualization ID (e.g., 'js-runtime')
 * @returns The loaded and validated visualization spec
 * @throws Error if visualization not found or validation fails
 */
export async function loadVisualization(id: string): Promise<VisualizationSpec> {
  // Return cached if available
  if (cache.has(id)) {
    return cache.get(id)!
  }
  
  // Load spec
  const loader = registry.get(id)
  if (!loader) {
    throw new Error(`Visualization '${id}' not found in registry`)
  }
  
  const module = await loader()
  const spec = module.default
  
  // Validate spec
  validateSpec(spec)
  
  // Cache and return
  cache.set(id, spec)
  return spec
}

/**
 * List all available visualizations
 * @returns Array of visualization metadata (id and title)
 */
export function listVisualizations(): Array<{ id: string; title: string }> {
  return Array.from(registry.keys()).map(id => ({
    id,
    title: formatTitle(id)
  }))
}

/**
 * Preload a visualization spec in the background
 * @param id - The visualization ID to preload
 */
export function preloadVisualization(id: string): void {
  loadVisualization(id).catch(console.error)
}

/**
 * Clear the spec cache (useful for testing or forcing reload)
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Format a visualization ID into a human-readable title
 * @param id - The visualization ID (e.g., 'js-runtime')
 * @returns Formatted title (e.g., 'JavaScript Runtime')
 */
function formatTitle(id: string): string {
  // Special case for common abbreviations
  const specialCases: Record<string, string> = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'css': 'CSS',
    'html': 'HTML',
  }
  
  return id
    .split('-')
    .map(word => {
      const lower = word.toLowerCase()
      if (specialCases[lower]) {
        return specialCases[lower]
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

