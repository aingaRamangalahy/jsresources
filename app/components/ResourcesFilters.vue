<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Component } from 'vue'
import { computed, toRefs } from 'vue'
import type { ResourceFilters, ResourceLanguage } from '~/types/resource'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface TypeOption {
  value: string
  label: string
  icon: Component
}

interface LevelOption {
  value: string
  label: string
}

type ActiveFilterType = 'type' | 'level' | 'language' | 'price'

interface ActiveFilterTag {
  label: string
  value: string
  type: ActiveFilterType
}

interface Props {
  filters: ResourceFilters
  typeOptions: TypeOption[]
  levelOptions: LevelOption[]
}

const props = defineProps<Props>()
const { filters, typeOptions, levelOptions } = toRefs(props)

const emit = defineEmits<{
  'toggle-type': [type: string]
  'toggle-level': [level: string]
  'update-filter': [key: keyof ResourceFilters, value: ResourceFilters[keyof ResourceFilters]]
  'reset-filters': []
}>()

const updateFilter = (key: keyof ResourceFilters, value: ResourceFilters[keyof ResourceFilters]) => {
  emit('update-filter', key, value)
}

const activeFilterTags = computed<ActiveFilterTag[]>(() => {
  const tags: ActiveFilterTag[] = []
  const state = filters.value

  state.type.forEach(typeValue => {
    const option = typeOptions.value.find(option => option.value === typeValue)
    if (option) {
      tags.push({ label: option.label, value: typeValue, type: 'type' })
    }
  })

  state.level.forEach(levelValue => {
    const option = levelOptions.value.find(option => option.value === levelValue)
    if (option) {
      tags.push({ label: option.label, value: levelValue, type: 'level' })
    }
  })

  if (state.language) {
    const label = state.language === 'en' ? '🇬🇧 English' : '🇫🇷 Français'
    tags.push({ label, value: state.language, type: 'language' })
  }

  if (state.price) {
    const label = state.price === 'free' ? '💰 Free' : '💰 Paid'
    tags.push({ label, value: state.price, type: 'price' })
  }

  return tags
})

const hasActiveFilters = computed(() => activeFilterTags.value.length > 0)

const removeFilter = (tag: ActiveFilterTag) => {
  if (tag.type === 'type') {
    emit('toggle-type', tag.value)
  } else if (tag.type === 'level') {
    emit('toggle-level', tag.value)
  } else if (tag.type === 'language') {
    updateFilter('language', null)
  } else if (tag.type === 'price') {
    updateFilter('price', null)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="hasActiveFilters" class="mb-4">
      <div class="flex flex-wrap items-center gap-2 p-3 bg-[var(--color-neutral-900)]/50 border border-[var(--color-neutral-800)] rounded-lg">
        <span class="text-xs font-medium text-[var(--color-neutral-400)]">Active:</span>
        <button
          v-for="tag in activeFilterTags"
          :key="`${tag.type}-${tag.value}`"
          @click="removeFilter(tag)"
          class="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-[var(--color-primary)] text-[var(--color-neutral-950)] hover:bg-[var(--color-primary)]/80 transition-colors"
        >
          <span>{{ tag.label }}</span>
          <X class="size-3" />
        </button>
        <button
          @click="emit('reset-filters')"
          class="ml-auto text-xs text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
        >
          Clear all
        </button>
      </div>
    </div>

    <div class="bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)] rounded-lg p-5 space-y-5">
    <!-- Type & Level Filters Row -->
    <div class="flex flex-wrap gap-6">
      <!-- Type Filter -->
      <div class="flex-1 min-w-[200px] space-y-2">
        <label class="text-sm font-semibold text-[var(--color-neutral-200)]">
          Type
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="type in typeOptions"
            :key="type.value"
            @click="emit('toggle-type', type.value)"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-all cursor-pointer flex items-center gap-2',
              filters.type.includes(type.value as any)
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
            ]"
          >
            <component
              :is="type.icon"
              :class="[
                'size-4',
                filters.type.includes(type.value as any)
                  ? 'text-[var(--color-neutral-950)]'
                  : 'text-[var(--color-primary)]'
              ]"
              aria-hidden="true"
            />
            <span>{{ type.label }}</span>
          </button>
        </div>
      </div>

      <!-- Level Filter -->
      <div class="flex-1 min-w-[200px] space-y-2">
        <label class="text-sm font-semibold text-[var(--color-neutral-200)]">
          Level
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="level in levelOptions"
            :key="level.value"
            @click="emit('toggle-level', level.value)"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-all capitalize cursor-pointer',
              filters.level.includes(level.value as any)
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
            ]"
          >
            {{ level.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Language & Price Row -->
    <div class="flex flex-wrap gap-6">
      <!-- Language Filter -->
      <div class="flex-1 min-w-[200px] space-y-2">
        <label class="text-sm font-semibold text-[var(--color-neutral-200)]">
          Language
        </label>
        <Select :model-value="filters.language" @update:model-value="updateFilter('language', $event as ResourceLanguage | null)">
          <SelectTrigger class="h-10 w-full bg-[var(--color-neutral-950)] border-[var(--color-neutral-800)] text-sm">
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
      <div class="flex-1 min-w-[200px] space-y-2">
        <label class="text-sm font-semibold text-[var(--color-neutral-200)]">
          Price
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            @click="updateFilter('price', null)"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-all cursor-pointer',
              !filters.price
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
            ]"
          >
            All
          </button>
          <button
            @click="updateFilter('price', 'free')"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-all cursor-pointer',
              filters.price === 'free'
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
            ]"
          >
            Free
          </button>
          <button
            @click="updateFilter('price', 'paid')"
            :class="[
              'px-3 py-2 text-sm rounded-lg transition-all cursor-pointer',
              filters.price === 'paid'
                ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
            ]"
          >
            Paid
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

