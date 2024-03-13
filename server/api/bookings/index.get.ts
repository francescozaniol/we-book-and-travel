import bookings from '@/server/mocks/bookings.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB fetching
  return {
    data: bookings,
  };
})
