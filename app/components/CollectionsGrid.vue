<script setup lang="ts">
import type { CollectionWithCount } from '~/types/collection'

interface Props {
  collections: CollectionWithCount[]
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <!-- Loading State -->
    <div 
      v-if="loading" 
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div 
        v-for="i in 6" 
        :key="i"
        class="h-40 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)] animate-pulse"
      />
    </div>
    
    <!-- Collections Grid -->
    <div 
      v-else-if="collections.length > 0"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <ResourceCard
        v-for="collection in collections"
        :key="collection.id"
        :collection="collection"
        variant="collection"
      />
    </div>
    
    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-12 text-[var(--color-neutral-500)]"
    >
      <p>No collections available yet.</p>
    </div>
  </div>
</template>

