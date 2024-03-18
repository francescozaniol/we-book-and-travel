import { Gender, Payment } from '@/enums';

declare global {

  type Travel = {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    dates: {
      departure: string,
      return: string,
    },
    img: {
      src: string,
    },
  };

  type TravelsFilters = {
    q: string,
  };

  type NewTravel = Omit<Travel, 'id'> & {
    id: null,
  };

  type Customer = {
    name: string,
    email: string,
    phone: string,
    age: number,
    gender: Gender,
  }

  type Booking = {
    id: number,
    travelId: Travel['id'],
    travel: Travel,
    customer: Customer,
    payment: Payment,
    notes: string,
  };

  type NewBooking = Omit<Booking, 'id' | 'travel'> & {
    id: null,
  };

}
