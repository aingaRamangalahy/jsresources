<script setup lang="ts">
import { ArrowRight, BookOpen, Sparkles, FolderOpen } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const { fetchCollectionsWithCounts } = useCollections()

// Fetch collections with resource counts
const { data: collections, pending: collectionsLoading } = await useAsyncData(
  'featured-collections',
  () => fetchCollectionsWithCounts()
)

// SEO
useHead({
  title: 'JSResources - Curated JavaScript Learning Resources',
  meta: [
    { name: 'description', content: 'Discover the best JavaScript and TypeScript learning resources. Curated collections of tutorials, courses, articles, and more.' }
  ]
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 via-transparent to-transparent"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--color-primary)]/10 to-transparent blur-3xl"></div>
      
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <!-- Badge -->
        <div class="flex justify-center mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm text-[var(--color-primary)]">
            <Sparkles class="size-4" />
            <span class="font-medium">Curated Learning Resources</span>
          </div>
        </div>
        <p class="text-center text-lg sm:text-xl font-semibold mb-4 max-w-xl mx-auto">
          Discover hand-picked JavaScript and TypeScript resources.<br>
          Curated collections to find what you need.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/resources">
            <Button size="lg" class="gap-2 text-base shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 transition-shadow">
              <BookOpen class="size-5" />
              Browse All Resources
              <ArrowRight class="size-4" />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Collections Section -->
    <section class="py-12 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <FolderOpen class="size-5 text-[var(--color-primary)]" />
              <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)]">
                Collections
              </h2>
            </div>
            <p class="text-[var(--color-neutral-400)]">
              Curated resources organized by learning goals
            </p>
          </div>
          
          <NuxtLink 
            to="/collections"
            class="hidden sm:flex items-center gap-1 text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all
            <ArrowRight class="size-4" />
          </NuxtLink>
        </div>
        
        <!-- Collections Grid -->
        <CollectionsGrid 
          :collections="collections || []" 
          :loading="collectionsLoading" 
        />
        
        <!-- Mobile "View All" Link -->
        <div class="mt-6 text-center sm:hidden">
          <NuxtLink 
            to="/collections"
            class="inline-flex items-center gap-1 text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all collections
            <ArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Browse All Section -->
    <section class="py-12 sm:py-16 border-t border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-2xl border border-[var(--color-neutral-800)] bg-gradient-to-br from-[var(--color-neutral-900)] via-[var(--color-neutral-900)] to-[var(--color-primary)]/5 p-8 sm:p-12 text-center overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)] mb-4">
              Not sure where to start?
            </h2>
            <p class="text-[var(--color-neutral-400)] mb-8 max-w-lg mx-auto">
              Browse all resources and filter by topic, type, or difficulty level to find what you need.
            </p>
            <NuxtLink to="/resources">
              <Button size="lg" class="gap-2 text-base">
                <BookOpen class="size-5" />
                Browse All Resources
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
}
</style>
