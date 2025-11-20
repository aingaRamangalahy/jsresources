<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { codeToHtml } from 'shiki'

interface Props {
  code: string
  language?: string
  currentLineNumber?: number
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
  currentLineNumber: 0
})

const highlightedCode = ref<string>('')

// Split code into lines
const codeLines = computed(() => {
  if (!highlightedCode.value) return []
  
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = highlightedCode.value
  
  // Try to get the actual code content
  // Shiki with 'inline' structure might return just the span-wrapped code
  const codeElement = tempDiv.querySelector('code') || tempDiv.querySelector('pre')
  const textContent = codeElement ? codeElement.innerHTML : highlightedCode.value
  
  // Split by newlines
  const lines = textContent.split('\n')
  
  // Remove empty last line if present
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }
  
  return lines
})

// Highlight code using Shiki
const highlightCode = async () => {
  if (!props.code) return
  
  try {
    const html = await codeToHtml(props.code, {
      lang: props.language,
      theme: 'github-dark'
    })
    
    highlightedCode.value = html
  } catch (error) {
    console.error('Failed to highlight code:', error)
    // Fallback to plain code
    highlightedCode.value = `<pre><code>${props.code}</code></pre>`
  }
}

// Watch for code changes
watch(() => props.code, highlightCode, { immediate: true })
watch(() => props.language, highlightCode)
</script>

<template>
  <div class="relative h-full flex flex-col">
    <!-- Code container -->
    <div class="flex-1 overflow-auto bg-muted/30 rounded-lg border">
      <div class="relative p-6">
        <!-- Highlighted code -->
        <div
          v-if="highlightedCode"
          class="relative font-mono text-sm"
        >
          <div
            v-for="(line, index) in codeLines"
            :key="index"
            class="relative code-line"
            :class="{
              'highlighted-line': currentLineNumber === index + 1,
              'bg-primary/10 border-l-4 border-primary -ml-2 pl-2': currentLineNumber === index + 1
            }"
          >
            <span class="line-number select-none text-muted-foreground/50 inline-block w-8 text-right mr-4">
              {{ index + 1 }}
            </span>
            <span v-html="line" class="inline-block"></span>
          </div>
        </div>

        <!-- Loading state -->
        <div v-else class="flex items-center justify-center h-32">
          <div class="text-muted-foreground">Loading code...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-line {
  line-height: 1.7;
  transition: all 0.2s ease;
  padding: 2px 0;
}

.highlighted-line {
  animation: highlight-pulse 0.5s ease-in-out;
}

@keyframes highlight-pulse {
  0% {
    background-color: hsl(var(--primary) / 0);
  }
  50% {
    background-color: hsl(var(--primary) / 0.2);
  }
  100% {
    background-color: hsl(var(--primary) / 0.1);
  }
}

/* Override Shiki styles if needed */
:deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
}

:deep(code) {
  background: transparent !important;
  padding: 0;
}
</style>

