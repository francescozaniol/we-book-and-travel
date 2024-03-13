export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 400)); // simulate DB deletion
  const id = parseInt(event.context.params!.id) as number
  return {
    success: true,
    data: { id },
  };
})
