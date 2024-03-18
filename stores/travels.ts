import TravelService from '@/services/TravelService';

export const useTravelsStore = defineStore('travels', {

  state: () => ({
    travels: <null | Travel[]>null,
  }),

  actions: {

    fetchTravels() {
      this.travels = null;
      return TravelService.index().then(res => {
        this.travels = res.data;
        return res;
      });
    },

    filterTravels(filters: TravelsFilters) {
      this.travels = null;
      return TravelService.index({ q: filters.q }).then(res => {
        this.travels = res.data;
        return res;
      });
    },

    searchTravels(q: string) {
      return TravelService.index({ q });
    },

    storeTravel(data: NewTravel) {
      return TravelService.store(data).then(res => {
        this.travels?.unshift(res.data);
        return res;
      });
    },

    updateTravel(travel: Travel) {
      return TravelService.update(travel.id, travel).then(res => {
        const index = this.travels!.findIndex(t => t.id === res.data.id);
        this.travels![index] = res.data;
        return res;
      });
    },

    deleteTravel(travel: Travel) {
      return TravelService.delete(travel.id).then(res => {
        this.travels = this.travels!.filter(t => t.id !== travel.id);
        return res;
      });
    },

  },

});
