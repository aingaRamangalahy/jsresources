// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', 'shadcn-nuxt', '@vueuse/nuxt'],

  vite: {
    plugins: [tailwindcss()],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  shadcn: {
     /**
     * Prefix for all the imported component
     */
     prefix: '',
     /**
      * Directory that the component lives in.
      * @default "./components/ui"
      */
     componentDir: './components/ui'
  },

  typescript: {
    strict: true,
    typeCheck: false // Disable during build, enable in IDE
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ]
    }
  }

})