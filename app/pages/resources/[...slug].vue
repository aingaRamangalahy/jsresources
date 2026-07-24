<script setup lang="ts">
import type { Resource } from '~/types/resource'
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
} from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const route = useRoute()

const slugParts = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s : [s]
})

const contentPath = computed(() => `/resources/${slugParts.value.join('/')}`)

const { data: resource, error } = await useAsyncData(
  `resource-${contentPath.value}`,
  () => queryContent<Resource>(contentPath.value).findOne(),
  { server: true },
)

useHead({
  title: computed(() => resource.value ? `${resource.value.title} - JSResources` : 'Resource - JSResources'),
  meta: [
    { name: 'description', content: computed(() => resource.value?.description || resource.value?.why || '') },
  ],
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-10">
    <div
      v-if="error || !resource"
      class="max-w-2xl mx-auto text-center clay-surface p-10"
    >
      <div
        class="size-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2"
        style="background-color: var(--color-danger-alpha-10); border-color: rgba(220,38,38,0.25);"
      >
        <BookOpen class="size-8" style="color: var(--color-danger);" />
      </div>
      <h1 class="font-display text-2xl font-semibold mb-2" style="color: var(--color-text);">
        Resource not found
      </h1>
      <p class="mb-6 font-medium" style="color: var(--color-text-muted);">
        This resource doesn't exist or has been removed.
      </p>
      <NuxtLink to="/">
        <Button variant="outline">
          <ArrowLeft class="size-4" />
          Back to catalog
        </Button>
      </NuxtLink>
    </div>

    <template v-else>
      <div class="max-w-2xl mx-auto">
        <NuxtLink to="/">
          <Button variant="ghost" size="sm" class="mb-6 -ml-2">
            <ArrowLeft class="size-4" />
            Back to catalog
          </Button>
        </NuxtLink>

        <article class="clay-surface p-6 sm:p-8 space-y-5">
          <div class="flex flex-wrap gap-2">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
              :style="resource.price === 'free'
                ? 'background-color: rgba(63,125,78,0.1); color: #3F7D4E; border-color: rgba(63,125,78,0.2);'
                : 'background-color: rgba(161,98,7,0.1); color: #A16207; border-color: rgba(161,98,7,0.2);'"
            >
              {{ resource.price }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
              style="background-color: rgba(212,180,58,0.18); color: #8A7418; border-color: rgba(184,154,46,0.3);"
            >
              {{ resource.level }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
              style="background-color: var(--color-surface-soft); color: var(--color-text-muted); border-color: var(--color-border);"
            >
              {{ resource.type }}
            </span>
          </div>

          <h1 class="font-display text-3xl font-semibold" style="color: var(--color-text);">
            {{ resource.title }}
          </h1>
          <p class="font-medium" style="color: var(--color-text-muted);">
            {{ resource.author }} · {{ resource.platform }}
          </p>

          <p v-if="resource.description || resource.why" style="color: var(--color-text-muted);">
            {{ resource.description || resource.why }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="topic in resource.topics"
              :key="topic"
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
              style="background-color: var(--color-primary-soft); color: var(--color-primary); border-color: var(--color-border);"
            >
              {{ topic }}
            </span>
          </div>

          <Button
            as="a"
            :href="resource.url"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            class="w-full sm:w-auto"
          >
            Open resource
            <ExternalLink class="size-4" />
          </Button>
        </article>
      </div>
    </template>
  </div>
</template>
