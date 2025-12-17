<script setup lang="ts">
import { FolderOpen, ArrowLeft } from 'lucide-vue-next'

const { fetchCollectionsWithCounts } = useCollections()

// Fetch all collections with counts
const { data: collections, pending: loading } = await useAsyncData(
  'all-collections',
  () => fetchCollectionsWithCounts()
)

// SEO
useHead({
  title: 'Collections - JSResources',
  meta: [
    { name: 'description', content: 'Browse curated collections of JavaScript and TypeScript learning resources organized by learning goals.' }
  ]
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <!-- Header -->
    <div class="border-b border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-4">
          <NuxtLink to="/">
            <Button variant="ghost" size="sm" class="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)]">
              <ArrowLeft class="size-4 mr-2" />
              Home
            </Button>
          </NuxtLink>
        </div>
        
        <div class="flex items-center gap-3 mb-2">
          <div class="p-2 rounded-lg bg-[var(--color-primary)]/10">
            <FolderOpen class="size-6 text-[var(--color-primary)]" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-neutral-50)]">
            Collections
          </h1>
        </div>
        
        <p class="text-lg text-[var(--color-neutral-400)] max-w-2xl">
          Curated resources organized by learning goals. Find the perfect starting point for your JavaScript journey.
        </p>
      </div>
    </div>

    <!-- Collections Grid -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CollectionsGrid 
        :collections="collections || []" 
        :loading="loading" 
      />
    </div>
  </div>
</template>

