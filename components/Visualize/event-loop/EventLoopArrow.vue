<script setup lang="ts">
interface Props {
  isActive: boolean
}

defineProps<Props>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="event-loop-container p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-primary/50 max-w-md"
    :class="{ 'border-purple-500/30 animate-pulse-border': isActive, 'border-muted': !isActive }"
    @click="$emit('click')"
  >
    <div class="flex items-center justify-center gap-4">
      <!-- Left indicator -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground">Queues</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-muted-foreground"
        >
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </div>

      <!-- Center - Event Loop -->
      <div class="flex flex-col items-center gap-2">
        <div
          class="w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300"
          :class="isActive ? 'border-purple-500 bg-purple-500/10 rotating' : 'border-muted-foreground/30'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="isActive ? 'text-purple-500' : 'text-muted-foreground'"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </div>
        <h3 class="font-semibold text-sm">Event Loop</h3>
        <span
          class="text-xs px-2 py-1 rounded-full"
          :class="isActive ? 'bg-purple-500/10 text-purple-600 border border-purple-500/30' : 'bg-muted text-muted-foreground'"
        >
          {{ isActive ? 'Active' : 'Idle' }}
        </span>
      </div>

      <!-- Right indicator -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground">Call Stack</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-muted-foreground"
        >
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </div>
    </div>

    <!-- Description -->
    <div class="mt-4 text-center text-xs text-muted-foreground">
      Checks queues when stack is empty
    </div>
  </div>
</template>

<style scoped>
.rotating {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-pulse-border {
  animation: pulse-border 2s ease-in-out infinite;
}

@keyframes pulse-border {
  0%, 100% {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4);
  }
  50% {
    border-color: hsl(var(--primary) / 0.6);
    box-shadow: 0 0 0 8px hsl(var(--primary) / 0);
  }
}
</style>

