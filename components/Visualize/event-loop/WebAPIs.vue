<script setup lang="ts">
import { computed } from 'vue'
import type { WebAPIItem } from '~/types/visualization'

interface Props {
  items: WebAPIItem[]
}

defineProps<Props>()

defineEmits<{
  click: []
}>()

const itemStyle = (item: WebAPIItem) => {
  const color = item.color || '#ec4899'
  return {
    backgroundColor: `${color}15`,
    borderColor: `${color}60`,
    color: color
  }
}
</script>

<template>
  <div
    class="web-apis-container h-full min-h-[400px] p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-primary/50"
    :class="{ 'border-pink-500/30': items.length > 0, 'border-muted': items.length === 0 }"
    @click="$emit('click')"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 pb-2 border-b">
      <h3 class="font-semibold text-sm flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-pink-500"></span>
        Web APIs
      </h3>
      <span class="text-xs text-muted-foreground">{{ items.length }} item(s)</span>
    </div>

    <!-- API Items -->
    <div class="flex flex-col gap-2">
      <TransitionGroup name="api">
        <div
          v-for="item in items"
          :key="item.id"
          class="api-item p-3 rounded-md border-2 transition-all duration-300"
          :style="itemStyle(item)"
        >
          <div class="font-medium text-sm truncate">{{ item.name }}</div>
          <div class="text-xs text-muted-foreground mt-1">
            {{ item.type }}
          </div>
          <div v-if="item.duration !== undefined" class="text-xs font-mono mt-1">
            {{ item.duration }}ms
          </div>
        </div>
      </TransitionGroup>
      
      <!-- Empty state -->
      <div
        v-if="items.length === 0"
        class="text-center py-8 text-muted-foreground text-sm"
      >
        <div class="mb-2">Empty</div>
        <div class="text-xs">Async operations run here</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-enter-active,
.api-leave-active {
  transition: all 0.3s ease;
}

.api-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.api-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.api-item {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

