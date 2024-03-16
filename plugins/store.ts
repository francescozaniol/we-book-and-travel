export default defineNuxtPlugin(() => {
  return {
    name: 'store',
    provide: {
      store: {
        bookings: useBookingsStore(),
        travels: useTravelsStore(),
      },
    },
  };
});
