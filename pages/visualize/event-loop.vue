<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useEventLoopAnimation } from '~/composables/useEventLoopAnimation'
import { eventLoopExamples } from '~/data/eventLoopExamples'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

// Set page meta
definePageMeta({
  layout: 'default',
  title: 'Event Loop Visualizer'
})

// Examples
const examples = eventLoopExamples
const selectedExampleId = ref(examples[0]?.id || '')

// Get selected example
const selectedExample = computed(() => {
  return examples.find(ex => ex.id === selectedExampleId.value) || null
})

// Use animation composable
const {
  canvasState,
  controls,
  currentLineNumber,
  explanationState,
  progress,
  hasExample,
  play,
  pause,
  stop,
  reset,
  setSpeed,
  showComponentExplanation,
  showGlobalExplanation
} = useEventLoopAnimation(selectedExample)

// Keyboard shortcuts
const handleKeyPress = (event: KeyboardEvent) => {
  // Space to play/pause
  if (event.code === 'Space' && hasExample.value) {
    event.preventDefault()
    if (controls.value.isPlaying) {
      pause()
    } else {
      play()
    }
  }
  
  // Escape to stop
  if (event.code === 'Escape' && hasExample.value) {
    event.preventDefault()
    stop()
  }
}

// Watch for example changes and reset
watch(selectedExampleId, () => {
  stop()
})

// Setup keyboard listeners
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
            <h1 class="text-2xl font-bold">Event Loop Visualizer</h1>
          </div>

          <!-- Example Selector -->
          <Select v-model="selectedExampleId">
            <SelectTrigger class="w-[280px]">
              <SelectValue placeholder="Select an example" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="example in examples"
                :key="example.id"
                :value="example.id"
              >
                {{ example.title }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
        <!-- Left Column: Code & Explanation -->
        <div class="flex flex-col gap-6 h-full">
          <!-- Controls -->
          <VisualizationControls
            :controls="controls"
            :progress="progress"
            :has-example="hasExample"
            @play="play"
            @pause="pause"
            @stop="stop"
            @speed-change="setSpeed"
          />

          <!-- Code Viewer -->
          <div class="flex-1 min-h-0">
            <CodeViewer
              v-if="selectedExample"
              :code="selectedExample.code"
              :language="selectedExample.language"
              :current-line-number="currentLineNumber"
            />
            <div v-else class="h-full flex items-center justify-center bg-muted/30 rounded-lg border">
              <p class="text-muted-foreground">Select an example to begin</p>
            </div>
          </div>

          <!-- Explanation Panel -->
          <ExplanationPanel
            :explanation-state="explanationState"
            :is-playing="controls.isPlaying"
            @show-global="showGlobalExplanation"
          />
        </div>

        <!-- Right Column: Visualization Canvas -->
        <div class="h-full">
          <EventLoopCanvas
            :canvas-state="canvasState"
            @component-click="showComponentExplanation"
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

