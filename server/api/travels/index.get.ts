import travels from '@/server/mocks/travels.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB fetching
  const { q }: { q: string } = getQuery(event);
  return {
    data: !q ? travels : travels.filter(t => new RegExp(q, 'i').test(t.title)),
  };
})
