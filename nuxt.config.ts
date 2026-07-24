// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-16',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', 'shadcn-nuxt', '@vueuse/nuxt'],

  vite: {
    plugins: [tailwindcss()],
  },

  routeRules: {
    '/resources': { redirect: '/' },
    '/collections': { redirect: '/' },
    '/collections/**': { redirect: '/' },
    '/paths': { redirect: '/' },
    '/paths/**': { redirect: '/' },
    '/start': { redirect: '/' },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  shadcn: {
    prefix: '',
    componentDir: '~/components/ui',
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/list_logo.svg' },
      ],
    },
  },
})
