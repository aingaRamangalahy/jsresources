/**
 * Visualization Theming System
 * 
 * Purpose-agnostic color variants for visualization components.
 * Components use variants without needing to know their semantic purpose.
 */

/**
 * Available color variants for visualization components
 * Each variant provides a complete color system (border, background, text, etc.)
 */
export type VisualizationVariant = 
  | 'emerald'
  | 'orange'
  | 'rose'
  | 'violet'
  | 'amber'
  | 'pink'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'teal'

/**
 * Layout modes for visualization item containers
 */
export type VisualizationLayout = 
  | 'vertical'    // Stack items vertically (default for most)
  | 'horizontal'  // Display items in a row (queues, timelines)
  | 'grid'        // Automatic grid layout
  | 'grid-2'      // 2-column grid

/**
 * Base props for themed visualization components
 */
export interface VisualizationComponentProps {
  /** Color variant to use for theming this component */
  variant: VisualizationVariant
  
  /** Layout mode for items (optional, component may have its own default) */
  layout?: VisualizationLayout
  
  /** Whether this component is currently selected/active */
  isSelected?: boolean
}

/**
 * Type guard to check if a string is a valid variant
 */
export function isValidVariant(variant: string): variant is VisualizationVariant {
  return [
    'emerald', 'orange', 'rose', 'violet', 'amber',
    'pink', 'cyan', 'blue', 'indigo', 'teal'
  ].includes(variant)
}

/**
 * Helper to generate variant class name
 */
export function getVariantClass(variant: VisualizationVariant): string {
  return `viz-variant-${variant}`
}

/**
 * Helper to generate layout class name
 */
export function getLayoutClass(layout: VisualizationLayout): string {
  return `viz-items--${layout}`
}

