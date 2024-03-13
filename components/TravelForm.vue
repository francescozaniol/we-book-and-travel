<template>
  <UModal>
    <form @submit.prevent="saveEditedTravel">

      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <div class="space-y-3">

          <div>
            <label for="editedTravel.title">Title</label>
            <UInput id="editedTravel.title" class="w-full" type="text" name="title" v-model="editedTravel.title" />
          </div>

          <div>
            <label for="editedTravel.description">Description</label>
            <UInput id="editedTravel.description" class="w-full" type="text" name="description" v-model="editedTravel.description" />
          </div>

          <div>
            <label for="editedTravel.ratings">Ratings</label>
            <USelect id="editedTravel.ratings" class="w-full" name="ratings" v-model="editedTravel.rating"
              :options="[
                { 'value': 0.5, name: '0,5' },
                { 'value': 1, name: '1' },
                { 'value': 1.5, name: '1,5' },
                { 'value': 2, name: '2' },
                { 'value': 2.5, name: '2,5' },
                { 'value': 3, name: '3' },
                { 'value': 3.5, name: '3,5' },
                { 'value': 4, name: '4' },
                { 'value': 4.5, name: '4,5' },
                { 'value': 5, name: '5' },
              ]"
            />
          </div>

          <div>
            <label for="editedTravel.dates.departure">Departure date</label>
            <UInput type="date" id="editedTravel.dates.departure" class="w-full" name="dates.departure" v-model="editedTravel.dates.departure" />
          </div>

          <div>
            <label for="editedTravel.dates.return">Return date</label>
            <UInput type="date" id="editedTravel.dates.return" class="w-full" name="dates.return" v-model="editedTravel.dates.return" />
          </div>

          <div>
            <label for="editedTravel.img.src">Image URL</label>
            <UInput type="text" id="editedTravel.img.src" class="w-full" name="img.src" v-model="editedTravel.img.src" />
          </div>

        </div>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton color="green" size="lg" class="px-6" type="submit">Save</UButton>
            <UButton color="black" size="lg" class="px-6" @click="useModal().close()">Cancel</UButton>
          </div>
        </template>
      </UCard>

    </form>
  </UModal>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const { travel } = defineProps({
  travel: {
    type: Object as PropType<Travel> | null,
    required: false,
    default: null,
  }
});

const editedTravel = <Ref<Travel | NewTravel>>ref({});

if ( travel === null ){
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
  }
} else{
  editedTravel.value = JSON.parse(JSON.stringify(toRaw(travel)));
}

async function saveEditedTravel () {
  if ( !editedTravel.value ) {
    useModal().close();
    return;
  }
  await useAsyncData(() => {
    if ( editedTravel.value.id === null ){
      return $store.travels.storeTravel(editedTravel.value as NewTravel);
    } else{
      return $store.travels.updateTravel(editedTravel.value as Travel);
    }
  });
  useModal().close();
}
</script>
