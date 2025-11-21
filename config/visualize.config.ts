/**
 * Visualization Configuration
 * 
 * Central configuration for visualization component theming.
 * This allows you to change all component colors in one place.
 */

import type { VisualizationVariant } from '~/types/visualization/theme'

/**
 * Default color mappings for JavaScript Runtime components
 * 
 * You can easily change these to experiment with different color schemes:
 * - Switch variants around to see what looks best
 * - Use the same variant for multiple components for a monochrome look
 * - Create themed sets (warm colors, cool colors, etc.)
 */
export const VISUALIZATION_COLORS: Record<string, VisualizationVariant> = {
  // Core JS Engine components
  'call-stack': 'emerald',      // Green - Active execution
  'memory-heap': 'orange',       // Orange - Memory storage
  'js-engine': 'cyan',           // Cyan - Engine core
  
  // Browser/Runtime APIs
  'web-apis': 'rose',            // Rose - External browser APIs
  
  // Event Loop components
  'event-loop': 'violet',        // Violet - Central coordinator
  'callback-queue': 'amber',     // Amber - Macrotask queue
  'microtask-queue': 'pink',     // Pink - High priority microtasks
}

/**
 * Get the color variant for a specific component ID
 * 
 * @param componentId - The component identifier (e.g., 'call-stack')
 * @param fallback - Fallback variant if componentId not found (default: 'blue')
 * @returns The color variant to use
 * 
 * @example
 * const variant = getVariantForComponent('call-stack') // Returns 'emerald'
 */
export function getVariantForComponent(
  componentId: string,
  fallback: VisualizationVariant = 'blue'
): VisualizationVariant {
  return VISUALIZATION_COLORS[componentId] || fallback
}

/**
 * Alternative color schemes for experimentation
 * 
 * Uncomment and use these in VISUALIZATION_COLORS to try different looks
 */

// Cool colors scheme (blues and purples)
export const COOL_COLORS_SCHEME: Record<string, VisualizationVariant> = {
  'call-stack': 'blue',
  'memory-heap': 'cyan',
  'js-engine': 'indigo',
  'web-apis': 'violet',
  'event-loop': 'blue',
  'callback-queue': 'teal',
  'microtask-queue': 'indigo',
}

// Warm colors scheme (reds, oranges, yellows)
export const WARM_COLORS_SCHEME: Record<string, VisualizationVariant> = {
  'call-stack': 'orange',
  'memory-heap': 'rose',
  'js-engine': 'amber',
  'web-apis': 'rose',
  'event-loop': 'amber',
  'callback-queue': 'orange',
  'microtask-queue': 'pink',
}

// Monochrome scheme (variations of one color)
export const MONOCHROME_SCHEME: Record<string, VisualizationVariant> = {
  'call-stack': 'violet',
  'memory-heap': 'violet',
  'js-engine': 'violet',
  'web-apis': 'violet',
  'event-loop': 'violet',
  'callback-queue': 'violet',
  'microtask-queue': 'violet',
}

/**
 * Helper to switch between color schemes
 * 
 * @example
 * // In your component or config:
 * const colors = useColorScheme('warm') // or 'cool', 'monochrome', 'default'
 */
export function useColorScheme(
  scheme: 'default' | 'cool' | 'warm' | 'monochrome' = 'default'
): Record<string, VisualizationVariant> {
  switch (scheme) {
    case 'cool':
      return COOL_COLORS_SCHEME
    case 'warm':
      return WARM_COLORS_SCHEME
    case 'monochrome':
      return MONOCHROME_SCHEME
    default:
      return VISUALIZATION_COLORS
  }
}

/**
 * All available variants with their semantic meanings
 * Useful for documentation or UI color pickers
 */
export const VARIANT_INFO = {
  emerald: { hex: '#10b981', name: 'Emerald', description: 'Fresh, active, growth' },
  orange: { hex: '#f97316', name: 'Orange', description: 'Warm, storage, energy' },
  rose: { hex: '#f43f5e', name: 'Rose', description: 'External, attention, vibrant' },
  violet: { hex: '#8b5cf6', name: 'Violet', description: 'Central, coordination, flow' },
  amber: { hex: '#f59e0b', name: 'Amber', description: 'Warning, queued, pending' },
  pink: { hex: '#ec4899', name: 'Pink', description: 'Priority, urgent, important' },
  cyan: { hex: '#06b6d4', name: 'Cyan', description: 'Technical, cool, precise' },
  blue: { hex: '#3b82f6', name: 'Blue', description: 'Stable, trustworthy, default' },
  indigo: { hex: '#6366f1', name: 'Indigo', description: 'Deep, processing, logic' },
  teal: { hex: '#14b8a6', name: 'Teal', description: 'Balanced, async, modern' },
} as const

