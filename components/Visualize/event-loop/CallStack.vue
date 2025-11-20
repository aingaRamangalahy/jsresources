<script setup lang="ts">
import type { StackItem as StackItemType } from '~/types/visualization'

interface Props {
  items: StackItemType[]
}

defineProps<Props>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="call-stack-container h-full min-h-[400px] p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-primary/50"
    :class="{ 'border-primary/30': items.length > 0, 'border-muted': items.length === 0 }"
    @click="$emit('click')"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 pb-2 border-b">
      <h3 class="font-semibold text-sm flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-blue-500"></span>
        Call Stack
      </h3>
      <span class="text-xs text-muted-foreground">{{ items.length }} item(s)</span>
    </div>

    <!-- Stack Items (bottom to top, so reverse) -->
    <div class="flex flex-col-reverse gap-2 relative">
      <TransitionGroup name="stack">
        <StackItem
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          class="relative"
        />
      </TransitionGroup>
      
      <!-- Empty state -->
      <div
        v-if="items.length === 0"
        class="text-center py-8 text-muted-foreground text-sm"
      >
        <div class="mb-2">Empty</div>
        <div class="text-xs">Functions execute here</div>
      </div>
    </div>

    <!-- Stack indicator at bottom -->
    <div v-if="items.length > 0" class="mt-4 pt-2 border-t text-center">
      <div class="text-xs text-muted-foreground">
        ↑ Top of Stack
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack-enter-active,
.stack-leave-active {
  transition: all 0.3s ease;
}

.stack-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.stack-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

