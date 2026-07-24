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
  mobile: false,
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
    topic.toLowerCase().includes(query),
  )
})
</script>

<template>
  <section class="w-full text-left space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="font-display text-base font-semibold" style="color: var(--color-text);">
        Topics
        <span
          v-if="filters.topics.length"
          class="ml-2 inline-flex text-xs font-bold px-2 py-0.5 rounded-full border align-middle"
          style="background-color: var(--color-primary); color: var(--color-on-primary); border-color: var(--color-primary-border);"
        >
          {{ filters.topics.length }}
        </span>
      </h2>

      <div class="relative w-full sm:w-56">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 size-4"
          style="color: var(--color-text-subtle);"
        />
        <Input
          v-model="topicSearchQuery"
          placeholder="Search topics..."
          class="pl-9 h-10 text-sm rounded-xl border-2 border-[var(--color-border)] bg-white font-medium"
        />
      </div>
    </div>

    <div v-if="filteredTopics.length > 0" class="flex flex-wrap gap-2">
      <button
        v-for="topic in filteredTopics"
        :key="topic"
        type="button"
        :class="[
          'px-2.5 py-1.5 text-xs font-bold rounded-xl border-2 transition-all duration-200 capitalize cursor-pointer',
          filters.topics.includes(topic)
            ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary-border)] shadow-[0_2px_0_0_var(--color-primary-shadow)]'
            : 'bg-white text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary-border)] hover:text-[var(--color-text)]',
        ]"
        @click="emit('toggle-topic', topic)"
      >
        {{ topic }}
      </button>
    </div>
    <p v-else class="text-sm font-medium" style="color: var(--color-text-subtle);">
      No topics found
    </p>
  </section>
</template>
