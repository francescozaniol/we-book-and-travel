export const $store = {
  get bookings() { return useBookingsStore(); },
  get travels() { return useTravelsStore(); },
  get globalLoader() { return useGlobalLoaderStore(); },
};
