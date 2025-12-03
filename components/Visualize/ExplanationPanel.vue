<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ExplanationState, ComponentType } from '~/types/visualization'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'

interface Props {
  explanationState: ExplanationState
}

const props = defineProps<Props>()

defineEmits<{
  showGlobal: []
}>()

// Collapsible sections state
const showCode = ref(true)
const showKeyPoints = ref(true)
const showMistakes = ref(false)

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
    'js-engine': 'JS Engine',
    'call-stack': 'Call Stack',
    'memory-heap': 'Memory Heap',
    'web-apis': 'Web APIs',
    'callback-queue': 'Callback Queue',
    'microtask-queue': 'Microtask Queue',
    'event-loop': 'Event Loop'
  }
  
  return names[props.explanationState.component] || props.explanationState.component
})

const badgeVariant = computed(() => {
  switch (props.explanationState.component) {
    case 'js-engine':
      return 'default' as const
    case 'call-stack':
      return 'secondary' as const
    case 'memory-heap':
      return 'destructive' as const
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

// Component color mapping for visual consistency
const componentColorClass = computed(() => {
  switch (props.explanationState.component) {
    case 'call-stack':
      return 'border-green-500/30 bg-green-500/5'
    case 'web-apis':
      return 'border-red-500/30 bg-red-500/5'
    case 'callback-queue':
      return 'border-amber-500/30 bg-amber-500/5'
    case 'microtask-queue':
      return 'border-pink-500/30 bg-pink-500/5'
    case 'event-loop':
      return 'border-indigo-500/30 bg-indigo-500/5'
    default:
      return 'border-border'
  }
})
</script>

<template>
  <div 
    class="p-5 bg-card rounded-lg border min-h-[200px] transition-all duration-300 overflow-y-auto max-h-[calc(100vh-220px)]"
    :class="explanationState.component ? componentColorClass : ''"
  >
    <!-- Header Section -->
    <div class="flex items-start gap-3 mb-4">
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
        <h3 class="text-lg font-semibold mb-1 transition-all duration-300">
          {{ explanationState.title }}
        </h3>
        
        <!-- Badge for component type -->
        <Badge
          v-if="explanationState.component"
          :variant="badgeVariant"
          class="mb-2"
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
        class="text-muted-foreground leading-relaxed text-sm"
      >
        {{ explanationState.description }}
      </p>
    </Transition>

    <!-- Details list -->
    <div
      v-if="explanationState.details && explanationState.details.length > 0"
      class="mt-4 pt-4 border-t border-border/50"
    >
      <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        How It Works
      </h4>
      <ul class="space-y-2 text-sm text-muted-foreground">
        <li
          v-for="detail in explanationState.details"
          :key="detail"
          class="flex items-start gap-2"
        >
          <span class="text-primary mt-0.5 flex-shrink-0">→</span>
          <span>{{ detail }}</span>
        </li>
      </ul>
    </div>

    <!-- Code Example Section -->
    <div
      v-if="explanationState.codeExample"
      class="mt-4 pt-4 border-t border-border/50"
    >
      <button
        @click="showCode = !showCode"
        class="flex items-center justify-between w-full text-left mb-3 group"
      >
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-yellow-500">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Code Example
        </h4>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          class="transition-transform text-muted-foreground"
          :class="{ 'rotate-180': showCode }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <Transition name="slide-fade">
        <pre 
          v-if="showCode"
          class="text-xs bg-neutral-900 p-4 rounded-lg overflow-x-auto border border-neutral-800 font-mono leading-relaxed"
        ><code class="text-neutral-300">{{ explanationState.codeExample }}</code></pre>
      </Transition>
    </div>

    <!-- Key Points Section -->
    <div
      v-if="explanationState.keyPoints && explanationState.keyPoints.length > 0"
      class="mt-4 pt-4 border-t border-border/50"
    >
      <button
        @click="showKeyPoints = !showKeyPoints"
        class="flex items-center justify-between w-full text-left mb-3 group"
      >
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          Key Points
        </h4>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          class="transition-transform text-muted-foreground"
          :class="{ 'rotate-180': showKeyPoints }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <Transition name="slide-fade">
        <ul v-if="showKeyPoints" class="space-y-2">
          <li
            v-for="point in explanationState.keyPoints"
            :key="point"
            class="flex items-start gap-2 text-sm bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2"
          >
            <span class="text-emerald-500 flex-shrink-0">💡</span>
            <span class="text-emerald-200/90">{{ point }}</span>
          </li>
        </ul>
      </Transition>
    </div>

    <!-- Common Mistakes Section -->
    <div
      v-if="explanationState.commonMistakes && explanationState.commonMistakes.length > 0"
      class="mt-4 pt-4 border-t border-border/50"
    >
      <button
        @click="showMistakes = !showMistakes"
        class="flex items-center justify-between w-full text-left mb-3 group"
      >
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          Common Mistakes
        </h4>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          class="transition-transform text-muted-foreground"
          :class="{ 'rotate-180': showMistakes }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <Transition name="slide-fade">
        <ul v-if="showMistakes" class="space-y-2">
          <li
            v-for="mistake in explanationState.commonMistakes"
            :key="mistake"
            class="flex items-start gap-2 text-sm bg-red-500/5 border border-red-500/20 rounded-lg p-2"
          >
            <span class="text-red-500 flex-shrink-0">⚠️</span>
            <span class="text-red-200/90">{{ mistake }}</span>
          </li>
        </ul>
      </Transition>
    </div>

    <!-- Try This Section -->
    <div
      v-if="explanationState.tryThis"
      class="mt-4 pt-4 border-t border-border/50"
    >
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          Try This!
        </h4>
        <p class="text-sm text-purple-200/80">{{ explanationState.tryThis }}</p>
      </div>
    </div>

    <!-- Hint for interaction -->
    <div
      v-if="explanationState.type === 'global'"
      class="mt-6 pt-4 border-t border-border/30 flex items-start gap-2 text-sm text-muted-foreground"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mt-0.5 text-primary">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <span>
        <strong class="text-foreground">Click any component</strong> to dive deep into how it works!
      </span>
    </div>

    <!-- Keyboard shortcuts hint -->
    <div
      v-if="explanationState.type === 'global'"
      class="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground"
    >
      <span class="flex items-center gap-1">
        <kbd class="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700">1-5</kbd>
        <span>select component</span>
      </span>
      <span class="flex items-center gap-1">
        <kbd class="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700">ESC</kbd>
        <span>overview</span>
      </span>
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
