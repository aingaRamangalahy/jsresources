<script setup lang="ts">
import type { ResourceFilters } from '~/types/resource'
import { Search } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'

interface Props {
  filters: ResourceFilters
  allTopics: string[]
  mobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false
})

const emit = defineEmits<{
  'toggle-topic': [topic: string]
}>()

const topicSearchQuery = ref('')

const filteredTopics = computed(() => {
  if (!topicSearchQuery.value) {
    return props.allTopics
  }
  const query = topicSearchQuery.value.toLowerCase()
  return props.allTopics.filter(topic => 
    topic.toLowerCase().includes(query)
  )
})

</script>

<template>
  <aside :class="[
    mobile 
      ? 'w-full h-auto bg-transparent border-none p-0 overflow-hidden' 
      : 'w-64 sticky top-20 bg-[var(--color-neutral-950)] border border-[var(--color-neutral-800)] rounded-lg p-6 flex flex-col h-[calc(100vh-6rem)] z-0 overflow-y-auto'
  ]">
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
      <!-- Filters Header -->
      <div class="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 class="text-base font-semibold text-[var(--color-neutral-100)]">
          Topics
        </h2>
      </div>

      <!-- Topic Search Bar -->
      <div class="mb-4 flex-shrink-0">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-neutral-500)]" />
          <Input
            v-model="topicSearchQuery"
            placeholder="Search topics..."
            class="pl-9 h-9 text-sm bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>
      </div>

       <!-- Topic Pills (Scrollable) -->
       <div v-if="filteredTopics.length > 0" class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <div class="flex flex-wrap gap-1.5 pb-2">
          <button
            v-for="topic in filteredTopics"
            :key="topic"
            @click="emit('toggle-topic', topic)"
            :class="[
              'px-2 py-1 text-xs rounded-md transition-colors capitalize cursor-pointer flex-shrink-0',
              filters.topics.includes(topic)
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)]'
                : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)]'
            ]"
          >
            {{ topic }}
          </button>
        </div>
      </div>
      <div v-else class="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <p class="text-sm text-[var(--color-neutral-500)]">No topics found</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Custom scrollbar styles */
aside::-webkit-scrollbar,
div::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track,
div::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb,
div::-webkit-scrollbar-thumb {
  background: var(--color-neutral-700);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover,
div::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-600);
}

/* Firefox scrollbar */
aside,
div {
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-700) transparent;
}
</style>