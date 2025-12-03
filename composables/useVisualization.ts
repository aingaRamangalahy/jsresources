import { ref, computed, readonly } from 'vue'
import type { VisualizationSpec, ComponentType, ExplanationState } from '~/types/visualization'
import { loadVisualization } from '~/data/visualizations/registry'

export function useVisualization(visualizationId: string) {
  // State
  const spec = ref<VisualizationSpec | null>(null)
  const selectedNodeId = ref<string | null>(null)
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  
  // Load visualization spec
  const load = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const loadedSpec = await loadVisualization(visualizationId)
      spec.value = loadedSpec
      
      isLoading.value = false
    } catch (err) {
      error.value = err as Error
      isLoading.value = false
    }
  }
  
  // Auto-load immediately (works in both component and test contexts)
  load()
  
  // Computed explanation state
  const explanationState = computed<ExplanationState>(() => {
    if (!spec.value) {
      return {
        type: 'global',
        title: '',
        description: '',
        details: []
      }
    }
    
    if (selectedNodeId.value) {
      const nodeExplanation = spec.value.explanations.nodes[selectedNodeId.value]
      if (nodeExplanation) {
        return {
          type: 'component',
          title: nodeExplanation.title,
          description: nodeExplanation.content,
          details: nodeExplanation.details,
          component: selectedNodeId.value as ComponentType,
          codeExample: nodeExplanation.codeExample,
          keyPoints: nodeExplanation.keyPoints,
          commonMistakes: nodeExplanation.commonMistakes,
          tryThis: nodeExplanation.tryThis
        }
      }
    }
    
    // Default to global explanation
    const global = spec.value.explanations.global
    return {
      type: 'global',
      title: global.title,
      description: global.content,
      details: global.details,
      codeExample: global.codeExample,
      keyPoints: global.keyPoints,
      commonMistakes: global.commonMistakes,
      tryThis: global.tryThis
    }
  })
  
  // Methods
  const selectNode = (nodeId: string) => {
    selectedNodeId.value = nodeId
  }
  
  const deselectNode = () => {
    selectedNodeId.value = null
  }
  
  const showGlobalExplanation = () => {
    deselectNode()
  }
  
  const isNodeSelected = (nodeId: string) => {
    return selectedNodeId.value === nodeId
  }
  
  return {
    // State
    spec: readonly(spec),
    selectedNodeId: readonly(selectedNodeId),
    isLoading: readonly(isLoading),
    error: readonly(error),
    explanationState,
    
    // Methods
    load,
    selectNode,
    deselectNode,
    showGlobalExplanation,
    isNodeSelected
  }
}

