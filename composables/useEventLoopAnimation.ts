import { ref, computed, watch } from 'vue'
import gsap from 'gsap'
import type { 
  CodeExample, 
  AnimationStep, 
  AnimationControls, 
  CanvasState,
  AnimationAction,
  ExplanationState 
} from '~/types/visualization'

export function useEventLoopAnimation(codeExample: Ref<CodeExample | null>) {
  // State
  const canvasState = ref<CanvasState>({
    callStack: [],
    webAPIs: [],
    callbackQueue: [],
    microtaskQueue: []
  })

  const controls = ref<AnimationControls>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 1
  })

  const currentLineNumber = ref<number>(0)
  
  const explanationState = ref<ExplanationState>({
    type: 'global',
    title: 'Event Loop',
    description: ''
  })

  // GSAP Timeline
  let timeline: gsap.core.Timeline | null = null

  // Computed
  const hasExample = computed(() => codeExample.value !== null)
  
  const progress = computed(() => {
    if (controls.value.totalSteps === 0) return 0
    return (controls.value.currentStep / controls.value.totalSteps) * 100
  })

  // Reset canvas state
  const resetCanvasState = () => {
    canvasState.value = {
      callStack: [],
      webAPIs: [],
      callbackQueue: [],
      microtaskQueue: []
    }
    currentLineNumber.value = 0
    controls.value.currentStep = 0
  }

  // Apply animation action to canvas state
  const applyAction = (action: AnimationAction) => {
    switch (action.type) {
      case 'add-to-stack':
        if (action.data && 'name' in action.data && 'type' in action.data) {
          canvasState.value.callStack.push(action.data as any)
        }
        break
      
      case 'remove-from-stack':
        if (action.itemId) {
          const index = canvasState.value.callStack.findIndex(item => item.id === action.itemId)
          if (index !== -1) {
            canvasState.value.callStack.splice(index, 1)
          }
        } else {
          canvasState.value.callStack.pop()
        }
        break
      
      case 'add-to-web-apis':
        if (action.data && 'name' in action.data) {
          canvasState.value.webAPIs.push(action.data as any)
        }
        break
      
      case 'remove-from-web-apis':
        if (action.itemId) {
          const index = canvasState.value.webAPIs.findIndex(item => item.id === action.itemId)
          if (index !== -1) {
            canvasState.value.webAPIs.splice(index, 1)
          }
        }
        break
      
      case 'add-to-callback-queue':
        if (action.data && 'name' in action.data && 'callback' in action.data) {
          canvasState.value.callbackQueue.push(action.data as any)
        }
        break
      
      case 'remove-from-callback-queue':
        if (action.itemId) {
          const index = canvasState.value.callbackQueue.findIndex(item => item.id === action.itemId)
          if (index !== -1) {
            canvasState.value.callbackQueue.splice(index, 1)
          }
        } else {
          canvasState.value.callbackQueue.shift()
        }
        break
      
      case 'add-to-microtask-queue':
        if (action.data && 'name' in action.data && 'callback' in action.data) {
          canvasState.value.microtaskQueue.push(action.data as any)
        }
        break
      
      case 'remove-from-microtask-queue':
        if (action.itemId) {
          const index = canvasState.value.microtaskQueue.findIndex(item => item.id === action.itemId)
          if (index !== -1) {
            canvasState.value.microtaskQueue.splice(index, 1)
          }
        } else {
          canvasState.value.microtaskQueue.shift()
        }
        break
    }
  }

  // Build GSAP timeline from code example
  const buildTimeline = () => {
    if (!codeExample.value) return

    // Kill existing timeline
    if (timeline) {
      timeline.kill()
    }

    // Create new timeline
    timeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        if (timeline) {
          const currentTime = timeline.time()
          // Update current step based on timeline progress
          let stepIndex = 0
          let cumulativeTime = 0
          
          for (let i = 0; i < codeExample.value!.steps.length; i++) {
            const step = codeExample.value!.steps[i]
            const stepDuration = step.duration || 0.8
            cumulativeTime += stepDuration
            
            if (currentTime < cumulativeTime) {
              stepIndex = i
              break
            }
            stepIndex = i + 1
          }
          
          controls.value.currentStep = Math.min(stepIndex, codeExample.value!.steps.length)
        }
      },
      onComplete: () => {
        controls.value.isPlaying = false
        controls.value.currentStep = controls.value.totalSteps
      }
    })

    // Reset state
    resetCanvasState()

    // Add each step to timeline
    codeExample.value.steps.forEach((step: AnimationStep, index: number) => {
      const duration = step.duration || 0.8

      timeline!.call(() => {
        // Update current line
        currentLineNumber.value = step.lineNumber
        
        // Apply all actions for this step
        step.actions.forEach(action => {
          applyAction(action)
        })

        // Update explanation if provided
        if (step.explanation) {
          explanationState.value = {
            type: 'step',
            title: `Step ${index + 1}`,
            description: step.explanation
          }
        }
      })

      // Add delay for this step
      timeline!.to({}, { duration })
    })

    controls.value.totalSteps = codeExample.value.steps.length
  }

  // Watch for code example changes and rebuild timeline
  watch(codeExample, (newExample) => {
    if (newExample) {
      buildTimeline()
      
      // Set global explanation
      explanationState.value = {
        type: 'global',
        title: newExample.title,
        description: newExample.globalExplanation
      }
    }
  }, { immediate: true })

  // Watch speed changes
  watch(() => controls.value.speed, (newSpeed) => {
    if (timeline) {
      timeline.timeScale(newSpeed)
    }
  })

  // Control functions
  const play = () => {
    if (!timeline) return

    if (controls.value.currentStep >= controls.value.totalSteps) {
      // Restart from beginning
      reset()
    }

    timeline.play()
    controls.value.isPlaying = true
    controls.value.isPaused = false
  }

  const pause = () => {
    if (!timeline) return

    timeline.pause()
    controls.value.isPlaying = false
    controls.value.isPaused = true
  }

  const stop = () => {
    if (!timeline) return

    timeline.pause()
    reset()
    controls.value.isPlaying = false
    controls.value.isPaused = false
  }

  const reset = () => {
    if (!timeline) return

    timeline.seek(0)
    resetCanvasState()
    
    // Restore global explanation
    if (codeExample.value) {
      explanationState.value = {
        type: 'global',
        title: codeExample.value.title,
        description: codeExample.value.globalExplanation
      }
    }
  }

  const setSpeed = (speed: number) => {
    controls.value.speed = Math.max(0.25, Math.min(3, speed))
  }

  const showComponentExplanation = (componentType: string) => {
    if (!codeExample.value) return

    const explanation = codeExample.value.componentExplanations.find(
      exp => exp.component === componentType
    )

    if (explanation) {
      explanationState.value = {
        type: 'component',
        title: explanation.title,
        description: explanation.description,
        component: explanation.component
      }
    }
  }

  const showGlobalExplanation = () => {
    if (!codeExample.value) return

    explanationState.value = {
      type: 'global',
      title: codeExample.value.title,
      description: codeExample.value.globalExplanation
    }
  }

  // Cleanup
  onUnmounted(() => {
    if (timeline) {
      timeline.kill()
    }
  })

  return {
    // State
    canvasState,
    controls,
    currentLineNumber,
    explanationState,
    progress,
    hasExample,
    
    // Methods
    play,
    pause,
    stop,
    reset,
    setSpeed,
    showComponentExplanation,
    showGlobalExplanation
  }
}

