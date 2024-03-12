import travels from './mocks/travels.json';

export default defineEventHandler(async () => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB fetching
  return {
    data: travels,
  };
})
