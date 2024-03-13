export default defineNuxtConfig({
  // ssr: true,
  app: {
    head: {
      title: 'We Book & Travel',
      meta: [
        {
          name: 'description',
          content: 'This website is truly impressive.'
        }
      ],
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['@/assets/css/main.css'],
});
