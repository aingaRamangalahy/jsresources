<script setup lang="ts">
import type { Resource } from '~/types/resource'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import SearchBar from '~/components/SearchBar.vue'
import AppSidebar from '~/components/AppSidebar.vue'
import ResourceCard from '~/components/ResourceCard.vue'

// Fetch all resources
const { data: resources } = await useAsyncData('resources', () => 
  queryContent<Resource>('/resources').find()
)

// Use filter composable
const { filters, sortBy, filterResources, resetFilters, toggleTopic, toggleType, toggleLevel } = useResourceFilters()

// Additional state
const showPaidResources = ref(true)
const showMobileFilters = ref(false)

// Inject layout context
const sidebarData = inject('sidebarData')
const sidebarHandlers = inject('sidebarHandlers')

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
  filtered: filteredResources.value.length,
  free: filteredResources.value.filter(r => r.price === 'free').length,
  paid: filteredResources.value.filter(r => r.price === 'paid').length
}))

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

// Update layout sidebar data
watch([filters, allTopics], () => {
  if (sidebarData) {
    sidebarData.value.filters = filters.value
    sidebarData.value.allTopics = allTopics.value
    sidebarData.value.showSidebar = true
  }
}, { immediate: true, deep: true })

// Update layout sidebar handlers
if (sidebarHandlers) {
  sidebarHandlers.value = {
    updateFilters: (newFilters) => Object.assign(filters.value, newFilters),
    toggleTopic,
    toggleType,
    toggleLevel,
    resetFilters
  }
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
    <!-- Search Bar -->
    <div class="mb-6 max-w-4xl mx-auto">
      <SearchBar v-model="filters.search" />
    </div>

    <!-- Mobile Filter Toggle Button -->
    <div class="lg:hidden mb-4">
      <Button
        @click="showMobileFilters = !showMobileFilters"
        variant="outline"
        class="w-full flex items-center justify-center gap-2 relative"
      >
        <SlidersHorizontal class="size-4" />
        <span>{{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}</span>
        <span
          v-if="activeFiltersCount > 0"
          class="ml-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-primary)] text-[var(--color-neutral-950)]"
        >
          {{ activeFiltersCount }}
        </span>
        <X v-if="showMobileFilters" class="size-4" />
      </Button>
    </div>

    <!-- Mobile Filters (Collapsible) -->
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
          @update:filters="(newFilters) => Object.assign(filters, newFilters)"
          @toggle-topic="toggleTopic"
          @toggle-type="toggleType"
          @toggle-level="toggleLevel"
          @reset-filters="resetFilters"
        />
      </div>
    </Transition>

    <!-- Desktop Layout: Content + Sidebar -->
    <div class="flex gap-8 items-start">
      <!-- Resources Grid -->
      <section class="flex-1 min-w-0">
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

      <!-- Desktop Sidebar -->
      <AppSidebar
        class="hidden lg:block shrink-0"
        :filters="filters"
        :all-topics="allTopics"
        @update:filters="(newFilters) => Object.assign(filters, newFilters)"
        @toggle-topic="toggleTopic"
        @toggle-type="toggleType"
        @toggle-level="toggleLevel"
        @reset-filters="resetFilters"
      />
    </div>
  </div>
</template>

