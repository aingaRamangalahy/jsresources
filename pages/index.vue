<script setup lang="ts">
import type { Resource, ResourceFilters } from '~/types/resource'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import SearchBar from '~/components/SearchBar.vue'
import AppSidebar from '~/components/AppSidebar.vue'
import ResourceCard from '~/components/ResourceCard.vue'

// Fetch all resources
const { data: resources } = await useAsyncData('resources', () => 
  queryContent<Resource>('/resources').find()
)

// Use filter composable
const {
  filters,
  filterResources,
  resetFilters,
  toggleTopic,
  toggleType,
  toggleLevel
} = useResourceFilters()

// Update individual filter properties
const updateFilter = (key: keyof ResourceFilters, value: any) => {
  Object.assign(filters.value, { [key]: value })
}

// Type and level options
const typeOptions = [
  { value: 'video', label: '📹 Video', emoji: '📹' },
  { value: 'course', label: '🎓 Course', emoji: '🎓' },
  { value: 'article', label: '📄 Article', emoji: '📄' },
  { value: 'book', label: '📚 Book', emoji: '📚' },
  { value: 'tutorial', label: '📖 Tutorial', emoji: '📖' },
  { value: 'github', label: '📚 GitHub', emoji: '📚' },
  { value: 'website', label: '🌐 Website', emoji: '🌐' },
]

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

// Additional state
const showPaidResources = ref(true)
const showMobileFilters = ref(false)

// Compute filtered resources
const filteredResources = computed(() => {
  if (!resources.value) return []
  let result = filterResources(resources.value)
  
  // Apply paid resources filter
  if (!showPaidResources.value) {
    result = result.filter(resource => resource.price === 'free')
  }
  
  return result
})

// Get all unique topics
const allTopics = computed(() => {
  if (!resources.value) return []
  const topicsSet = new Set<string>()
  resources.value.forEach(resource => {
    resource.topics.forEach(topic => topicsSet.add(topic))
  })
  return Array.from(topicsSet).sort()
})

// Stats
const stats = computed(() => ({
  total: resources.value?.length || 0,
}))

// Update global resource stats for header
const { setTotalResources } = useResourceStats()
watch(() => resources.value, (newResources) => {
  if (newResources) {
    setTotalResources(newResources.length)
  }
}, { immediate: true })

// Active filters count
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.topics.length > 0) count += filters.value.topics.length
  if (filters.value.type.length > 0) count += filters.value.type.length
  if (filters.value.level.length > 0) count += filters.value.level.length
  if (filters.value.language) count++
  if (filters.value.price) count++
  return count
})

// Get active filter tags for display
const activeFilterTags = computed(() => {
  const tags: Array<{ label: string; value: string; type: string }> = []
  
  // Type filters
  filters.value.type.forEach(type => {
    const option = typeOptions.find(o => o.value === type)
    if (option) {
      tags.push({ label: option.label, value: type, type: 'type' })
    }
  })
  
  // Level filters
  filters.value.level.forEach(level => {
    const option = levelOptions.find(o => o.value === level)
    if (option) {
      tags.push({ label: option.label, value: level, type: 'level' })
    }
  })
  
  // Language filter
  if (filters.value.language) {
    const langLabel = filters.value.language === 'en' ? '🇬🇧 English' : '🇫🇷 Français'
    tags.push({ label: langLabel, value: filters.value.language, type: 'language' })
  }
  
  // Price filter
  if (filters.value.price) {
    const priceLabel = filters.value.price === 'free' ? '💰 Free' : '💰 Paid'
    tags.push({ label: priceLabel, value: filters.value.price, type: 'price' })
  }
  
  return tags
})

// Remove individual filter
const removeFilter = (tag: { type: string; value: string }) => {
  if (tag.type === 'type') {
    toggleType(tag.value)
  } else if (tag.type === 'level') {
    toggleLevel(tag.value)
  } else if (tag.type === 'language') {
    updateFilter('language', null)
  } else if (tag.type === 'price') {
    updateFilter('price', null)
  }
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
    <!-- Mobile Topics Toggle Button -->
    <div class="lg:hidden mb-4">
      <Button
        @click="showMobileFilters = !showMobileFilters"
        variant="outline"
        class="w-full flex items-center justify-center gap-2 relative"
      >
        <SlidersHorizontal class="size-4" />
        <span>{{ showMobileFilters ? 'Hide Topics' : 'Show Topics' }}</span>
        <span
          v-if="filters.topics.length > 0"
          class="ml-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-primary)] text-[var(--color-neutral-950)]"
        >
          {{ filters.topics.length }}
        </span>
        <X v-if="showMobileFilters" class="size-4" />
      </Button>
    </div>

    <!-- Mobile Topics (Collapsible) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showMobileFilters"
        class="lg:hidden mb-6 p-4 bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)] rounded-lg"
      >
        <AppSidebar
          mobile
          :filters="filters"
          :all-topics="allTopics"
          @toggle-topic="toggleTopic"
        />
      </div>
    </Transition>

    <!-- Desktop Layout: Sidebar + Content -->
    <div class="flex gap-8 items-start">
      <!-- Desktop Sidebar (Topics Only) -->
      <AppSidebar
        class="hidden lg:block shrink-0"
        :filters="filters"
        :all-topics="allTopics"
        @toggle-topic="toggleTopic"
      />

      <!-- Resources Section (with Search & Filters) -->
      <section class="flex-1 min-w-0">
        <!-- Search Bar -->
        <div class="mb-6">
          <SearchBar v-model="filters.search" />
        </div>

        <!-- Active Filters Bar -->
        <div v-if="activeFilterTags.length > 0" class="mb-4">
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
              @click="resetFilters"
              class="ml-auto text-xs text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="mb-6">
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
                    @click="toggleType(type.value)"
                    :class="[
                      'px-3 py-2 text-sm rounded-lg transition-all cursor-pointer flex items-center gap-2',
                      filters.type.includes(type.value as any)
                        ? 'bg-[var(--color-primary)] text-[var(--color-neutral-950)] shadow-lg shadow-[var(--color-primary)]/20'
                        : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]'
                    ]"
                  >
                    <span class="text-base">{{ type.emoji }}</span>
                    <span>{{ type.label.replace(type.emoji + ' ', '') }}</span>
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
                    @click="toggleLevel(level.value)"
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
                <Select :model-value="filters.language" @update:model-value="updateFilter('language', $event)">
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

        <!-- Resources Grid -->
        <div v-if="filteredResources.length > 0" class="grid gap-4">
          <ResourceCard
            v-for="resource in filteredResources"
            :key="resource._path"
            :resource="resource"
          />
        </div>

        <div v-else class="text-center py-24">
          <div class="inline-flex p-5 rounded-full bg-[var(--color-neutral-900)] border border-[var(--color-neutral-800)] mb-6">
            <Search class="size-10 text-[var(--color-neutral-600)]" />
          </div>
          <h3 class="text-xl font-semibold text-[var(--color-neutral-200)] mb-2">
            No resources found
          </h3>
          <p class="text-[var(--color-neutral-500)] mb-8 max-w-md mx-auto">
            Try adjusting your search query or filters to discover more learning materials
          </p>
          <Button @click="resetFilters" variant="outline" size="lg">
            Clear all filters
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>

