export default defineNuxtConfig({
  // ssr: true,
  app: {
    head: {
      title: 'We Book & Travel',
      meta: [
        {
          name: 'description',
          content: 'This travels and bookings management system is truly impressive',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    // '@nuxtjs/seo',
  ],
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
});