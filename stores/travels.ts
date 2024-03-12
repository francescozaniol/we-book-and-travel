import TravelService from '@/services/TravelService';

export type Travel = {
  id: number,
  title: string,
  description: string,
  rating: number,
  price: number,
  dates: {
    departure: string,
    return: string,
  },
  img: {
    src: string,
  },
};

export type NewTravel = Omit<Travel, 'id'> & {
  id: null,
};

export const useTravelsStore = defineStore('travels', {

  state: () => ({
    travels: <null | Travel[]>null,
  }),

  actions: {

    fetchTravels() {
      return TravelService.get().then(res => {
        this.travels = res.data;
        return res;
      });
    },

    addNewTravel(data: NewTravel) {
      return TravelService.new(data).then(res => {
        this.travels?.push(res.data);
        return res;
      });
    },

    updateTravel(data: Travel) {
      return TravelService.update(data).then(res => {
        const index = this.travels!.findIndex(t => t.id === res.data.id);
        this.travels![index] = res.data;
        return res;
      });
    },

    removeTravel(travel: Travel) {
      return TravelService.delete(travel.id).then(res => {
        this.travels = this.travels!.filter(t => t.id !== travel.id);
        return res;
      });
    },

  },

})
