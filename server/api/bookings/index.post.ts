import bookings from '@/server/mocks/bookings.json';
import travels from '@/server/mocks/travels.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB saving
  const body = await readBody(event);
  return {
    data: {
      ...body,
      travel: travels.find(t => t.id === body.travelId),
      id: Math.floor(Math.random() * 10000),
    } as typeof bookings[number],
  };
});
