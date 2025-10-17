<script setup lang="ts">
import type { Resource } from '~/types/resource'
import { 
  PlayCircle, 
  GraduationCap, 
  FileText, 
  BookOpen,
  ExternalLink,
} from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'

interface Props {
  resource: Resource
}

defineProps<Props>()

// Type icons (Lucide)
const typeIcons: Record<string, any> = {
  video: PlayCircle,
  course: GraduationCap,
  article: FileText,
  documentation: BookOpen
}

// Level color classes with opacity
const levelClasses: Record<string, string> = {
  beginner: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  intermediate: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20',
  advanced: 'bg-[var(--color-purple)]/10 text-[var(--color-purple)] border-[var(--color-purple)]/20'
}

// Helper functions
const getTypeIcon = (type: string) => typeIcons[type] || FileText
const getLevelClasses = (level: string) => levelClasses[level] || 'bg-[var(--color-neutral-800)] text-[var(--color-neutral-300)] border-[var(--color-neutral-700)]'
</script>

<template>
  <a
    :href="resource.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block"
  >
    <Card class="border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)] gap-3">
      <CardHeader class="px-5">
        <div class="flex items-start gap-4">
          <!-- Icon with Gradient Background - Animated on Hover -->
          <div class="shrink-0 p-3 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-neutral-800)] to-[var(--color-neutral-900)] group-hover:from-[var(--color-primary)]/10 group-hover:to-[var(--color-info)]/10 transition-all duration-300">
            <component :is="getTypeIcon(resource.type)" class="size-6 text-[var(--color-neutral-400)] group-hover:text-[var(--color-primary)] transition-colors duration-300" />
          </div>

          <!-- Title & Author -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <CardTitle class="text-lg text-[var(--color-neutral-100)]  line-clamp-1">
                {{ resource.title }}
              </CardTitle>
              <ExternalLink class="size-4 text-[var(--color-neutral-600)] opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
            </div>
            <CardDescription class="text-[var(--color-neutral-500)] mt-1">
              {{ resource.author }} • {{ resource.platform }}
            </CardDescription>
          </div>

          <!-- Badges in CardAction slot -->
          <CardAction class="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              :class="['text-xs capitalize border', getLevelClasses(resource.level)]"
            >
              {{ resource.level }}
            </Badge>
            <Badge variant="secondary" class="text-xs uppercase">
              {{ resource.price }}
            </Badge>
          </CardAction>
        </div>
      </CardHeader>

      <CardContent class="px-5 space-y-3">
        <!-- Description -->
        <p class="text-sm text-[var(--color-neutral-400)] line-clamp-2">
          {{ resource.description }}
        </p>

        <!-- Topics -->
        <div class="flex flex-wrap gap-1.5">
          <Badge 
            v-for="topic in resource.topics.slice(0, 6)" 
            :key="topic"
            variant="secondary"
            class="text-xs capitalize px-2 py-0.5"
          >
            {{ topic }}
          </Badge>
          <Badge v-if="resource.topics.length > 6" variant="secondary" class="text-xs px-2 py-0.5">
            +{{ resource.topics.length - 6 }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </a>
</template>

