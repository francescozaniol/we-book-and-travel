export default defineNuxtPlugin(nuxtApp => {
  return {
    name: 'store',
    provide: {
      store: {
        travels: useTravelsStore(),
      }
    }
  }
})
