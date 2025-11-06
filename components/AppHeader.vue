<script setup lang="ts">
import { Github, Plus, GitPullRequest } from 'lucide-vue-next'
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

const isDialogOpen = ref(false)
</script>

<template>
  <header class="border-b-[0.5px] border-gray-700 backdrop-blur-sm sticky top-0 z-10 bg-[var(--color-neutral-950)]/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div class="flex items-center justify-between">
        <!-- Spacer for balance -->
        <div class="flex-1"></div>
        
        <!-- Logo & Title - Centered -->
        <div class="flex-1 flex flex-col items-center justify-center gap-1">
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
          <p class="text-xs">
            Learning resources for javascript developers
          </p>
        </div>
        
        <!-- Actions - Right side -->
        <div class="flex-1 flex justify-end items-center gap-3">
          <Dialog v-model:open="isDialogOpen">
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="text-xs"
              >
                <Plus class="size-3 mr-1.5" />
                Submit a Resource
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
          <a
            href="https://github.com/aingaRamangalahy/jsresources/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--color-neutral-400)] hover:text-[var(--color-primary)] transition-colors duration-300"
            aria-label="View on GitHub"
          >
            <Github class="size-5" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

