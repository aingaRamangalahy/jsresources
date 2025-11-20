// Event Loop Visualization Types

export type ComponentType = 'call-stack' | 'web-apis' | 'callback-queue' | 'microtask-queue' | 'event-loop'

export type AnimationActionType = 
  | 'add-to-stack'
  | 'remove-from-stack'
  | 'add-to-web-apis'
  | 'remove-from-web-apis'
  | 'add-to-callback-queue'
  | 'remove-from-callback-queue'
  | 'add-to-microtask-queue'
  | 'remove-from-microtask-queue'
  | 'event-loop-check'
  | 'highlight-line'

export interface StackItem {
  id: string
  name: string
  type: 'function' | 'global'
  color?: string
}

export interface WebAPIItem {
  id: string
  name: string
  type: 'setTimeout' | 'fetch' | 'promise' | 'other'
  duration?: number
  color?: string
}

export interface QueueItem {
  id: string
  name: string
  callback: string
  color?: string
}

export interface CanvasState {
  callStack: StackItem[]
  webAPIs: WebAPIItem[]
  callbackQueue: QueueItem[]
  microtaskQueue: QueueItem[]
}

export interface AnimationStep {
  // Which line of code is being executed (1-indexed)
  lineNumber: number
  
  // Actions to perform on the canvas
  actions: AnimationAction[]
  
  // Duration in seconds for this step
  duration?: number
  
  // Explanation text for this step
  explanation?: string
}

export interface AnimationAction {
  type: AnimationActionType
  target?: ComponentType
  data?: StackItem | WebAPIItem | QueueItem
  itemId?: string
  delay?: number
}

export interface ComponentExplanation {
  component: ComponentType
  title: string
  description: string
}

export interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  language: string
  
  // Global explanation shown before animation starts
  globalExplanation: string
  
  // Component explanations shown when user clicks on components
  componentExplanations: ComponentExplanation[]
  
  // Animation steps for the code execution
  steps: AnimationStep[]
}

export interface ExplanationState {
  type: 'global' | 'component' | 'step'
  title: string
  description: string
  component?: ComponentType
}

export interface AnimationControls {
  isPlaying: boolean
  isPaused: boolean
  currentStep: number
  totalSteps: number
  speed: number // 0.5 = half speed, 1 = normal, 2 = double speed
}

