<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
// TODO: Phase 1 - Replace with new architecture
// import { useVisualization } from '~/composables/useVisualization'
// import VisualizationCanvas from '~/components/Visualize/VisualizationCanvas.vue'
import ExplanationPanel from '~/components/Visualize/ExplanationPanel.vue'

// Page metadata
definePageMeta({
  layout: 'default',
  title: 'JavaScript Runtime Visualizer'
})

// TODO: Phase 1 - Replace with new useVisualization composable
// Temporary placeholder - will be replaced in Phase 1
const explanationState = {
  type: 'global' as const,
  title: 'JavaScript Runtime Environment',
  description: 'The new Konva.js-based visualization is being implemented. This page will be updated in Phase 1.',
  details: [
    'Phase 0: Old components removed ✓',
    'Phase 1: New architecture implementation in progress...'
  ]
}

const showGlobalExplanation = () => {
  // Will be implemented in Phase 1
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
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Button variant="ghost" size="sm" as="a" href="/visualize">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Visualizations
            </Button>
            <Separator orientation="vertical" class="h-6" />
            <h1 class="text-2xl font-bold">JavaScript Runtime Visualizer</h1>
          </div>
          
          <!-- Keyboard Shortcuts Help -->
          <div class="text-sm text-muted-foreground">
            <kbd class="px-2 py-1 bg-muted rounded text-xs">ESC</kbd> or 
            <kbd class="px-2 py-1 bg-muted rounded text-xs">H</kbd> for overview
          </div>
        </div>
      </div>
    </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          <!-- Left Column: Visualization (spans 3 columns) -->
          <div class="lg:col-span-3 h-full">
            <!-- TODO: Phase 1 - Replace with VisualizationCanvas component -->
            <div class="w-full h-full bg-muted rounded-lg border-2 border-dashed flex items-center justify-center">
              <div class="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-muted-foreground">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
                <h3 class="text-lg font-semibold mb-2">New Architecture in Progress</h3>
                <p class="text-sm text-muted-foreground max-w-md">
                  The Konva.js-based visualization system is being implemented.
                  This placeholder will be replaced with the new VisualizationCanvas component in Phase 1.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Explanation -->
          <div class="lg:col-span-1 h-full">
            <ExplanationPanel
              :explanation-state="explanationState"
              @show-global="showGlobalExplanation"
            />
          </div>
        </div>
        
        <!-- Bottom Instruction -->
        <div class="mt-6 text-center">
          <p class="text-sm text-muted-foreground">
            Phase 0 complete: Old components removed. Phase 1: Implementing new Konva.js architecture...
          </p>
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

