import travels from '@/server/mocks/travels.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 700)); // simulate DB fetching
  const id = parseInt(event.context.params!.id) as number;
  return {
    data: travels.find(t => t.id === id),
  };
});
