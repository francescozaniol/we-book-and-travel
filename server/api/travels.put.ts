import travels from './mocks/travels.json';

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB saving
  const body = await readBody(event);
  return {
    data: {
      ...body,
      id: 999,
      img: {
        "src": "https://via.placeholder.com/350x150",
      },
    } as typeof travels[number],
  };
})
