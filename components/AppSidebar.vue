<script setup lang="ts">
import type { ResourceFilters } from '~/types/resource'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { X } from 'lucide-vue-next'

interface Props {
  filters: ResourceFilters
  allTopics: string[]
  mobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false
})

const emit = defineEmits<{
  'update:filters': [filters: ResourceFilters]
  'toggle-topic': [topic: string]
  'toggle-type': [type: string]
  'toggle-level': [level: string]
  'reset-filters': []
}>()

// Update individual filter properties
const updateFilter = (key: keyof ResourceFilters, value: any) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

const hasActiveFilters = computed(() => {
  return props.filters.topics.length > 0 || 
         props.filters.type.length > 0 || 
         props.filters.level.length > 0 || 
         props.filters.language || 
         props.filters.price
})

// Type and level options
const typeOptions = [
  { value: 'video', label: '📹 Video', emoji: '📹' },
  { value: 'course', label: '🎓 Course', emoji: '🎓' },
  { value: 'article', label: '📄 Article', emoji: '📄' },
  { value: 'documentation', label: '📚 Docs', emoji: '📚' }
]

const levelOptions = [
  { value: 'beginner', label: 'Beginner', color: 'success' },
  { value: 'intermediate', label: 'Intermediate', color: 'info' },
  { value: 'advanced', label: 'Advanced', color: 'purple' }
]
</script>

<template>
  <aside :class="[
    mobile 
      ? 'w-full h-auto bg-transparent border-none p-0 overflow-visible' 
      : 'w-64 h-fit sticky top-6 bg-[var(--color-neutral-950)] border border-[var(--color-neutral-800)] rounded-lg p-6 overflow-hidden'
  ]">
    <div class="space-y-4">
      <!-- Filters Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-[var(--color-neutral-100)]">
          Filters
        </h2>
        <Button
          v-if="hasActiveFilters"
          variant="ghost"
          size="sm"
          @click="emit('reset-filters')"
          class="h-7 w-7 p-0"
        >
          <X class="size-3" />
        </Button>
      </div>

       <!-- Topic Pills -->
       <div v-if="allTopics.length > 0" class="space-y-2">
        <label class="text-xs font-medium text-[var(--color-neutral-400)] uppercase tracking-wide">
          Topics
        </label>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="topic in allTopics"
            :key="topic"
            @click="emit('toggle-topic', topic)"
            :class="[
              'px-2 py-1 text-xs rounded-md transition-colors capitalize cursor-pointer',
              filters.topics.includes(topic)
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)]'
                : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)]'
            ]"
          >
            {{ topic }}
          </button>
        </div>
      </div>

      <!-- Type Pills -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--color-neutral-400)] uppercase tracking-wide">
          Type
        </label>
        <div class="space-y-1">
          <button
            v-for="type in typeOptions"
            :key="type.value"
            @click="emit('toggle-type', type.value)"
            :class="[
              'w-full px-2.5 py-1.5 text-sm rounded-md transition-colors cursor-pointer flex items-center gap-2',
              filters.type.includes(type.value as any)
                ? 'bg-[var(--color-neutral-800)] text-[var(--color-neutral-100)] border border-[var(--color-neutral-700)]'
                : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-900)]'
            ]"
          >
            <span>{{ type.emoji }}</span>
            <span>{{ type.label.replace(type.emoji + ' ', '') }}</span>
          </button>
        </div>
      </div>

      <!-- Level Pills -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--color-neutral-400)] uppercase tracking-wide">
          Level
        </label>
        <div class="space-y-1">
          <button
            v-for="level in levelOptions"
            :key="level.value"
            @click="emit('toggle-level', level.value)"
            :class="[
              'w-full px-2.5 py-1.5 text-sm rounded-md transition-colors capitalize cursor-pointer text-left',
              filters.level.includes(level.value as any)
                ? 'bg-[var(--color-neutral-800)] text-[var(--color-neutral-100)] border border-[var(--color-neutral-700)]'
                : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-900)]'
            ]"
          >
            {{ level.label }}
          </button>
        </div>
      </div>

      <!-- Language Filter -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--color-neutral-400)] uppercase tracking-wide">
          Resource Language
        </label>
        <Select :model-value="filters.language" @update:model-value="updateFilter('language', $event)">
          <SelectTrigger class="h-8 w-full bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)] text-sm">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent class="z-50 bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)]">
            <SelectItem :value="null">All Languages</SelectItem>
            <SelectItem value="en">🇬🇧 English</SelectItem>
            <SelectItem value="fr">🇫🇷 Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Price Filter -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--color-neutral-400)] uppercase tracking-wide">
          Price
        </label>
        <Select :model-value="filters.price" @update:model-value="updateFilter('price', $event)">
          <SelectTrigger class="h-8 w-full bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)] text-sm">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent class="z-50 bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)]">
            <SelectItem :value="null">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Clear All Button -->
      <div v-if="hasActiveFilters" class="pt-2">
        <Button
          variant="outline"
          size="sm"
          @click="emit('reset-filters')"
          class="w-full h-8 text-xs"
        >
          Clear all filters
        </Button>
      </div>
    </div>
  </aside>
</template>