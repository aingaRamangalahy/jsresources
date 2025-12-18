<script setup lang="ts">
import type { Resource } from '~/types/resource'
import { 
  PlayCircle, 
  GraduationCap, 
  FileText, 
  BookOpen,
  ExternalLink,
  Github,
  Globe,
  NotebookPen,
} from 'lucide-vue-next'
import { Badge } from '~/components/ui/badge'

interface Props {
  resource: Resource
}

const props = defineProps<Props>()

// Type icons (Lucide)
const typeIcons: Record<string, any> = {
  video: PlayCircle,
  course: GraduationCap,
  article: FileText,
  book: BookOpen,
  tutorial: NotebookPen,
  github: Github,
  website: Globe,
}

// Color schemes based on resource type
const typeColorMap: Record<string, { text: string; iconBg: string }> = {
  video: {
    text: 'text-rose-400',
    iconBg: 'bg-rose-500/10 group-hover:bg-rose-500/20',
  },
  course: {
    text: 'text-violet-400',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
  },
  article: {
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
  },
  book: {
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
  },
  tutorial: {
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
  },
  github: {
    text: 'text-neutral-300',
    iconBg: 'bg-neutral-500/10 group-hover:bg-neutral-500/20',
  },
  website: {
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
  },
}

// Get color classes based on resource type
const colorClasses = computed(() => {
  return typeColorMap[props.resource.type] || typeColorMap.article
})

// Level badge classes
const levelClasses: Record<string, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  advanced: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
}

// Helper functions
const getTypeIcon = (type: string) => typeIcons[type] || FileText
const getLevelClasses = (level: string) => levelClasses[level] || 'bg-neutral-800 text-neutral-300 border-neutral-700'
</script>

<template>
  <!-- Resource Card -->
  <a
    :href="resource.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative block p-5 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)] hover:border-[var(--color-neutral-700)] transition-all duration-200"
  >
    <!-- Link icon in top right (shown on hover) -->
    <ExternalLink 
      class="absolute top-4 right-4 size-5 text-[var(--color-neutral-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
    />
    
    <div class="flex items-start gap-4">
      <!-- Icon -->
      <div 
        :class="[
          'shrink-0 p-3 rounded-lg transition-all duration-200',
          colorClasses.iconBg
        ]"
      >
        <component 
          :is="getTypeIcon(resource.type)" 
          :class="['size-6 transition-colors duration-200', colorClasses.text]"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h3 
          class="text-lg font-semibold line-clamp-1 group-hover:translate-x-0.5 transition-transform mb-1 text-[var(--color-neutral-50)]"
        >
          {{ resource.title }}
        </h3>
        
        <!-- Author & Platform -->
        <p class="text-sm text-[var(--color-neutral-500)] mb-2">
          {{ resource.author }} • {{ resource.platform }}
        </p>
        
        <!-- Description -->
        <p class="text-sm text-[var(--color-neutral-400)] line-clamp-2 mb-3">
          {{ resource.description }}
        </p>

        <!-- Bottom row: Topics + Badges -->
        <div class="flex items-center justify-between gap-4">
          <!-- Topics -->
          <div class="flex flex-wrap gap-1.5 flex-1 min-w-0">
            <Badge 
              v-for="topic in resource.topics.slice(0, 4)" 
              :key="topic"
              variant="secondary"
              class="text-xs capitalize px-2 py-0.5 bg-[var(--color-neutral-800)]/50 text-[var(--color-neutral-400)] border-[var(--color-neutral-700)]/50"
            >
              {{ topic }}
            </Badge>
            <Badge 
              v-if="resource.topics.length > 4" 
              variant="secondary" 
              class="text-xs px-2 py-0.5 bg-[var(--color-neutral-800)]/50 text-[var(--color-neutral-400)] border-[var(--color-neutral-700)]/50"
            >
              +{{ resource.topics.length - 4 }}
            </Badge>
          </div>

          <!-- Badges -->
          <div class="flex items-center gap-2 shrink-0">
            <Badge 
              variant="secondary" 
              :class="['text-xs capitalize border', getLevelClasses(resource.level)]"
            >
              {{ resource.level }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
