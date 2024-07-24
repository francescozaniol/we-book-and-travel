export const useUiStore = defineStore('ui', {

  state: () => ({
    modal: useModal(),
    globalLoader: {
      isLoading: <boolean>false,
      type: <'blocking' | 'non-blocking'>'non-blocking',
    },
  }),

  actions: {

    showGlobalLoader(type: 'blocking' | 'non-blocking' = 'blocking') {
      // todo: adda logica che se e' blocking allora anche il type e' tutto blocking (prendila da designsystem)
      this.globalLoader.isLoading = true;
      this.globalLoader.type = type;
    },

    hideGlobalLoader() {
      this.globalLoader.isLoading = false;
      this.globalLoader.type = 'non-blocking';
    },

  },

});
