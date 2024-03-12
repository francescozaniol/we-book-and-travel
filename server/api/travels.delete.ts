import travels from './mocks/travels.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB deletion
  const body = await readBody(event);
  return {
    success: true,
  };
})
