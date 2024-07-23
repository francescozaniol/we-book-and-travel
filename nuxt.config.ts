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
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png', },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png', },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png', },
        { rel: 'manifest', href: '/site.webmanifest', },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5', },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c', },
        { name: 'theme-color', content: '#ffffff', },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/icon',
    "nuxt-security",
  ],

  seoExperiments: {
    enabled: false,
  },

  security: {
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

  compatibilityDate: '2024-07-22',
});