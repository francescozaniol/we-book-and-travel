<template>
  <div class="px-5 pb-20 container max-sm:max-w-[400px] mx-auto">
    <div class="flex items-center align-middle py-6 max-sm:block">
      <div class="bg-primary" style="width: 20px;height: 20px;"></div>
      <div class="bg-secondary" style="width: 20px;height: 20px;"></div>
      <div>
        <UButton
          icon="i-heroicons-plus-circle"
          class="max-sm:w-full max-sm:justify-center"
          @click="editTravel(undefined)"
        >
          {{ $t('TRAVELS.ADD_NEW') }}
        </UButton>
      </div>
      <hr class="md:hidden my-6">
      <form
        class="flex ml-auto justify-end space-x-2"
        @submit.prevent="filterTravels"
      >
        <UInput
          id="filter.search"
          v-model="filters.q"
          class="w-full"
          type="search"
          name="filter.search"
          placeholder="Search"
          @focus="searchInputHasFocus = true"
          @blur="searchInputHasFocus = false"
        />
        <UButton
          color="secondary"
          variant="solid"
          type="submit"
        >
          {{ $t('GENERIC.SEARCH') }}
        </UButton>
      </form>
    </div>

    <div v-if="travels && !travels.length">
      {{ $t('GENERIC.NO_RESULTS') }}
    </div>
    <div
      v-else
      class="list-none m-0 p-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6"
    >
      <template v-if="travels">
        <div
          v-for="(travel, i) in travels"
          :key="travel.id"
          class="m-0 p-0 xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] xs:grid-cols-1 card-fade-in"
          :style="`animation-delay:${i*50}ms`"
        >
          <TravelCard
            :travel="travel"
            @edit="editTravel(travel)"
            @delete="confirmTravelDelete(travel)"
          />
        </div>
      </template>
      <template v-else>
        <div
          v-for="skeleton in [0,1,2,3]"
          :key="skeleton"
          class=""
        >
          <div class="xl:aspect-[8/12] lg:aspect-[8/13] md:aspect-[8/11] sm:aspect-[8/13] flex flex-col items-center space-x-4">
            <USkeleton
              class="h-full w-full"
              :style="`animation-delay: ${skeleton*100}ms;animation-duration: 1s;`"
              :ui="{ background: 'bg-gray-300 dark:bg-gray-600', }"
            />
          </div>
        </div>
      </template>
    </div>
    <UModal v-model="formModal.isOpen">
      <TravelForm
        :travel="formModal.travel"
        :pending="formModal.pending"
        @submit="saveTravel"
        @cancel="formModal.isOpen = false"
      />
    </UModal>

    <UModal
      v-if="deleteModal.travel"
      v-model="deleteModal.isOpen"
    >
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <p>{{ $t('GENERIC.CONFIRM_DELETE', { item: deleteModal.travel.title }) }}</p>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton
              color="red"
              size="md"
              class="px-5 disabled:opacity-40"
              icon="i-heroicons-trash"
              :loading="deleteModal.pending"
              @click="deleteTravel"
            >
              {{ $t('GENERIC.DELETE_YES') }}
            </UButton>
            <UButton
              color="black"
              size="md"
              class="px-5"
              icon="i-heroicons-x-circle"
              @click="deleteModal.isOpen = false"
            >
              {{ $t('GENERIC.DELETE_NO') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { TravelForm } from '#components';
const travels = computed(() => $store.travels.travels);

useAsyncData(() => useGlobalLoader([
  $store.travels.fetchTravels(),
]), {
  lazy: true,
  server: false,
});

const deleteModal = reactive({
  isOpen: false,
  pending: false,
  travel: null as Travel | null,
});
function confirmTravelDelete (travel: Travel) {
  deleteModal.isOpen = true;
  deleteModal.travel = travel;
}
async function deleteTravel () {
  deleteModal.pending = true;
  try {
    await $store.travels.deleteTravel(deleteModal.travel as Travel);
    deleteModal.isOpen = false;
    deleteModal.travel = null;
  } finally {
    deleteModal.pending = false;
  }
}

const filters = reactive({
  q: '',
}) as TravelsFilters;
function filterTravels () {
  $store.travels.filterTravels(unref(filters));
}
const searchInputHasFocus = ref(false);
watch(() => filters.q, () => {
  if ( searchInputHasFocus.value && filters.q === '' ) $store.travels.fetchTravels();
});

const formModal = reactive({
  isOpen: false,
  pending: false,
  travel: undefined as Travel | undefined,
});
function editTravel (travel: Travel | undefined) {
  formModal.isOpen = true;
  formModal.travel = travel;
}

async function saveTravel (travel: Travel | NewTravel) {
  formModal.pending = true;
  try {
    if ( travel.id === null ){
      await $store.travels.storeTravel(travel);
    } else {
      await $store.travels.updateTravel(travel);
    }
    formModal.isOpen = false;
    formModal.travel = undefined;
  } finally {
    formModal.pending = false;
  }
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