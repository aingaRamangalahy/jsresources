<script setup lang="ts">
import { computed } from 'vue'
import type { QueueItem } from '~/types/visualization'

interface Props {
  item: QueueItem
}

const props = defineProps<Props>()

const itemStyle = computed(() => {
  const color = props.item.color || '#f59e0b'
  return {
    backgroundColor: `${color}15`,
    borderColor: `${color}60`,
    color: color
  }
})
</script>

<template>
  <div
    class="queue-item p-3 rounded-md border-2 transition-all duration-300 cursor-default"
    :style="itemStyle"
  >
    <div class="font-medium text-sm truncate">{{ item.name }}</div>
    <div v-if="item.callback" class="text-xs font-mono text-muted-foreground mt-1 truncate">
      {{ item.callback }}
    </div>
  </div>
</template>

<style scoped>
.queue-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

