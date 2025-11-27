<script setup lang="ts">
import { Github, Plus, GitPullRequest, Eye, BookOpen, Menu, X, Home } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

const route = useRoute()
const isDialogOpen = ref(false)
const isMobileMenuOpen = ref(false)

// Navigation links
const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/visualize', label: 'Visualize', icon: Eye },
  { to: '/resources', label: 'Resources', icon: BookOpen },
]

// Check if link is active
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <header class="border-b border-[var(--color-neutral-800)]/50 backdrop-blur-md sticky top-0 z-50 bg-[var(--color-neutral-950)]/90">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md"
        >
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-info)] rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img src="/icon_2.svg" alt="JS Resources" class="size-8 relative" />
          </div>
          <span class="text-xl font-bold text-[var(--color-neutral-50)] group-hover:text-[var(--color-primary)] transition-colors">
            jsresources
          </span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive(link.to) 
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' 
                : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-800)]/50'
            ]"
          >
            <component :is="link.icon" class="size-4" />
            {{ link.label }}
          </NuxtLink>
        </nav>
        
        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Submit Resource Dialog -->
          <Dialog v-model:open="isDialogOpen">
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="hidden sm:inline-flex text-xs"
              >
                <Plus class="size-3 mr-1.5" />
                Submit Resource
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                  <GitPullRequest class="size-5 text-[var(--color-primary)]" />
                  Contribute a Resource
                </DialogTitle>
                <DialogDescription class="pt-3 space-y-3">
                  <p>
                    Thank you for wanting to contribute! To submit a new learning resource to JS Resources, you'll need to create a Pull Request to our GitHub repository.
                  </p>
                  <p class="text-sm">
                    Our contributing guide will walk you through:
                  </p>
                  <ul class="text-sm space-y-1 ml-4 list-disc">
                    <li>How to fork the repository</li>
                    <li>Creating a resource markdown file</li>
                    <li>Submitting your Pull Request</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="sm:justify-end">
                <Button
                  as="a"
                  href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md#adding-resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="isDialogOpen = false"
                >
                  View Contributing Guide
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <!-- GitHub Link -->
          <a
            href="https://github.com/aingaRamangalahy/jsresources/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--color-neutral-400)] hover:text-[var(--color-primary)] transition-colors p-2 rounded-lg hover:bg-[var(--color-neutral-800)]/50"
            aria-label="View on GitHub"
          >
            <Github class="size-5" />
          </a>
          
          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-800)]/50 transition-colors"
            aria-label="Toggle menu"
          >
            <X v-if="isMobileMenuOpen" class="size-5" />
            <Menu v-else class="size-5" />
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-[var(--color-neutral-800)]/50">
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              :class="[
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(link.to) 
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' 
                  : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-800)]/50'
              ]"
            >
              <component :is="link.icon" class="size-5" />
              {{ link.label }}
            </NuxtLink>
            
            <div class="pt-3 mt-2 border-t border-[var(--color-neutral-800)]/50">
              <Button
                as="a"
                href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md#adding-resources"
                target="_blank"
                variant="outline"
                class="w-full justify-center"
              >
                <Plus class="size-4 mr-2" />
                Submit a Resource
              </Button>
            </div>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
