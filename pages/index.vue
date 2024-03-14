<template>
  <div class="px-5 pb-20 container max-sm:max-w-[400px] mx-auto">

    <div class="flex items-center align-middle py-6 max-sm:block">
      <div>
        <UButton color="red" icon="i-heroicons-plus-circle" size="xl" class="max-sm:w-full max-sm:justify-center" @click="editTravel(undefined)">Add new Travel</UButton>
      </div>
      <hr class="md:hidden my-6" />
      <form class="flex ml-auto justify-end space-x-2" @submit.prevent="filterTravels">
        <UInput id="filter.search" class="w-full" type="search" name="description" v-model="filters.q" placeholder="Search" />
        <UButton color="black" variant="solid" type="submit">Search</UButton>
      </form>
    </div>

    <div v-if="travels && !travels.length">No search results</div>
    <div v-else class="list-none m-0 p-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      <div v-if="travels" class="m-0 p-0 xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] xs:grid-cols-1" v-for="travel in travels" :key="travel.id">
        <TravelCard
          :travel="travel"
          @edit="editTravel(travel)"
          @delete="removeTravel(travel)"
        />
      </div>
      <div v-else class="" v-for="skeleton in [0,1,2,3]" :key="skeleton">
        <div class="xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] flex flex-col items-center space-x-4">
          <USkeleton class="h-full w-full" :style="`animation-delay: ${skeleton*100}ms;animation-duration: 1s;`" :ui="{ background: 'bg-gray-300 dark:bg-gray-600', }" />
        </div>
      </div>
    </div>

    <UModal v-model="modal.isOpen">
      <TravelForm
        :travel="modal.travel"
        :pending="modal.pending"
        @submit="saveTravel"
        @cancel="modal.isOpen = false"
      />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { TravelForm } from '#components'

const { $store } = useNuxtApp();

const travels = computed(() => $store.travels.travels);

useAsyncData(() => Promise.all([
  $store.travels.fetchTravels(),
]), {
  lazy: true,
  server: false,
});

function removeTravel (travel: Travel) {
  if (confirm(`Mate, u sure u wanna delete ${travel.title}?`)) {
    useAsyncData(() => $store.travels.deleteTravel(travel));
  }
}

const filters = <TravelsFilters>reactive({
  q: '',
});
function filterTravels () {
  useAsyncData(() => $store.travels.filterTravels(unref(filters)));
}
watchEffect(() => {
  if ( filters.q === '' ) $store.travels.fetchTravels();
});

const modal = reactive({
  isOpen: false,
  pending: false,
  travel: <Travel | undefined>undefined,
});
function editTravel (travel: Travel | undefined) {
  modal.isOpen = true;
  modal.travel = travel;
}

async function saveTravel (travel: Travel | NewTravel) {
  modal.pending = true;
  if ( travel.id === null ){
    await $store.travels.storeTravel(travel);
  } else{
    await $store.travels.updateTravel(travel);
  }
  modal.isOpen = false;
  modal.pending = false;
  modal.travel = undefined;
}
</script>