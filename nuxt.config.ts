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
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
