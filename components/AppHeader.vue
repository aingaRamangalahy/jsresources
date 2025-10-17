<script setup lang="ts">
// No props needed - purely presentational
</script>

<template>
  <header class="border-b-[0.5px] border-gray-700 backdrop-blur-sm sticky top-0 z-10 bg-[var(--color-neutral-950)]/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div class="flex flex-col items-center justify-center gap-1">
        <!-- Logo & Title - Centered -->
        <div class="flex items-center justify-center gap-0">
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-[var(--color-neutral-100)] to-[var(--color-neutral-400)] bg-clip-text text-transparent">
              jsresources
            </h1>
          </div>
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-info)] rounded-lg blur opacity-25"></div>
            <img src="/icon_2.svg" alt="JS Resources" class="size-10 relative" />
          </div>
        </div>
        <!-- Subtitle -->
        <p class="text-xs text-[var(--color-neutral-500)]">
          learning resources for javascript developers
        </p>
      </div>
    </div>
  </header>
</template>

