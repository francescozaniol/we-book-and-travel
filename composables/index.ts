export function useGlobalLoader(promises: Promise<any>[], type: 'blocking' | 'non-blocking' = 'non-blocking') {
  $store.ui.showGlobalLoader(type);
  Promise.all(promises).finally(() => $store.ui.hideGlobalLoader());
  return Promise.all(promises);
}