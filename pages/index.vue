<script setup lang="ts">
import type { Resource, ResourceFilters } from '~/types/resource'
import { BookOpen, FileText, Github, GraduationCap, Globe, NotebookPen, Play, Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import SearchBar from '~/components/SearchBar.vue'
import AppSidebar from '~/components/AppSidebar.vue'
import ResourceCard from '~/components/ResourceCard.vue'
import ResourcesFilters from '~/components/ResourcesFilters.vue'

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
  { value: 'video', label: 'Video', icon: Play },
  { value: 'course', label: 'Course', icon: GraduationCap },
  { value: 'article', label: 'Article', icon: FileText },
  { value: 'book', label: 'Book', icon: BookOpen },
  { value: 'tutorial', label: 'Tutorial', icon: NotebookPen },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'website', label: 'Website', icon: Globe },
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

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
    <!-- Featured: Visualize Section -->
    <div class="mb-8 p-6 rounded-xl border-2 border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-info)]/10 hover:border-[var(--color-primary)]/50 transition-all">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold tracking-widest text-[var(--color-primary)] uppercase px-2 py-1 bg-[var(--color-primary)]/10 rounded-md">
              ✨ New Feature
            </span>
          </div>
          <h2 class="text-2xl font-bold text-[var(--color-neutral-50)] mb-2">
            Interactive Event Loop Visualizer
          </h2>
          <p class="text-sm text-[var(--color-neutral-400)] mb-3">
            Understand how JavaScript's event loop works through interactive animations. See the call stack, Web APIs, callback queue, and microtask queue in action with real code examples.
          </p>
          <div class="flex flex-wrap gap-2 text-xs text-[var(--color-neutral-400)]">
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              3 Interactive Examples
            </span>
            <span class="text-[var(--color-neutral-600)]">•</span>
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Play/Pause Controls
            </span>
            <span class="text-[var(--color-neutral-600)]">•</span>
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Step-by-step Explanations
            </span>
          </div>
        </div>
        <div class="flex-shrink-0">
          <NuxtLink to="/visualize">
            <Button size="lg" class="gap-2 shadow-lg shadow-[var(--color-primary)]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Explore Visualizer
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>

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

        <!-- Filters Section -->
        <div class="mb-6">
          <ResourcesFilters
            :filters="filters"
            :type-options="typeOptions"
            :level-options="levelOptions"
            @toggle-type="toggleType"
            @toggle-level="toggleLevel"
            @update-filter="updateFilter"
            @reset-filters="resetFilters"
          />
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

