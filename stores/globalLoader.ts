export const useGlobalLoaderStore = defineStore('globalLoader', {

  state: () => ({
    isLoading: <boolean>false,
    type: <'blocking' | 'non-blocking'>'non-blocking',
  }),

  actions: {

    show(type: 'blocking' | 'non-blocking' = 'blocking') {
      // todo: adda logica che se e' blocking allora anche il type e' tutto blocking (prendila da designsystem)
      this.isLoading = true;
      this.type = type;
    },

    hide() {
      this.isLoading = false;
      this.type = 'non-blocking';
    },

  },

});
