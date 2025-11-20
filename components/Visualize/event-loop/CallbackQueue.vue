<script setup lang="ts">
import type { QueueItem as QueueItemType } from '~/types/visualization'

interface Props {
  items: QueueItemType[]
}

defineProps<Props>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="callback-queue-container p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-primary/50"
    :class="{ 'border-orange-500/30': items.length > 0, 'border-muted': items.length === 0 }"
    @click="$emit('click')"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-3 pb-2 border-b">
      <h3 class="font-semibold text-sm flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-orange-500"></span>
        Callback Queue
      </h3>
      <span class="text-xs text-muted-foreground">{{ items.length }}</span>
    </div>

    <!-- Queue Items (horizontal) -->
    <div class="min-h-[80px] flex items-center">
      <div v-if="items.length > 0" class="flex gap-2 overflow-x-auto pb-2">
        <TransitionGroup name="queue">
          <div
            v-for="(item, index) in items"
            :key="item.id"
            class="flex items-center gap-2"
          >
            <QueueItem :item="item" class="min-w-[140px]" />
            <div v-if="index < items.length - 1" class="text-muted-foreground text-xl">
              →
            </div>
          </div>
        </TransitionGroup>
      </div>
      
      <!-- Empty state -->
      <div
        v-else
        class="w-full text-center py-4 text-muted-foreground text-sm"
      >
        <div class="mb-1">Empty</div>
        <div class="text-xs">Macrotasks wait here</div>
      </div>
    </div>

    <div v-if="items.length > 0" class="mt-2 pt-2 border-t text-xs text-muted-foreground flex justify-between">
      <span>← Front (next to execute)</span>
      <span>Back →</span>
    </div>
  </div>
</template>

<style scoped>
.queue-enter-active,
.queue-leave-active {
  transition: all 0.3s ease;
}

.queue-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.queue-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>

