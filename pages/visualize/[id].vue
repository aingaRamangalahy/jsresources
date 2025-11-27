<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVisualization } from '~/composables/useVisualization'
import VisualizationCanvas from '~/components/Visualize/VisualizationCanvas.vue'
import ExplanationPanel from '~/components/Visualize/ExplanationPanel.vue'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

// Get visualization ID from route
const route = useRoute()
const visualizationId = computed(() => route.params.id as string)

// Page metadata
definePageMeta({
  layout: 'default',
})

// Use the visualization composable with dynamic ID
const {
  spec,
  selectedNodeId,
  isLoading,
  error,
  explanationState,
  selectNode,
  deselectNode,
  showGlobalExplanation
} = useVisualization(visualizationId.value)

// Handle node interactions
const handleNodeSelect = (nodeId: string) => {
  selectNode(nodeId)
}

const handleNodeDeselect = () => {
  deselectNode()
}

// Keyboard shortcuts for accessibility
const handleKeyPress = (event: KeyboardEvent) => {
  switch (event.code) {
    case 'Escape':
      event.preventDefault()
      showGlobalExplanation()
      break
    case 'KeyH':
      event.preventDefault()
      showGlobalExplanation()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

// Page title
const pageTitle = computed(() => {
  if (spec.value) {
    return spec.value.title
  }
  return 'Loading Visualization...'
})

useHead({
  title: pageTitle
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-neutral-950)]">
    <!-- Header -->
    <div class="border-b border-[var(--color-neutral-800)]/50">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Button variant="ghost" size="sm" as="a" href="/visualize" class="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back
            </Button>
            <Separator orientation="vertical" class="h-6 bg-[var(--color-neutral-800)]" />
            <div>
              <h1 class="text-xl sm:text-2xl font-bold text-[var(--color-neutral-50)]">{{ pageTitle }}</h1>
              <p v-if="spec" class="text-sm text-[var(--color-neutral-400)] mt-0.5 hidden sm:block">{{ spec.description }}</p>
            </div>
          </div>
          
          <!-- Keyboard Shortcuts Help -->
          <div class="text-sm text-[var(--color-neutral-500)] hidden sm:block">
            <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-xs text-[var(--color-neutral-400)]">ESC</kbd>
            <span class="mx-1">for overview</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-[calc(100vh-180px)]">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-[var(--color-neutral-400)]">Loading visualization...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center h-[calc(100vh-180px)]">
        <div class="text-center max-w-md">
          <div class="size-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">Visualization Not Found</h2>
          <p class="text-red-400 mb-6">{{ error.message }}</p>
          <Button as="a" href="/visualize" variant="outline">
            View All Visualizations
          </Button>
        </div>
      </div>

      <!-- Main Grid -->
      <div v-else-if="spec" class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
        <!-- Left Column: Visualization (spans 3 columns) -->
        <div class="lg:col-span-3 h-full">
          <VisualizationCanvas
            :spec="spec as any"
            :selected-node-id="selectedNodeId"
            @node-select="handleNodeSelect"
            @node-deselect="handleNodeDeselect"
          />
        </div>

        <!-- Right Column: Explanation -->
        <div class="lg:col-span-1 h-full overflow-y-auto">
          <ExplanationPanel
            :explanation-state="explanationState"
            @show-global="showGlobalExplanation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid ensures proper sizing */
.grid {
  display: grid;
}
</style>
