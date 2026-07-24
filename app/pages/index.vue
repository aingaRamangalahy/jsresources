<script setup lang="ts">
import type { Resource, ResourceFilters } from '~/types/resource'
import {
  BookOpen,
  FileText,
  Github,
  Globe,
  GraduationCap,
  LayoutGrid,
  Library,
  List,
  NotebookPen,
  Play,
  Search,
} from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

type ResourceViewMode = 'list' | 'card'

const { data: resources } = await useAsyncData(
  'resources',
  () => queryContent<Resource>('/resources').find(),
  {
    default: () => [],
    server: true,
  },
)

const {
  filters,
  filterResources,
  resetFilters,
  hasActiveFilters,
  toggleTopic,
  toggleType,
  toggleLevel,
} = useResourceFilters()

const updateFilter = (key: keyof ResourceFilters, value: ResourceFilters[keyof ResourceFilters]) => {
  Object.assign(filters.value, { [key]: value })
}

const typeOptions = [
  { value: 'video', label: 'Video', icon: Play },
  { value: 'course', label: 'Course', icon: GraduationCap },
  { value: 'article', label: 'Article', icon: FileText },
  { value: 'book', label: 'Book', icon: BookOpen },
  { value: 'tutorial', label: 'Tutorial', icon: NotebookPen },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'website', label: 'Website', icon: Globe },
  { value: 'documentation', label: 'Docs', icon: Library },
]

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const viewMode = useState<ResourceViewMode>('resourceViewMode', () => 'list')

const filteredResources = computed(() => {
  if (!resources.value) return []
  return filterResources(resources.value)
})

const allTopics = computed(() => {
  if (!resources.value) return []
  const topicsSet = new Set<string>()
  resources.value.forEach((resource) => {
    resource.topics.forEach(topic => topicsSet.add(topic))
  })
  return Array.from(topicsSet).sort()
})

const totalCount = computed(() => resources.value?.length || 0)
const resultCount = computed(() => filteredResources.value.length)

const { setTotalResources } = useResourceStats()
watch(() => resources.value, (newResources) => {
  if (newResources) {
    setTotalResources(newResources.length)
  }
}, { immediate: true })

useHead({
  title: 'JSResources — JavaScript Learning Resources',
  meta: [
    {
      name: 'description',
      content: 'Browse and filter curated JavaScript learning resources: courses, tutorials, books, videos, and more.',
    },
  ],
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 space-y-8">
      <header class="text-left space-y-3">
        <p
          class="font-display text-sm font-semibold uppercase tracking-wider"
          style="color: var(--color-accent);"
        >
          Learning catalog
        </p>
        <h1
          class="font-display font-semibold"
          style="font-size: clamp(2rem, 4.5vw, 3rem); line-height: 1.15; color: var(--color-text);"
        >
          Find your next
          <span
            class="inline-block px-2 rounded-lg"
            style="background-color: var(--color-primary); color: var(--color-on-primary);"
          >JavaScript</span>
          resource
        </h1>
        <p class="text-base sm:text-lg font-medium max-w-3xl" style="color: var(--color-text-muted);">
          {{ totalCount }} curated courses, tutorials, books, and docs — filter by topic, type, level, language, or price.
        </p>
      </header>

      <SearchBar v-model="filters.search" />

      <AppSidebar
        mobile
        :filters="filters"
        :all-topics="allTopics"
        @toggle-topic="toggleTopic"
      />

      <ResourcesFilters
        :filters="filters"
        :type-options="typeOptions"
        :level-options="levelOptions"
        @toggle-type="toggleType"
        @toggle-level="toggleLevel"
        @update-filter="updateFilter"
        @reset-filters="resetFilters"
      />

      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm font-bold" style="color: var(--color-text-muted);">
          Showing
          <span style="color: var(--color-accent);">{{ resultCount }}</span>
          of {{ totalCount }}
        </p>

        <div class="flex items-center gap-2">
          <Button
            v-if="hasActiveFilters"
            variant="ghost"
            size="sm"
            @click="resetFilters"
          >
            Reset filters
          </Button>

          <div
            class="inline-flex rounded-xl border-2 overflow-hidden"
            style="border-color: var(--color-border); background-color: white;"
            role="group"
            aria-label="View mode"
          >
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-2 text-sm font-bold cursor-pointer transition-colors duration-200"
              :style="viewMode === 'list'
                ? 'background-color: var(--color-primary); color: var(--color-on-primary);'
                : 'color: var(--color-text-muted);'"
              :aria-pressed="viewMode === 'list'"
              @click="viewMode = 'list'"
            >
              <List class="size-4" />
              List
            </button>
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-2 text-sm font-bold cursor-pointer transition-colors duration-200"
              :style="viewMode === 'card'
                ? 'background-color: var(--color-primary); color: var(--color-on-primary);'
                : 'color: var(--color-text-muted);'"
              :aria-pressed="viewMode === 'card'"
              @click="viewMode = 'card'"
            >
              <LayoutGrid class="size-4" />
              Cards
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="filteredResources.length > 0"
        :class="viewMode === 'card'
          ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid gap-4'"
      >
        <ResourceCard
          v-for="(resource, index) in filteredResources"
          :key="resource._path"
          :resource="resource"
          :view="viewMode"
          class="resource-card-enter"
          :style="{ animationDelay: `${Math.min(index, 12) * 40}ms` }"
        />
      </div>

      <div v-else class="text-left py-12 clay-surface px-6">
        <div
          class="inline-flex p-5 rounded-full mb-6 border-2"
          style="background-color: var(--color-surface-soft); border-color: var(--color-border);"
        >
          <Search class="size-10" style="color: var(--color-text-subtle);" />
        </div>
        <h3 class="font-display text-xl font-semibold mb-2" style="color: var(--color-text);">
          No resources found
        </h3>
        <p class="mb-6 max-w-md font-medium" style="color: var(--color-text-muted);">
          Try adjusting your search or filters to discover more learning materials.
        </p>
        <Button size="lg" @click="resetFilters">
          Clear all filters
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-card-enter {
  animation: card-in 0.35s ease-out both;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .resource-card-enter {
    animation: none;
  }
}
</style>
