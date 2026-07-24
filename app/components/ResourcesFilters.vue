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

  state.type.forEach((typeValue) => {
    const option = typeOptions.value.find(option => option.value === typeValue)
    if (option) {
      tags.push({ label: option.label, value: typeValue, type: 'type' })
    }
  })

  state.level.forEach((levelValue) => {
    const option = levelOptions.value.find(option => option.value === levelValue)
    if (option) {
      tags.push({ label: option.label, value: levelValue, type: 'level' })
    }
  })

  if (state.language) {
    tags.push({
      label: state.language === 'en' ? 'English' : 'Français',
      value: state.language,
      type: 'language',
    })
  }

  if (state.price) {
    tags.push({
      label: state.price === 'free' ? 'Free' : 'Paid',
      value: state.price,
      type: 'price',
    })
  }

  return tags
})

const hasActiveFilters = computed(() => activeFilterTags.value.length > 0)

const removeFilter = (tag: ActiveFilterTag) => {
  if (tag.type === 'type') emit('toggle-type', tag.value)
  else if (tag.type === 'level') emit('toggle-level', tag.value)
  else if (tag.type === 'language') updateFilter('language', null)
  else if (tag.type === 'price') updateFilter('price', null)
}

const chipBase = 'px-3 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-2'
const chipActive = 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary-border)] shadow-[0_2px_0_0_var(--color-primary-shadow)]'
const chipIdle = 'bg-white text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary-border)] hover:text-[var(--color-text)]'
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="hasActiveFilters"
      class="flex flex-wrap items-center gap-2 p-3 clay-surface !rounded-2xl !shadow-none"
    >
      <span class="text-xs font-bold uppercase tracking-wide" style="color: var(--color-text-subtle);">
        Active
      </span>
      <button
        v-for="tag in activeFilterTags"
        :key="`${tag.type}-${tag.value}`"
        type="button"
        class="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full cursor-pointer transition-colors duration-200 border"
        style="background-color: var(--color-primary); color: var(--color-on-primary); border-color: var(--color-primary-border);"
        @click="removeFilter(tag)"
      >
        <span>{{ tag.label }}</span>
        <X class="size-3" />
      </button>
      <button
        type="button"
        class="ml-auto text-xs font-bold cursor-pointer transition-colors duration-200 hover:text-[var(--color-accent)]"
        style="color: var(--color-text-muted);"
        @click="emit('reset-filters')"
      >
        Clear all
      </button>
    </div>

    <div class="clay-surface p-5 space-y-5">
      <div class="flex flex-wrap gap-6">
        <div class="flex-1 min-w-[200px] space-y-2.5">
          <label class="font-display text-sm font-semibold" style="color: var(--color-text);">
            Type
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in typeOptions"
              :key="type.value"
              type="button"
              :class="[
                chipBase,
                filters.type.includes(type.value as never) ? chipActive : chipIdle,
              ]"
              @click="emit('toggle-type', type.value)"
            >
              <component
                :is="type.icon"
                class="size-4"
                :style="filters.type.includes(type.value as never) ? 'color: var(--color-on-primary);' : 'color: var(--color-accent);'"
                aria-hidden="true"
              />
              <span>{{ type.label }}</span>
            </button>
          </div>
        </div>

        <div class="flex-1 min-w-[200px] space-y-2.5">
          <label class="font-display text-sm font-semibold" style="color: var(--color-text);">
            Level
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="level in levelOptions"
              :key="level.value"
              type="button"
              :class="[
                chipBase,
                'capitalize',
                filters.level.includes(level.value as never) ? chipActive : chipIdle,
              ]"
              @click="emit('toggle-level', level.value)"
            >
              {{ level.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-6">
        <div class="flex-1 min-w-[200px] space-y-2.5">
          <label class="font-display text-sm font-semibold" style="color: var(--color-text);">
            Language
          </label>
          <Select
            :model-value="filters.language ?? 'all'"
            @update:model-value="updateFilter('language', $event === 'all' ? null : $event as ResourceLanguage)"
          >
            <SelectTrigger class="h-11 w-full rounded-xl border-2 border-[var(--color-border)] bg-white font-semibold">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent class="z-50 rounded-xl border-2 border-[var(--color-border)]">
              <SelectItem value="all">
                All languages
              </SelectItem>
              <SelectItem value="en">
                English
              </SelectItem>
              <SelectItem value="fr">
                Français
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex-1 min-w-[200px] space-y-2.5">
          <label class="font-display text-sm font-semibold" style="color: var(--color-text);">
            Price
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              :class="[chipBase, !filters.price ? chipActive : chipIdle]"
              @click="updateFilter('price', null)"
            >
              All
            </button>
            <button
              type="button"
              :class="[chipBase, filters.price === 'free' ? chipActive : chipIdle]"
              @click="updateFilter('price', 'free')"
            >
              Free
            </button>
            <button
              type="button"
              :class="[chipBase, filters.price === 'paid' ? chipActive : chipIdle]"
              @click="updateFilter('price', 'paid')"
            >
              Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
