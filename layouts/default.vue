<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[var(--color-neutral-950)]">
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <footer class="border-t border-[var(--color-neutral-800)]/50 mt-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-[var(--color-neutral-600)]">
          curated with love for the JavaScript community
        </p>
      </div>
    </footer>
  </div>
</template>