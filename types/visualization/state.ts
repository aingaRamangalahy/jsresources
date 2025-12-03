/**
 * Visualization UI State Types
 * 
 * Types for managing visualization component state and user interactions.
 * Used by the new Konva-based visualization architecture.
 */

/**
 * Component types in JavaScript Runtime visualization
 * Extended to support the new architecture
 */
export type ComponentType = 
  | 'js-engine'
  | 'call-stack'
  | 'memory-heap'
  | 'web-apis'
  | 'callback-queue'
  | 'microtask-queue'
  | 'event-loop'

/**
 * Explanation panel state
 * Determines what content is shown in the side explanation panel
 */
export interface ExplanationState {
  type: 'global' | 'component' | 'step'
  title: string
  description: string
  details?: string[]
  component?: ComponentType
  codeExample?: string           // Code example with comments
  keyPoints?: string[]           // Key takeaways
  commonMistakes?: string[]      // Common pitfalls to avoid
  tryThis?: string               // Interactive suggestion
}

