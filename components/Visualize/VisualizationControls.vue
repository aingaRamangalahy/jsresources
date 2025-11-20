<script setup lang="ts">
import type { AnimationControls } from '~/types/visualization'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Kbd } from '~/components/ui/kbd'

interface Props {
  controls: AnimationControls
  progress: number
  hasExample: boolean
}

defineProps<Props>()

defineEmits<{
  play: []
  pause: []
  stop: []
  speedChange: [speed: number]
}>()
</script>

<template>
  <div class="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
    <!-- Play/Pause Button -->
    <Button
      v-if="!controls.isPlaying"
      size="icon"
      @click="$emit('play')"
      :disabled="!hasExample"
      class="h-10 w-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="6 3 20 12 6 21 6 3"/>
      </svg>
      <span class="sr-only">Play</span>
    </Button>
    
    <Button
      v-else
      size="icon"
      @click="$emit('pause')"
      class="h-10 w-10"
      variant="secondary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
      <span class="sr-only">Pause</span>
    </Button>

    <!-- Stop/Reset Button -->
    <Button
      size="icon"
      variant="outline"
      @click="$emit('stop')"
      :disabled="!hasExample"
      class="h-10 w-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="6" width="12" height="12"/>
      </svg>
      <span class="sr-only">Stop</span>
    </Button>

    <!-- Separator -->
    <Separator orientation="vertical" class="h-10" />

    <!-- Progress Info -->
    <div class="flex flex-col gap-1 min-w-[120px]">
      <div class="text-sm font-medium">
        Step {{ controls.currentStep }} / {{ controls.totalSteps }}
      </div>
      <div class="w-full bg-muted rounded-full h-1.5">
        <div
          class="bg-primary h-1.5 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <!-- Separator -->
    <Separator orientation="vertical" class="h-10" />

    <!-- Speed Control -->
    <div class="flex items-center gap-2 min-w-[180px]">
      <span class="text-sm font-medium whitespace-nowrap">Speed:</span>
      <div class="flex items-center gap-2 flex-1">
        <input
          type="range"
          min="0.25"
          max="2"
          step="0.25"
          :value="controls.speed"
          @input="$emit('speed-change', parseFloat(($event.target as HTMLInputElement).value))"
          class="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          :disabled="!hasExample"
        />
        <span class="text-sm font-mono w-8 text-right">{{ controls.speed.toFixed(2) }}x</span>
      </div>
    </div>

    <!-- Keyboard hint -->
    <div class="ml-auto flex items-center gap-2 text-muted-foreground text-sm">
      <Kbd>Space</Kbd>
      <span>to play/pause</span>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling for range input */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: none;
}

input[type="range"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

