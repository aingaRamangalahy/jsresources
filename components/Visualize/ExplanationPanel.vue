<script setup lang="ts">
import { computed } from 'vue'
import type { ExplanationState, ComponentType } from '~/types/visualization'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'

interface Props {
  explanationState: ExplanationState
  isPlaying?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPlaying: false
})

defineEmits<{
  showGlobal: []
}>()

const iconColorClass = computed(() => {
  switch (props.explanationState.type) {
    case 'global':
      return 'bg-blue-500/10 text-blue-500'
    case 'component':
      return 'bg-purple-500/10 text-purple-500'
    case 'step':
      return 'bg-green-500/10 text-green-500'
    default:
      return 'bg-muted text-muted-foreground'
  }
})

const componentDisplayName = computed(() => {
  if (!props.explanationState.component) return ''
  
  const names: Record<ComponentType, string> = {
    'call-stack': 'Call Stack',
    'web-apis': 'Web APIs',
    'callback-queue': 'Callback Queue',
    'microtask-queue': 'Microtask Queue',
    'event-loop': 'Event Loop'
  }
  
  return names[props.explanationState.component] || props.explanationState.component
})

const badgeVariant = computed(() => {
  switch (props.explanationState.component) {
    case 'call-stack':
      return 'default' as const
    case 'web-apis':
      return 'secondary' as const
    case 'callback-queue':
      return 'outline' as const
    case 'microtask-queue':
      return 'outline' as const
    case 'event-loop':
      return 'default' as const
    default:
      return 'default' as const
  }
})
</script>

<template>
  <div class="p-6 bg-card rounded-lg border min-h-[200px] transition-all duration-300">
    <div class="flex items-start gap-3 mb-3">
      <!-- Icon based on explanation type -->
      <div
        class="p-2 rounded-lg flex-shrink-0 transition-colors"
        :class="iconColorClass"
      >
        <svg
          v-if="explanationState.type === 'global'"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
        
        <svg
          v-else-if="explanationState.type === 'component'"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 7h.01"/>
          <path d="M12 7h.01"/>
          <path d="M17 7h.01"/>
        </svg>
        
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold mb-2 transition-all duration-300">
          {{ explanationState.title }}
        </h3>
        
        <!-- Badge for component type -->
        <Badge
          v-if="explanationState.component"
          :variant="badgeVariant"
          class="mb-3"
        >
          {{ componentDisplayName }}
        </Badge>
      </div>

      <!-- Back to global button when viewing component -->
      <Button
        v-if="explanationState.type === 'component'"
        variant="ghost"
        size="sm"
        @click="$emit('show-global')"
        class="flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Overview
      </Button>
    </div>

    <!-- Description with transition -->
    <Transition name="fade" mode="out-in">
      <p
        :key="explanationState.description"
        class="text-muted-foreground leading-relaxed"
      >
        {{ explanationState.description }}
      </p>
    </Transition>

    <!-- Hint when not playing -->
    <div
      v-if="!isPlaying && explanationState.type === 'global'"
      class="mt-4 pt-4 border-t flex items-start gap-2 text-sm text-muted-foreground"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
      <span>Click on any component in the visualization to learn more about it, or press play to start the animation.</span>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

