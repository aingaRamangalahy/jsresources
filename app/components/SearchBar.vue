<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Kbd } from '~/components/ui/kbd'

interface Props {
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchInput = ref<InstanceType<typeof Input> | null>(null)

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey) && searchInput.value) {
      e.preventDefault()
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
      <Search
        class="absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors duration-200"
        style="color: var(--color-text-subtle);"
        :class="'group-focus-within:text-[var(--color-accent)]'"
      />
      <Input
        id="search"
        ref="searchInput"
        :model-value="modelValue"
        placeholder="Search by title, author, topic..."
        class="pl-12 pr-24 h-14 text-base font-medium rounded-2xl border-2 border-[var(--color-border)] bg-white shadow-[var(--shadow-clay-sm)] focus-visible:border-[var(--color-accent)] focus-visible:ring-[var(--color-accent)]/15"
        @update:model-value="emit('update:modelValue', String($event))"
      />
      <div class="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
        <Kbd class="text-xs rounded-md border">⌘</Kbd>
        <Kbd class="text-xs rounded-md border">K</Kbd>
      </div>
    </div>
  </div>
</template>
