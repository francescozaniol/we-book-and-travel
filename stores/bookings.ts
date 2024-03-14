import BookingService from '@/services/BookingService';

export enum Gender {
  male = 0,
  female = 1,
  pnts = 2,
}

export enum Payment {
  paypal = 0,
  credit = 1,
  revolut = 2,
}

export type Customer = {
  name: string,
  email: string,
  phone: string,
  age: number,
  gender: Gender,
}

export type Booking = {
  id: number,
  travelId: Travel['id'],
  travel: Travel,
  customer: Customer,
  payment: Payment,
  notes: string,
};

export type NewBooking = Omit<Booking, 'id' | 'travel'> & {
  id: null,
};

export const useBookingsStore = defineStore('bookings', {

  state: () => ({
    bookings: <null | Booking[]>null,
  }),

  actions: {

    fetchBookings() {
      this.bookings = null;
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

})
