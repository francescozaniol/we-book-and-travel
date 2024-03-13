export default defineNuxtPlugin(nuxtApp => {
  return {
    name: 'store',
    provide: {
      store: {
        bookings: useBookingsStore(),
        travels: useTravelsStore(),
      }
    }
  }
})
