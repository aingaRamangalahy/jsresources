<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Kbd } from '~/components/ui/kbd'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchInput = ref<InstanceType<typeof Input> | null>(null)

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Focus search when Ctrl+S is pressed
    if (e.key === 's' && (e.ctrlKey || e.metaKey) && searchInput.value) {
      e.preventDefault()
      console.log('focusing search input', searchInput.value)
      searchInput.value.focus()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>

<template>
  <div class="relative">
    <Label for="search" class="sr-only">Search resources</Label>
    <div class="relative group">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-neutral-500)] group-focus-within:text-[var(--color-primary)] transition-colors" />
      <Input 
        id="search"
        ref="searchInput"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', String($event))"
        placeholder="Search for frameworks, tools, topics..." 
        class="pl-12 pr-14 h-12 text-base bg-[var(--color-neutral-900)] border-[var(--color-neutral-800)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
      />
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <div class="flex items-center gap-1">
          <Kbd class="text-xs">Ctrl</Kbd>
          <span class="text-[var(--color-neutral-500)]">+</span>
          <Kbd class="text-xs">S</Kbd>
        </div>
      </div>
    </div>
  </div>
</template>

