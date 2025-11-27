<script setup lang="ts">
import { listVisualizations } from '~/data/visualizations/registry'
import { ArrowRight, Play, Clock, Layers } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

// Get all available visualizations from registry
const visualizations = listVisualizations()

// Enhanced topic metadata
interface TopicMeta {
  description: string
  longDescription: string
  icon: string
  color: string
  gradient: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  concepts: string[]
}

const topicsMeta: Record<string, TopicMeta> = {
  'event-loop': {
    description: 'Event loop, call stack, and async execution',
    longDescription: 'Understand how JavaScript executes code, handles asynchronous operations, and manages the event loop with call stack, Web APIs, callback queue, and microtask queue.',
    icon: '⚡',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    difficulty: 'Intermediate',
    duration: '10 min',
    concepts: ['Call Stack', 'Event Loop', 'Web APIs', 'Callback Queue', 'Microtasks']
  }
}

// Map visualizations with metadata
const topics = visualizations.map(viz => ({
  ...viz,
  slug: viz.id,
  meta: topicsMeta[viz.id] || {
    description: 'Interactive visualization',
    longDescription: 'Explore this topic through interactive visualizations.',
    icon: '📊',
    color: 'blue',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    difficulty: 'Intermediate',
    duration: '10 min',
    concepts: []
  }
}))

// Upcoming topics
const upcomingTopics = [
  { title: 'Closures & Scope', icon: '🔒', description: 'Lexical scope and closure patterns' },
  { title: 'Prototypes', icon: '🧬', description: 'Inheritance and prototype chain' },
  { title: 'Async/Await', icon: '⏳', description: 'Modern async patterns' },
  { title: 'Promises', icon: '🤝', description: 'Promise chains and error handling' },
]

// SEO
useHead({
  title: 'Interactive Visualizations - JSResources',
  meta: [
    { name: 'description', content: 'Learn JavaScript concepts through interactive canvas visualizations. Explore the event loop, closures, prototypes, and more.' }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <!-- Header Section -->
    <section class="relative overflow-hidden border-b border-[var(--color-neutral-800)]/50">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="text-center">
          <p class="text-xs font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Interactive Learning
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-neutral-50)] mb-4">
            Visualizations
          </h1>
          <p class="text-lg text-[var(--color-neutral-400)] max-w-2xl mx-auto">
            Click, pan, and zoom through interactive diagrams that make complex JavaScript concepts crystal clear.
          </p>
        </div>
      </div>
    </section>

    <!-- Available Topics -->
    <section class="py-12 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">
            Available Topics
          </h2>
          <p class="text-sm text-[var(--color-neutral-400)]">
            Select a topic to start exploring
          </p>
        </div>
        
        <div class="space-y-4">
          <NuxtLink
            v-for="topic in topics"
            :key="topic.slug"
            :to="`/visualize/${topic.slug}`"
            class="group block relative rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)]/50 overflow-hidden hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300"
          >
            <!-- Gradient background on hover -->
            <div :class="['absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300', topic.meta.gradient]"></div>
            
            <div class="relative p-6 sm:p-8">
              <div class="flex flex-col lg:flex-row lg:items-center gap-6">
                <!-- Icon -->
                <div class="flex-shrink-0">
                  <div class="size-16 rounded-xl bg-[var(--color-neutral-800)] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {{ topic.meta.icon }}
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h3 class="text-xl sm:text-2xl font-semibold text-[var(--color-neutral-50)] group-hover:text-[var(--color-primary)] transition-colors">
                      {{ topic.title }}
                    </h3>
                    
                    <!-- Badges -->
                    <div class="flex items-center gap-2">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-neutral-800)] text-xs text-[var(--color-neutral-400)]">
                        <Layers class="size-3" />
                        {{ topic.meta.difficulty }}
                      </span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-neutral-800)] text-xs text-[var(--color-neutral-400)]">
                        <Clock class="size-3" />
                        {{ topic.meta.duration }}
                      </span>
                    </div>
                  </div>
                  
                  <p class="text-[var(--color-neutral-400)] mb-4 line-clamp-2">
                    {{ topic.meta.longDescription }}
                  </p>
                  
                  <!-- Concept tags -->
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="concept in topic.meta.concepts" 
                      :key="concept"
                      class="px-2.5 py-1 rounded-md bg-[var(--color-neutral-800)]/50 text-xs text-[var(--color-neutral-300)] border border-[var(--color-neutral-700)]/50"
                    >
                      {{ concept }}
                    </span>
                  </div>
                </div>
                
                <!-- Arrow -->
                <div class="flex-shrink-0 hidden sm:flex items-center">
                  <div class="size-12 rounded-full border border-[var(--color-neutral-700)] flex items-center justify-center group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 transition-all duration-300">
                    <ArrowRight class="size-5 text-[var(--color-neutral-400)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-12 sm:py-16 border-t border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">
            Coming Soon
          </h2>
          <p class="text-sm text-[var(--color-neutral-400)]">
            More interactive visualizations in development
          </p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="topic in upcomingTopics"
            :key="topic.title"
            class="p-5 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)]/30 opacity-60"
          >
            <div class="text-2xl mb-3">{{ topic.icon }}</div>
            <h3 class="font-medium text-[var(--color-neutral-300)] mb-1">
              {{ topic.title }}
            </h3>
            <p class="text-xs text-[var(--color-neutral-500)]">
              {{ topic.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-12 sm:py-16 border-t border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">
            How It Works
          </h2>
          <p class="text-sm text-[var(--color-neutral-400)]">
            Simple steps to start learning
          </p>
        </div>
        
        <div class="grid sm:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="size-12 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-4">
              <span class="text-lg font-bold text-[var(--color-primary)]">1</span>
            </div>
            <h3 class="font-medium text-[var(--color-neutral-200)] mb-2">Select a Topic</h3>
            <p class="text-sm text-[var(--color-neutral-500)]">
              Choose from available visualizations above
            </p>
          </div>
          
          <div class="text-center">
            <div class="size-12 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-4">
              <span class="text-lg font-bold text-[var(--color-primary)]">2</span>
            </div>
            <h3 class="font-medium text-[var(--color-neutral-200)] mb-2">Explore the Canvas</h3>
            <p class="text-sm text-[var(--color-neutral-500)]">
              Pan, zoom, and interact with components
            </p>
          </div>
          
          <div class="text-center">
            <div class="size-12 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-4">
              <span class="text-lg font-bold text-[var(--color-primary)]">3</span>
            </div>
            <h3 class="font-medium text-[var(--color-neutral-200)] mb-2">Learn by Clicking</h3>
            <p class="text-sm text-[var(--color-neutral-500)]">
              Click any element for detailed explanations
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
