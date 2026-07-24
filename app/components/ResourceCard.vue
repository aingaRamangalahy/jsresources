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
  Library,
} from 'lucide-vue-next'

interface Props {
  resource: Resource
  view?: 'list' | 'card'
}

const props = withDefaults(defineProps<Props>(), {
  view: 'list',
})

const typeIcons: Record<string, object> = {
  video: PlayCircle,
  course: GraduationCap,
  article: FileText,
  book: BookOpen,
  tutorial: NotebookPen,
  github: Github,
  website: Globe,
  documentation: Library,
}

const typeStyles: Record<string, { color: string, bg: string }> = {
  video: { color: '#9F1239', bg: 'rgba(159,18,57,0.08)' },
  course: { color: '#8A7418', bg: 'rgba(212,180,58,0.16)' },
  article: { color: '#0F766E', bg: 'rgba(15,118,110,0.1)' },
  book: { color: '#3F7D4E', bg: 'rgba(63,125,78,0.1)' },
  tutorial: { color: '#0D9488', bg: 'rgba(13,148,136,0.1)' },
  github: { color: '#57534E', bg: 'rgba(87,83,78,0.08)' },
  website: { color: '#A16207', bg: 'rgba(212,180,58,0.14)' },
  documentation: { color: '#6B6B66', bg: 'rgba(107,107,102,0.1)' },
}

const levelStyles: Record<string, string> = {
  beginner: 'background-color: rgba(63,125,78,0.1); color: #3F7D4E; border-color: rgba(63,125,78,0.2);',
  intermediate: 'background-color: rgba(212,180,58,0.18); color: #8A7418; border-color: rgba(184,154,46,0.3);',
  advanced: 'background-color: rgba(15,118,110,0.1); color: #0F766E; border-color: rgba(15,118,110,0.2);',
}

const priceStyles: Record<string, string> = {
  free: 'background-color: rgba(63,125,78,0.1); color: #3F7D4E; border-color: rgba(63,125,78,0.2);',
  paid: 'background-color: rgba(161,98,7,0.1); color: #A16207; border-color: rgba(161,98,7,0.2);',
}

const getTypeIcon = (type: string) => typeIcons[type] || FileText
const getTypeStyle = (type: string) => typeStyles[type] || typeStyles.article

const isCard = computed(() => props.view === 'card')
</script>

<template>
  <a
    :href="resource.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group clay-surface clay-press relative cursor-pointer h-full"
    :class="isCard ? 'flex flex-col p-5' : 'block p-5'"
  >
    <ExternalLink
      class="absolute top-4 right-4 size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style="color: var(--color-accent);"
    />

    <!-- Card view -->
    <template v-if="isCard">
      <div
        class="mb-4 inline-flex self-start p-3 rounded-2xl border-2"
        :style="`background-color: ${getTypeStyle(resource.type).bg}; border-color: ${getTypeStyle(resource.type).color}33;`"
      >
        <component
          :is="getTypeIcon(resource.type)"
          class="size-6"
          :style="`color: ${getTypeStyle(resource.type).color};`"
        />
      </div>

      <h3 class="font-display text-lg font-semibold mb-1 leading-snug pr-6" style="color: var(--color-text);">
        {{ resource.title }}
      </h3>

      <p class="text-sm font-medium mb-3" style="color: var(--color-text-subtle);">
        {{ resource.author }} · {{ resource.platform }}
      </p>

      <p
        v-if="resource.description"
        class="text-sm mb-4 line-clamp-3 flex-1"
        style="color: var(--color-text-muted);"
      >
        {{ resource.description }}
      </p>

      <div class="mt-auto flex flex-wrap items-center gap-1.5">
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold capitalize border-2"
          :style="priceStyles[resource.price]"
        >
          {{ resource.price }}
        </span>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold capitalize border-2"
          :style="levelStyles[resource.level]"
        >
          {{ resource.level }}
        </span>
        <span
          v-for="topic in resource.topics.slice(0, 2)"
          :key="topic"
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize border-2"
          style="background-color: var(--color-primary-soft); color: #8A7418; border-color: var(--color-border);"
        >
          {{ topic }}
        </span>
      </div>
    </template>

    <!-- List view -->
    <div v-else class="flex items-start gap-4">
      <div
        class="shrink-0 p-3 rounded-2xl border-2"
        :style="`background-color: ${getTypeStyle(resource.type).bg}; border-color: ${getTypeStyle(resource.type).color}33;`"
      >
        <component
          :is="getTypeIcon(resource.type)"
          class="size-5"
          :style="`color: ${getTypeStyle(resource.type).color};`"
        />
      </div>

      <div class="flex-1 min-w-0 pr-4">
        <h3 class="font-display text-lg font-semibold mb-0.5 leading-snug" style="color: var(--color-text);">
          {{ resource.title }}
        </h3>

        <p class="text-sm font-medium mb-3" style="color: var(--color-text-subtle);">
          {{ resource.author }} · {{ resource.platform }}
        </p>

        <p
          v-if="resource.description"
          class="text-sm mb-3 line-clamp-2"
          style="color: var(--color-text-muted);"
        >
          {{ resource.description }}
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
            :style="priceStyles[resource.price]"
          >
            {{ resource.price }}
          </span>
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
            :style="levelStyles[resource.level]"
          >
            {{ resource.level }}
          </span>
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border-2"
            style="background-color: var(--color-surface-soft); color: var(--color-text-muted); border-color: var(--color-border);"
          >
            {{ resource.type }}
          </span>
          <span
            v-for="topic in resource.topics.slice(0, 3)"
            :key="topic"
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border-2"
            style="background-color: var(--color-primary-soft); color: #8A7418; border-color: var(--color-border);"
          >
            {{ topic }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
