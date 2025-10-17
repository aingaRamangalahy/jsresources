<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Resources</h2>
        <p class="text-muted-foreground">
          {{ resources.length }} resource{{ resources.length === 1 ? '' : 's' }} found
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="h-48 animate-pulse rounded-lg bg-muted"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="resources.length === 0" class="text-center py-20">
      <div class="inline-flex p-4 rounded-full bg-[var(--color-neutral-800)] mb-4">
        <Search class="size-8 text-[var(--color-neutral-400)]" />
      </div>
      <h3 class="text-lg font-semibold text-[var(--color-neutral-100)] mb-2">
        No resources found
      </h3>
      <p class="text-[var(--color-neutral-400)] mb-6">
        Try adjusting your filters or search query
      </p>
    </div>

    <!-- Resources List -->
    <div v-else class="space-y-2">
      <div
        v-for="resource in resources"
        :key="resource._path"
        class="
          group p-4 rounded-[var(--radius-lg)]
          bg-[var(--color-neutral-900)]
          border border-[var(--color-neutral-800)]
          hover:border-[var(--color-neutral-700)]
          hover:shadow-[var(--shadow-glow)]
          transition-all
        "
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div class="p-2 rounded-[var(--radius-md)] bg-[var(--color-neutral-800)]">
            <component :is="getTypeIcon(resource.type)" class="size-5 text-[var(--color-primary)]" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-semibold text-[var(--color-neutral-100)] group-hover:text-[var(--color-primary)] transition-colors">
                {{ resource.title }}
              </h3>
              
              <!-- Badges -->
              <div class="flex items-center gap-2 shrink-0">
                <Badge :variant="getLevelVariant(resource.level)">
                  {{ resource.level }}
                </Badge>
                <Badge :variant="resource.price === 'free' ? 'success' : 'info'">
                  {{ resource.price }}
                </Badge>
              </div>
            </div>

            <p class="text-sm text-[var(--color-neutral-400)] mt-1">
              {{ resource.author }} • {{ resource.platform }}
            </p>

            <p class="text-sm text-[var(--color-neutral-300)] mt-2 line-clamp-2">
              {{ resource.description }}
            </p>

            <!-- Topics -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              <Badge 
                v-for="topic in resource.topics.slice(0, 5)" 
                :key="topic"
                variant="secondary"
                class="text-xs"
              >
                {{ topic }}
              </Badge>
              <Badge v-if="resource.topics.length > 5" variant="secondary" class="text-xs">
                +{{ resource.topics.length - 5 }}
              </Badge>
            </div>

            <!-- Action -->
            <div class="flex items-center justify-end mt-3">
              <Button size="sm" as-child>
                <a
                  :href="resource.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1"
                >
                  Visit
                  <ExternalLink class="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Search, 
  ExternalLink, 
  Play, 
  GraduationCap, 
  FileText, 
  BookOpen
} from 'lucide-vue-next'
import type { Resource } from '~/types/resource'

interface Props {
  resources: Resource[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

// Type icons (Lucide)
const getTypeIcon = (type: string) => {
  const icons = {
    video: Play,
    course: GraduationCap,
    article: FileText,
    documentation: BookOpen
  }
  return icons[type as keyof typeof icons] || FileText
}

// Level variants (design system alignment)
const getLevelVariant = (level: string) => {
  const variants = {
    beginner: 'success',    // green
    intermediate: 'info',   // blue  
    advanced: 'purple'      // purple
  }
  return variants[level as keyof typeof variants] || 'default'
}
</script>