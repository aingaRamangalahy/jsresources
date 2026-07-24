<script setup lang="ts">
import { Github, Plus, GitPullRequest, Menu, X } from 'lucide-vue-next'

const isDialogOpen = ref(false)
const isMobileMenuOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <header
    class="sticky top-0 z-50"
    style="
      background-color: rgba(247, 246, 242, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 2px solid var(--color-border);
    "
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-[4.25rem]">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xl"
        >
          <span
            class="font-display text-xl sm:text-2xl font-semibold tracking-tight"
            style="color: var(--color-text);"
          >
            <span
              class="inline-block px-1.5 rounded-md"
              style="background-color: var(--color-primary); color: var(--color-on-primary);"
            >js</span>resources
          </span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <Dialog v-model:open="isDialogOpen">
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="hidden sm:inline-flex"
              >
                <Plus class="size-3.5" />
                Contribute
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md rounded-2xl border-2 border-[var(--color-border)]">
              <DialogHeader>
                <DialogTitle class="font-display flex items-center gap-2 text-xl">
                  <GitPullRequest class="size-5 text-[var(--color-primary)]" />
                  Add a resource
                </DialogTitle>
                <DialogDescription class="pt-3 space-y-3 text-[var(--color-text-muted)]">
                  <p>
                    Help grow the catalog. Suggest a learning resource via a Pull Request.
                  </p>
                  <ul class="text-sm space-y-1.5 ml-4 list-disc">
                    <li>Title, author, platform, and URL</li>
                    <li>Type, level, topics, language, and price</li>
                    <li>Why it belongs in the catalog</li>
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
            class="p-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:bg-[var(--color-surface)] border-2 border-transparent hover:border-[var(--color-border)]"
            style="color: var(--color-text-muted);"
            aria-label="View on GitHub"
          >
            <Github class="size-5" />
          </a>

          <button
            type="button"
            class="sm:hidden p-2.5 rounded-xl transition-colors cursor-pointer hover:bg-[var(--color-surface)]"
            style="color: var(--color-text-muted);"
            aria-label="Toggle menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <X v-if="isMobileMenuOpen" class="size-5" />
            <Menu v-else class="size-5" />
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-if="isMobileMenuOpen"
          class="sm:hidden py-4"
          style="border-top: 2px solid var(--color-border);"
        >
          <Button
            as="a"
            href="https://github.com/aingaRamangalahy/jsresources/blob/master/CONTRIBUTING.md#adding-resources"
            target="_blank"
            variant="outline"
            class="w-full justify-center"
          >
            <Plus class="size-4" />
            Contribute a resource
          </Button>
        </nav>
      </Transition>
    </div>
  </header>
</template>
