<script setup lang="ts">
import type { Resource, ResourceFilters } from '~/types/resource'
import { BookOpen, FileText, Github, GraduationCap, Globe, NotebookPen, Play, Search, SlidersHorizontal, X } from 'lucide-vue-next'
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

// SEO
useHead({
  title: 'Learning Resources - JSResources',
  meta: [
    { name: 'description', content: 'Curated collection of JavaScript learning resources including courses, tutorials, books, and more.' }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <!-- Header Section -->
    <section class="relative overflow-hidden border-b border-[var(--color-neutral-800)]/50">
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-info)]/5 to-transparent"></div>
      
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-neutral-50)] mb-4">
            Learning Resources
          </h1>
          <p class="text-lg text-[var(--color-neutral-400)] max-w-2xl mx-auto">
            Hand-picked courses, tutorials, and articles to help you master JavaScript and its ecosystem.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
  </div>
</template>

