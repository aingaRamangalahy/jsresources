<script setup lang="ts">
import { computed } from 'vue'
import type { CanvasState } from '~/types/visualization'

interface Props {
  canvasState: CanvasState
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'component-click', component: string): void
}>()

// Check if there's any activity in the canvas
const hasActivity = computed(() => {
  return (
    props.canvasState.callStack.length > 0 ||
    props.canvasState.webAPIs.length > 0 ||
    props.canvasState.callbackQueue.length > 0 ||
    props.canvasState.microtaskQueue.length > 0
  )
})
</script>

<template>
  <div class="relative h-full bg-muted/30 rounded-lg border p-6 overflow-auto">
    <div class="min-h-[600px] relative">
      <!-- Title -->
      <div class="text-center mb-8">
        <h2 class="text-xl font-bold">JavaScript Event Loop</h2>
        <p class="text-sm text-muted-foreground mt-1">Click on components to learn more</p>
      </div>

      <!-- Canvas Layout -->
      <div class="grid grid-cols-3 gap-6 mb-6">
        <!-- Call Stack (Left) -->
        <div class="col-span-1">
          <CallStack
            :items="canvasState.callStack"
            @click="$emit('component-click', 'call-stack')"
          />
        </div>

        <!-- Web APIs (Center) -->
        <div class="col-span-1">
          <WebAPIs
            :items="canvasState.webAPIs"
            @click="$emit('component-click', 'web-apis')"
          />
        </div>

        <!-- Queues (Right) -->
        <div class="col-span-1 flex flex-col gap-4">
          <!-- Callback Queue -->
          <CallbackQueue
            :items="canvasState.callbackQueue"
            @click="$emit('component-click', 'callback-queue')"
          />

          <!-- Microtask Queue -->
          <MicrotaskQueue
            :items="canvasState.microtaskQueue"
            @click="$emit('component-click', 'microtask-queue')"
          />
        </div>
      </div>

      <!-- Event Loop Arrow -->
      <div class="flex items-center justify-center mt-8">
        <EventLoopArrow
          :is-active="hasActivity"
          @click="$emit('component-click', 'event-loop')"
        />
      </div>

      <!-- Flow arrows (decorative) -->
      <svg class="absolute inset-0 pointer-events-none" style="z-index: 0;">
        <!-- Arrow from Web APIs to Callback Queue -->
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--muted-foreground) / 0.3)" />
          </marker>
        </defs>
      </svg>
    </div>
  </div>
</template>

