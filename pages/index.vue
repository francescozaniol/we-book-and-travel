<template>
  <div class="px-5 pb-20 container mx-auto">

    <div class="flex align-middle py-6 max-sm:block">
      <div class="max-sm:py-2">
        <button class="max-sm:w-full" v-if="!editedTravel" @click="addTravel">Add new Travel</button>
      </div>
      <form class="flex ml-auto justify-end space-x-2" @submit.prevent="filterTravels">
        <input id="filter.search" class="w-full" type="search" name="description" v-model="filters.q" placeholder="Search" @input="resetTravelsFilters" />
        <button type="submit">Search</button>
      </form>
    </div>

    <ul v-if="travels && travels.length" class="list-none m-0 p-0 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      <li class="m-0 p-0 xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] xs:grid-cols-1" v-for="travel in travels" :key="travel.id">
        <TravelCard
          :travel="travel"
          @edit="editTravel(travel)"
          @delete="removeTravel(travel)"
        />
      </li>
    </ul>
    <div v-else-if="travels && !travels.length">No search results</div>
    <div v-else>Hold on, I'm fetching...</div>

    <div v-if="editedTravel">
      <hr />
      <form @submit.prevent="saveEditedTravel">

        <label for="title">Title</label>
        <input id="title" class="w-full" type="text" name="title" v-model="editedTravel.title" />

        <label for="description">Description</label>
        <input id="description" class="w-full" type="text" name="description" v-model="editedTravel.description" />

        <label for="ratings">Ratings</label>
        <select id="ratings" class="w-full" name="ratings" v-model="editedTravel.rating">
          <option value="0.5">0,5</option>
          <option value="1">1</option>
          <option value="1.5">1,5</option>
          <option value="2">2</option>
          <option value="2.5">2,5</option>
          <option value="3">3</option>
          <option value="3.5">3,5</option>
          <option value="4">4</option>
          <option value="4.5">4,5</option>
          <option value="5">5</option>
        </select>

        <label for="dates.departure">Departure date</label>
        <input type="date" id="dates.departure" class="w-full" name="dates.departure" v-model="editedTravel.dates.departure" />

        <label for="dates.return">Return date</label>
        <input type="date" id="dates.return" class="w-full" name="dates.return" v-model="editedTravel.dates.return" />

        <label for="img.src">Image URL</label>
        <input type="text" id="img.src" class="w-full" name="img.src" v-model="editedTravel.img.src" />

        <button type="submit">Save</button>
        <button @click="editedTravel = null">Cancel</button>
      </form>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();

const travels = computed(() => $store.travels.travels);

function fetchTravels () {
  useAsyncData(() => Promise.all([
    $store.travels.fetchTravels(),
  ]), {
    lazy: true,
    server: false,
  });
}
fetchTravels();

let editedTravel = <Ref<null | Travel | NewTravel>>ref(null);

function editTravel (travel: Travel) {
  editedTravel.value = JSON.parse(JSON.stringify(toRaw(travel)));
}

async function saveEditedTravel () {
  if ( !editedTravel.value ) return;
  if ( editedTravel.value.id === null ){
    await useAsyncData(() => $store.travels.storeTravel(editedTravel.value as NewTravel));
  } else {
    await useAsyncData(() => $store.travels.updateTravel(editedTravel.value as Travel));
  }
  editedTravel.value = null;
}

function addTravel () {
  editedTravel.value = {
    id: null,
    title: '',
    description: '',
    rating: 5,
    price: 0,
    dates: {
      departure: new Date().toISOString().substring(0, 10),
      return: new Date().toISOString().substring(0, 10),
    },
    img: {
      src: "https://via.placeholder.com/350x150",
    },
  };
}

function removeTravel (travel: Travel) {
  if (confirm(`Mate, u sure u wanna delete ${travel.title}?`)) {
    useAsyncData(() => $store.travels.deleteTravel(travel));
  }
}

const filters = <Ref<TravelsFilters>>ref({
  q: '',
});
function filterTravels () {
  useAsyncData(() => $store.travels.filterTravels(unref(filters)));
}
function resetTravelsFilters () {
  if ( !filters.value.q ) fetchTravels();
}
</script>
