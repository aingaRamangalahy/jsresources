<script setup lang="ts">
import type { CollectionWithCount } from '~/types/collection'
import { ArrowRight } from 'lucide-vue-next'
import { useCollections } from '~/composables/useCollections'

interface Props {
  collection: CollectionWithCount
}

const props = defineProps<Props>()

const { getCollectionColorClasses } = useCollections()

// Get color classes for the collection
const colorClasses = computed(() => getCollectionColorClasses(props.collection.color))
</script>

<template>
  <NuxtLink
    :to="`/collections/${collection.id}`"
    class="group block p-5 rounded-xl border border-[var(--color-neutral-800)] transition-all duration-200"
  >
    <!-- Icon -->
    <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 transition-all duration-200">
      <span class="text-2xl">{{ collection.icon }}</span>
    </div>
    
    <!-- Title -->
    <h3 class="text-lg font-semibold mb-2 group-hover:translate-x-0.5 transition-transform">
      {{ collection.title }}
    </h3>
    
    <!-- Description -->
    <p class="text-sm text-[var(--color-neutral-400)] leading-relaxed mb-3 line-clamp-2">
      {{ collection.description }}
    </p>
    
    <!-- Footer: Resource count + Arrow -->
    <div class="flex items-center justify-end">
      <ArrowRight class="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </div>
  </NuxtLink>
</template>

