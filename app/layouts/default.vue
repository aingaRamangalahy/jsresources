<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col" style="color: var(--color-text);">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <footer
      class="mt-auto"
      style="border-top: 2px solid var(--color-border); background-color: rgba(255,255,255,0.55);"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div class="flex items-center gap-2">
            <span class="font-display text-base font-semibold" style="color: var(--color-text);">
              <span
                class="inline-block px-1 rounded"
                style="background-color: var(--color-primary); color: var(--color-on-primary);"
              >js</span>resources
            </span>
          </div>
          <p class="text-sm font-medium sm:text-center" style="color: var(--color-text-muted);">
            Curated JavaScript learning resources — search, filter, learn.
          </p>
          <div class="flex items-center gap-5 text-sm font-semibold" style="color: var(--color-text-subtle);">
            <a
              href="https://github.com/aingaRamangalahy/jsresources"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors cursor-pointer hover:text-[var(--color-accent)]"
            >
              GitHub
            </a>
            <a
              href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors cursor-pointer hover:text-[var(--color-accent)]"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
