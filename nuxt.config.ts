export default defineNuxtConfig({
  // ssr: true,
  site: {
    url: 'https://example.com', // production URL
    name: 'We Book & Travel',
    description: 'This travels and bookings management system is truly impressive',
  },

  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/icon', // non serve installarlo in realta', e' usato da nuxt-ui di default
    'nuxt-security',
    '@formkit/auto-animate', // non usato, ho solo provato
    '@nuxt/fonts', // questo aspetta ad installarlo, vedi se nuxt-ui da' una roba simile di default
    '@morev/vue-transitions/nuxt', // non usato, ho solo provato
  ],

  seoExperiments: { // questo modulo e' na merda; uso invece "defineOgImage", vedi app.vue
    enabled: false,
  },

  security: { // questo blocco e' consigliato di essere aggiunto di default dalla guida
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    detectBrowserLanguage: {
      fallbackLocale: 'en',
    },
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
    lazy: false,
    langDir: 'lang',
  },

  ui: {
    icons: ['heroicons'], // qui definisco il set di icone che uso. IMPORTANTE: lo devo installare IN LOCALE prima, ovvero tipo "npm install @iconify-json/heroicons"
  },

  compatibilityDate: '2024-07-22', // me lo ha aggiunto nuxt di default ... boh!
});