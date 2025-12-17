<script setup lang="ts">
// App root component
// Force dark mode
useHead({
  htmlAttrs: {
    class: 'dark'
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

