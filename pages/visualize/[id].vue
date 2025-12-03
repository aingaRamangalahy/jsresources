<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
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

// Show help modal
const showHelp = ref(false)

// Component ID mapping for keyboard shortcuts (event-loop specific)
const componentKeyMap: Record<string, string> = {
  '1': 'call-stack',
  '2': 'web-apis',
  '3': 'callback-queue',
  '4': 'microtask-queue',
  '5': 'event-loop',
}

// Handle node interactions
const handleNodeSelect = (nodeId: string) => {
  selectNode(nodeId)
}

const handleNodeDeselect = () => {
  deselectNode()
}

// Keyboard shortcuts for accessibility
const handleKeyPress = (event: KeyboardEvent) => {
  // Ignore if typing in an input
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    return
  }
  
  switch (event.code) {
    case 'Escape':
      event.preventDefault()
      showGlobalExplanation()
      break
    case 'KeyH':
      event.preventDefault()
      showHelp.value = !showHelp.value
      break
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
      event.preventDefault()
      const digit = event.code.replace('Digit', '')
      const componentId = componentKeyMap[digit]
      if (componentId) {
        selectNode(componentId)
      }
      break
    case 'ArrowRight':
      event.preventDefault()
      navigateNodes(1)
      break
    case 'ArrowLeft':
      event.preventDefault()
      navigateNodes(-1)
      break
  }
}

// Navigate through nodes
const nodeOrder = ['call-stack', 'web-apis', 'callback-queue', 'microtask-queue', 'event-loop']

function navigateNodes(direction: number) {
  if (!selectedNodeId.value) {
    selectNode(nodeOrder[0])
    return
  }
  
  const currentIndex = nodeOrder.indexOf(selectedNodeId.value)
  if (currentIndex === -1) {
    selectNode(nodeOrder[0])
    return
  }
  
  const nextIndex = (currentIndex + direction + nodeOrder.length) % nodeOrder.length
  selectNode(nodeOrder[nextIndex])
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
      <div class="max-w-7xl mx-auto px-4 py-3">
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
              <h1 class="text-lg sm:text-xl font-bold text-[var(--color-neutral-50)]">{{ pageTitle }}</h1>
              <p v-if="spec" class="text-xs text-[var(--color-neutral-400)] mt-0.5 hidden sm:block">{{ spec.description }}</p>
            </div>
          </div>
          
          <!-- Keyboard Shortcuts Help -->
          <div class="flex items-center gap-3">
            <div class="text-sm text-[var(--color-neutral-500)] hidden md:flex items-center gap-2">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-[var(--color-neutral-800)] rounded text-xs text-[var(--color-neutral-400)] font-mono">1-5</kbd>
                <span class="text-xs">select</span>
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-[var(--color-neutral-800)] rounded text-xs text-[var(--color-neutral-400)] font-mono">←→</kbd>
                <span class="text-xs">navigate</span>
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-[var(--color-neutral-800)] rounded text-xs text-[var(--color-neutral-400)] font-mono">ESC</kbd>
                <span class="text-xs">overview</span>
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              @click="showHelp = !showHelp"
              class="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Modal -->
    <Transition name="fade">
      <div 
        v-if="showHelp" 
        class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        @click.self="showHelp = false"
      >
        <div class="bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)] rounded-xl p-6 max-w-lg w-full shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-[var(--color-neutral-50)]">🎹 Keyboard Shortcuts</h2>
            <Button variant="ghost" size="sm" @click="showHelp = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono min-w-[2rem] text-center">1</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Call Stack</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono min-w-[2rem] text-center">2</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Web APIs</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono min-w-[2rem] text-center">3</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Callback Queue</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono min-w-[2rem] text-center">4</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Microtask Queue</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono min-w-[2rem] text-center">5</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Event Loop</span>
              </div>
            </div>
            
            <Separator class="bg-[var(--color-neutral-800)]" />
            
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono">←</kbd>
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono">→</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Navigate</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono">ESC</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Show Overview</span>
              </div>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-[var(--color-neutral-800)] rounded text-sm font-mono">H</kbd>
                <span class="text-sm text-[var(--color-neutral-300)]">Toggle Help</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 pt-4 border-t border-[var(--color-neutral-800)]">
            <p class="text-xs text-[var(--color-neutral-500)]">
              💡 <strong>Tip:</strong> Click any component in the visualization to see detailed explanations with code examples!
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-[calc(100vh-160px)]">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-[var(--color-neutral-400)]">Loading visualization...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center h-[calc(100vh-160px)]">
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
      <div v-else-if="spec" class="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-160px)]">
        <!-- Left Column: Visualization (spans 8 columns on large screens) -->
        <div class="lg:col-span-8 h-full">
          <VisualizationCanvas
            :spec="spec as any"
            :selected-node-id="selectedNodeId"
            @node-select="handleNodeSelect"
            @node-deselect="handleNodeDeselect"
          />
        </div>

        <!-- Right Column: Explanation (spans 4 columns on large screens) -->
        <div class="lg:col-span-4 h-full overflow-y-auto">
          <ExplanationPanel
            :explanation-state="explanationState"
            @show-global="showGlobalExplanation"
          />
          
          <!-- Learning Resources Card (shown in global view) -->
          <div 
            v-if="explanationState.type === 'global'"
            class="mt-4 p-4 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 rounded-lg"
          >
            <h4 class="text-sm font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Learn More
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a 
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-[var(--color-neutral-300)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <span class="text-[var(--color-neutral-500)]">📄</span>
                  MDN: Event Loop
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/watch?v=8aGhZQkoFbQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-[var(--color-neutral-300)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <span class="text-[var(--color-neutral-500)]">🎥</span>
                  Philip Roberts: Event Loop (JSConf)
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://javascript.info/event-loop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-[var(--color-neutral-300)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <span class="text-[var(--color-neutral-500)]">📚</span>
                  JavaScript.info: Event Loop
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
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

/* Help modal fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
