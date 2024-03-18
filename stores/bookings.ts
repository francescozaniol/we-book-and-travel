import BookingService from '@/services/BookingService';

export const useBookingsStore = defineStore('bookings', {

  state: () => ({
    bookings: <null | Booking[]>null,
  }),

  actions: {

    fetchBookings() {
      return BookingService.get().then(res => {
        this.bookings = res.data;
        return res;
      });
    },

    storeBooking(data: NewBooking) {
      return BookingService.store(data).then(res => {
        this.bookings?.unshift(res.data as Booking);
        return res;
      });
    },

  },

});
