<script setup lang="ts">
import { ArrowLeft, BookOpen, GitPullRequest, Plus } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const route = useRoute()
const collectionId = computed(() => route.params.id as string)

const { fetchCollection, fetchResourcesByCollection, getCollectionColorClasses } = useCollections()

// Fetch collection details
const { data: collection, error: collectionError } = await useAsyncData(
  `collection-${collectionId.value}`,
  () => fetchCollection(collectionId.value),
  {
    server: true,
  }
)

// Fetch resources in this collection
const { data: resources, pending: resourcesLoading } = await useAsyncData(
  `collection-resources-${collectionId.value}`,
  () => fetchResourcesByCollection(collectionId.value),
  {
    default: () => [],
    server: true,
  }
)

// Color classes for theming
const colorClasses = computed(() => 
  collection.value ? getCollectionColorClasses(collection.value.color) : null
)

// SEO
useHead({
  title: computed(() => collection.value ? `${collection.value.title} - JSResources` : 'Collection - JSResources'),
  meta: [
    { name: 'description', content: computed(() => collection.value?.description || 'Curated collection of JavaScript learning resources') }
  ]
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <!-- Error State -->
    <div v-if="collectionError || !collection" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="size-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
        <BookOpen class="size-8 text-red-500" />
      </div>
      <h1 class="text-2xl font-bold text-[var(--color-neutral-50)] mb-2">Collection Not Found</h1>
      <p class="text-[var(--color-neutral-400)] mb-6">The collection you're looking for doesn't exist.</p>
      <NuxtLink to="/collections">
        <Button variant="outline">
          <ArrowLeft class="size-4 mr-2" />
          Back to Collections
        </Button>
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Header -->
      <div 
        class="border-b border-[var(--color-neutral-800)]/50"
        :class="colorClasses?.bg"
      >
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center gap-4 mb-6">
            <NuxtLink to="/collections">
              <Button variant="ghost" size="sm" class="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)]">
                <ArrowLeft class="size-4 mr-2" />
                Collections
              </Button>
            </NuxtLink>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="text-4xl">{{ collection.icon }}</div>
            <div>
              <h1 
                class="text-3xl sm:text-4xl font-bold mb-2 text-[var(--color-neutral-50)]"
              >
                {{ collection.title }}
              </h1>
              <p class="text-lg text-[var(--color-neutral-400)] max-w-2xl">
                {{ collection.description }}
              </p>
              <p class="mt-2 text-sm text-[var(--color-neutral-500)]">
                {{ resources?.length || 0 }} {{ (resources?.length || 0) === 1 ? 'resource' : 'resources' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources List -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Loading State -->
        <div v-if="resourcesLoading" class="space-y-4">
          <div 
            v-for="i in 3" 
            :key="i"
            class="h-32 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)] animate-pulse"
          />
        </div>

        <!-- Empty State -->
        <div 
          v-else-if="!resources || resources.length === 0" 
          class="text-center py-16"
        >
          <div class="size-16 rounded-full bg-[var(--color-neutral-800)] flex items-center justify-center mx-auto mb-4">
            <BookOpen class="size-8 text-[var(--color-neutral-500)]" />
          </div>
          <h2 class="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">
            No resources yet
          </h2>
          <p class="text-[var(--color-neutral-400)] mb-2 max-w-md mx-auto">
            This collection is being curated. Help us grow it by contributing your favorite resources!
          </p>
          <p class="text-sm text-[var(--color-neutral-500)] mb-8">
            Found a great resource that fits this collection? We'd love to add it.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              as="a"
              href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md#adding-resources"
              target="_blank"
              rel="noopener noreferrer"
              class="gap-2"
            >
              <Plus class="size-4" />
              Submit a resource
            </Button>
            <NuxtLink to="/resources">
              <Button variant="outline">
                Browse All Resources
              </Button>
            </NuxtLink>
          </div>
        </div>

        <!-- Resources Grid -->
        <div v-else class="space-y-4">
          <ResourceCard
            v-for="resource in resources"
            :key="resource._path"
            :resource="resource"
          />
        </div>
      </div>
    </template>
  </div>
</template>

