<script setup lang="ts">
import { computed } from 'vue'
import type { StackItem } from '~/types/visualization'

interface Props {
  item: StackItem
}

const props = defineProps<Props>()

const itemStyle = computed(() => {
  const color = props.item.color || '#8b5cf6'
  return {
    backgroundColor: `${color}15`,
    borderColor: `${color}60`,
    color: color
  }
})
</script>

<template>
  <div
    class="stack-item p-3 rounded-md border-2 transition-all duration-300 cursor-default"
    :style="itemStyle"
  >
    <div class="font-medium text-sm truncate">{{ item.name }}</div>
    <div v-if="item.type" class="text-xs text-muted-foreground mt-1">
      {{ item.type }}
    </div>
  </div>
</template>

<style scoped>
.stack-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

