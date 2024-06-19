export function useGlobalLoader(promises: Promise<any>[], type: 'blocking' | 'non-blocking' = 'non-blocking') {
  const { $store } = useNuxtApp();
  $store.globalLoader.show(type);
  Promise.all(promises).finally(() => $store.globalLoader.hide());
  return Promise.all(promises);
}