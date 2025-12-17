<script setup lang="ts">
import { AlertTriangle, Home } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-neutral-950)] flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <AlertTriangle class="w-20 h-20 text-[var(--color-warning)] mx-auto mb-4" />
        <h1 class="text-4xl font-bold text-[var(--color-neutral-100)] mb-2">
          {{ error?.statusCode || 'Error' }}
        </h1>
        <p class="text-lg text-[var(--color-neutral-400)] mb-8">
          {{ error?.message || 'Something went wrong' }}
        </p>
      </div>
      
      <Button
        size="lg"
        @click="handleError"
        class="gap-2"
      >
        <Home class="size-4" />
        Back to Home
      </Button>
    </div>
  </div>
</template>

