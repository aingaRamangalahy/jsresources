<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[var(--color-neutral-950)] flex flex-col">
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="border-t border-[var(--color-neutral-800)]/50 mt-auto">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <img src="/icon_2.svg" alt="JS Resources" class="size-6 opacity-50" />
            <span class="text-sm text-[var(--color-neutral-500)]">
              jsresources
            </span>
          </div>
          <p class="text-center text-sm text-[var(--color-neutral-600)]">
            Curated with ❤️ for the JavaScript community
          </p>
          <div class="flex items-center gap-4 text-sm text-[var(--color-neutral-500)]">
            <a 
              href="https://github.com/aingaRamangalahy/jsresources" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-[var(--color-neutral-300)] transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-[var(--color-neutral-300)] transition-colors"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
