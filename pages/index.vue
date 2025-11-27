<script setup lang="ts">
import { listVisualizations } from '~/data/visualizations/registry'
import { ArrowRight, Play, BookOpen, Sparkles, Layers, MousePointer2, Eye } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

// Get visualizations for featured section
const visualizations = listVisualizations()

// Topic metadata with icons and descriptions
const topicsMeta: Record<string, { description: string; color: string; icon: string }> = {
  'event-loop': {
    description: 'Event loop, call stack, Web APIs, and async execution',
    color: 'from-emerald-500 to-teal-500',
    icon: '⚡'
  }
}

// Features list
const features = [
  {
    icon: Layers,
    title: 'Interactive Canvas',
    description: 'Explore concepts through pan, zoom, and click interactions on beautiful visualizations'
  },
  {
    icon: MousePointer2,
    title: 'Click to Learn',
    description: 'Select any component to see detailed explanations with code examples'
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    description: 'Browse our collection of hand-picked JavaScript learning materials'
  }
]

// SEO
useHead({
  title: 'JSResources - Interactive JavaScript Learning',
  meta: [
    { name: 'description', content: 'Learn JavaScript concepts through interactive visualizations and curated resources. Understand the event loop, async patterns, and more.' }
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
      
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <!-- Badge -->
        <div class="flex justify-center mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm text-[var(--color-primary)]">
            <Sparkles class="size-4" />
            <span class="font-medium">Learn by Visualizing</span>
          </div>
        </div>
        
        <!-- Main heading -->
        <h1 class="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span class="text-[var(--color-neutral-50)]">Understand JavaScript</span>
          <br />
          <span class="bg-gradient-to-r from-[var(--color-primary)] via-amber-400 to-[var(--color-info)] bg-clip-text text-transparent">
            Through Interactive Visuals
          </span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-center text-lg sm:text-xl text-[var(--color-neutral-400)] max-w-2xl mx-auto mb-10">
          Explore complex JavaScript concepts like the event loop, closures, and async patterns 
          through beautiful, interactive canvas visualizations.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/visualize">
            <Button size="lg" class="gap-2 text-base shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 transition-shadow">
              <Eye class="size-5" />
              Explore Visualizations
              <ArrowRight class="size-4" />
            </Button>
          </NuxtLink>
          <NuxtLink to="/resources">
            <Button variant="outline" size="lg" class="gap-2 text-base">
              <BookOpen class="size-5" />
              Browse Resources
            </Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Visualization Preview -->
    <section class="relative py-16 sm:py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-12">
          <p class="text-xs font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Featured Topic
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)]">
            JavaScript Event Loop
          </h2>
        </div>
        
        <!-- Preview card -->
        <NuxtLink 
          to="/visualize/event-loop"
          class="group block relative rounded-2xl border border-[var(--color-neutral-800)] bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-950)] overflow-hidden hover:border-[var(--color-primary)]/50 transition-all duration-300"
        >
          <!-- Glow effect on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative p-6 sm:p-8">
            <div class="flex flex-col lg:flex-row gap-8 items-center">
              <!-- Left: Description -->
              <div class="flex-1 space-y-4">
                <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                  <span>⚡</span>
                  <span>Interactive</span>
                </div>
                
                <h3 class="text-xl sm:text-2xl font-semibold text-[var(--color-neutral-50)] group-hover:text-[var(--color-primary)] transition-colors">
                  Event Loop & Async JavaScript
                </h3>
                
                <p class="text-[var(--color-neutral-400)] leading-relaxed">
                  Understand how JavaScript executes code with the event loop, call stack, Web APIs, 
                  callback queue, and microtask queue. Click on any component to learn more.
                </p>
                
                <ul class="space-y-2 text-sm text-[var(--color-neutral-400)]">
                  <li class="flex items-center gap-2">
                    <span class="size-1.5 rounded-full bg-emerald-500"></span>
                    Call Stack (LIFO execution)
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="size-1.5 rounded-full bg-red-500"></span>
                    Web APIs (setTimeout, fetch, DOM)
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="size-1.5 rounded-full bg-amber-500"></span>
                    Callback & Microtask Queues
                  </li>
                </ul>
                
                <div class="pt-2">
                  <span class="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium group-hover:gap-3 transition-all">
                    Start Exploring
                    <ArrowRight class="size-4" />
                  </span>
                </div>
              </div>
              
              <!-- Right: Visual preview -->
              <div class="flex-shrink-0 w-full lg:w-[320px] aspect-[4/3] rounded-xl bg-[var(--color-neutral-950)] border border-[var(--color-neutral-800)] p-4 flex items-center justify-center group-hover:border-[var(--color-neutral-700)] transition-colors">
                <!-- Simplified visual representation -->
                <div class="w-full h-full grid grid-cols-2 gap-3 text-xs">
                  <!-- Call Stack -->
                  <div class="rounded-lg border-2 border-emerald-500/30 bg-emerald-500/5 p-2 flex flex-col">
                    <span class="text-emerald-400 font-medium mb-2 text-[10px]">Call Stack</span>
                    <div class="flex-1 flex flex-col gap-1">
                      <div class="rounded bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 text-center text-emerald-300 text-[9px]">fn3()</div>
                      <div class="rounded bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 text-center text-emerald-300 text-[9px]">fn2()</div>
                      <div class="rounded bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 text-center text-emerald-300 text-[9px]">fn1()</div>
                    </div>
                  </div>
                  
                  <!-- Web APIs -->
                  <div class="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-2">
                    <span class="text-red-400 font-medium text-[10px]">Web APIs</span>
                    <div class="mt-1 space-y-1">
                      <div class="px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 text-[9px]">setTimeout</div>
                      <div class="px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 text-[9px]">fetch</div>
                    </div>
                  </div>

                  <!-- Event Loop -->
                  <div class="rounded-lg border-2 border-indigo-500/30 bg-indigo-500/5 p-2 flex items-center justify-center">
                    <span class="text-indigo-400 font-medium text-[10px]">Event Loop ♻️</span>
                  </div>
                  
                  <!-- Queues -->
                  <div class="rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-2">
                    <span class="text-amber-400 font-medium text-[10px]">Callback Queue</span>
                    <div class="mt-1 flex gap-1">
                      <div class="px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px]">cb1</div>
                      <div class="px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px]">cb2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 sm:py-20 border-t border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)] mb-4">
            Why Visual Learning?
          </h2>
          <p class="text-[var(--color-neutral-400)] max-w-xl mx-auto">
            Complex concepts become clear when you can see and interact with them.
          </p>
        </div>
        
        <div class="grid sm:grid-cols-3 gap-6">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="p-6 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-900)]/50 hover:border-[var(--color-neutral-700)] transition-colors"
          >
            <div class="size-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
              <component :is="feature.icon" class="size-6 text-[var(--color-primary)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--color-neutral-50)] mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-[var(--color-neutral-400)] leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon / More Topics -->
    <section class="py-16 sm:py-20 border-t border-[var(--color-neutral-800)]/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-xs font-semibold tracking-widest text-[var(--color-neutral-500)] uppercase mb-3">
          Coming Soon
        </p>
        <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)] mb-4">
          More Topics on the Way
        </h2>
        <p class="text-[var(--color-neutral-400)] max-w-xl mx-auto mb-8">
          We're building interactive visualizations for closures, prototypes, async/await, promises, and more.
        </p>
        
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-4 py-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] text-sm text-[var(--color-neutral-400)]">
            Closures & Scope
          </span>
          <span class="px-4 py-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] text-sm text-[var(--color-neutral-400)]">
            Prototypes & Inheritance
          </span>
          <span class="px-4 py-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] text-sm text-[var(--color-neutral-400)]">
            Async/Await Flow
          </span>
          <span class="px-4 py-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] text-sm text-[var(--color-neutral-400)]">
            Promise Chains
          </span>
          <span class="px-4 py-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] text-sm text-[var(--color-neutral-400)]">
            this Keyword
          </span>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-2xl border border-[var(--color-neutral-800)] bg-gradient-to-br from-[var(--color-neutral-900)] via-[var(--color-neutral-900)] to-[var(--color-primary)]/5 p-8 sm:p-12 text-center overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-50)] mb-4">
              Ready to Learn?
            </h2>
            <p class="text-[var(--color-neutral-400)] mb-8 max-w-lg mx-auto">
              Start with the JavaScript Runtime visualization and discover how async JavaScript really works.
            </p>
            <NuxtLink to="/visualize/event-loop">
              <Button size="lg" class="gap-2 text-base">
                <Play class="size-5" />
                Start Learning
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
