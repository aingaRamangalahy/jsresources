<script setup lang="ts">
import type { Resource } from '~/types/resource'

// Provide context for sidebar data - pages can inject their own data
const sidebarData = ref({
  filters: {
    search: '',
    topics: [],
    type: [],
    level: [],
    language: null,
    price: null
  },
  allTopics: [],
  showSidebar: true
})

// Provide handlers that pages can override
const sidebarHandlers = ref({
  updateFilters: () => {},
  toggleTopic: () => {},
  toggleType: () => {},
  toggleLevel: () => {},
  resetFilters: () => {}
})

// Provide the data and handlers to child components
provide('sidebarData', sidebarData)
provide('sidebarHandlers', sidebarHandlers)
</script>

<template>
  <div class="min-h-screen bg-[var(--color-neutral-950)]">
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <footer class="border-t border-[var(--color-neutral-800)]/50 mt-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-[var(--color-neutral-600)]">
          curated with love for the JavaScript community
        </p>
      </div>
    </footer>
  </div>
</template>