<template>
  <div class="px-5 pb-20 container max-sm:max-w-[400px] mx-auto">

    <div class="flex items-center align-middle py-6 max-sm:block">
      <div>
        <UButton color="red" icon="i-heroicons-plus-circle" size="xl" class="max-sm:w-full max-sm:justify-center" @click="editTravel(undefined)">Add new Travel</UButton>
      </div>
      <hr class="md:hidden my-6" />
      <form class="flex ml-auto justify-end space-x-2" @submit.prevent="filterTravels">
        <UInput id="filter.search" class="w-full" type="search" name="filter.search" v-model="filters.q" placeholder="Search" @focus="searchInputHasFocus = true" @blur="searchInputHasFocus = false" />
        <UButton color="black" variant="solid" type="submit">Search</UButton>
      </form>
    </div>

    <div v-if="travels && !travels.length">No search results 😞</div>
    <div v-else class="list-none m-0 p-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      <div v-if="travels" class="m-0 p-0 xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] xs:grid-cols-1 card-fade-in" v-for="(travel, i) in travels" :key="travel.id" :style="`animation-delay:${i*50}ms`">
        <TravelCard
          :travel="travel"
          @edit="editTravel(travel)"
          @delete="confirmTravelDelete(travel)"
        />
      </div>
      <div v-else class="" v-for="skeleton in [0,1,2,3]" :key="skeleton">
        <div class="xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] flex flex-col items-center space-x-4">
          <USkeleton class="h-full w-full" :style="`animation-delay: ${skeleton*100}ms;animation-duration: 1s;`" :ui="{ background: 'bg-gray-300 dark:bg-gray-600', }" />
        </div>
      </div>
    </div>

    <UModal v-model="formModal.isOpen">
      <TravelForm
        :travel="formModal.travel"
        :pending="formModal.pending"
        @submit="saveTravel"
        @cancel="formModal.isOpen = false"
      />
    </UModal>

    <UModal v-if="deleteModal.travel" v-model="deleteModal.isOpen">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <p>Are you sure you want to delete <strong>{{ deleteModal.travel.title }}</strong>?</p>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton color="red" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-trash" @click="deleteTravel" :loading="deleteModal.pending">Yes, delete it</UButton>
            <UButton color="black" size="md" class="px-5" icon="i-heroicons-x-circle" @click="deleteModal.isOpen = false">No, keep it</UButton>
          </div>
        </template>
      </UCard>
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

const deleteModal = reactive({
  isOpen: false,
  pending: false,
  travel: <Travel | null>null,
});
function confirmTravelDelete (travel: Travel) {
  deleteModal.isOpen = true;
  deleteModal.travel = travel;
}
async function deleteTravel () {
  deleteModal.pending = true;
  await $store.travels.deleteTravel(deleteModal.travel as Travel);
  deleteModal.pending = false;
  deleteModal.isOpen = false;
  deleteModal.travel = null;
}

const filters = <TravelsFilters>reactive({
  q: '',
});
function filterTravels () {
  useAsyncData(() => $store.travels.filterTravels(unref(filters)));
}
const searchInputHasFocus = ref(false);
watch(() => filters.q, () => {
  if ( searchInputHasFocus.value && filters.q === '' ) $store.travels.fetchTravels();
});

const formModal = reactive({
  isOpen: false,
  pending: false,
  travel: <Travel | undefined>undefined,
});
function editTravel (travel: Travel | undefined) {
  formModal.isOpen = true;
  formModal.travel = travel;
}

async function saveTravel (travel: Travel | NewTravel) {
  formModal.pending = true;
  if ( travel.id === null ){
    await $store.travels.storeTravel(travel);
  } else{
    await $store.travels.updateTravel(travel);
  }
  formModal.isOpen = false;
  formModal.pending = false;
  formModal.travel = undefined;
}
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .card-fade-in {
    animation: card-fade-in .5s cubic-bezier(.25, 1, .25, 1) both;
  }
  @keyframes card-fade-in {
    from { opacity: 0; transform: translate3d(0, 20px, 0) }
    to { opacity: 1; transform: none }
  }
}
</style>