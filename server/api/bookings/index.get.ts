import bookings from '@/server/mocks/bookings.json';
import travels from '@/server/mocks/travels.json';

const bookingsData = bookings.map(booking => ({
  ...booking,
  travel: travels.find(t => t.id === booking.travelId),
}));

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB fetching
  return {
    data: bookingsData,
  };
})
