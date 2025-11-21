<script setup lang="ts">
const topics = [
  {
    title: 'JavaScript Runtime',
    slug: 'javascript-runtime',
    description: 'Understand how JavaScript runtime works',
  },
]
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto space-y-6">
    <header class="text-center space-y-3">
      <p class="text-xs font-semibold tracking-widest text-[var(--color-primary)] uppercase">
        Visualize
      </p>
      <h1 class="text-3xl font-bold text-[var(--color-neutral-50)]">
        Interactive Explanations
      </h1>
      <p class="text-sm text-[var(--color-neutral-400)]">
        Pick a topic to explore detailed visuals that demystify JavaScript internals.
      </p>
    </header>

    <div class="grid gap-4">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.slug"
        :to="`/visualize/${topic.slug}`"
        class="block p-5 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-950)] hover:border-[var(--color-primary)] hover:-translate-y-0.5 transition-all"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-[var(--color-neutral-50)]">
              {{ topic.title }}
            </h2>
            <p class="mt-1 text-sm text-[var(--color-neutral-400)]">
              {{ topic.description }}
            </p>
          </div>
          <span class="text-sm font-medium text-[var(--color-primary)]">
            Explore →
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

