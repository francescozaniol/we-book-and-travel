<template>
  <form @submit.prevent="$emit('submit', unref(editedTravel))">

    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

      <template #header>
        <h1 class="text-3xl">
          <template v-if="editedTravel.id === null">Add new Travel</template>
          <template v-else>Edit travel</template>
        </h1>
      </template>

      <div class="space-y-3">

        <div>
          <label for="editedTravel.title">Title</label>
          <UInput size="lg" id="editedTravel.title" class="w-full" type="text" name="editedTravel.title" v-model="editedTravel.title" required />
        </div>

        <div>
          <label for="editedTravel.description">Description</label>
          <UInput size="lg" id="editedTravel.description" class="w-full" type="text" name="editedTravel.description" v-model="editedTravel.description" required />
        </div>

        <div>
          <label for="editedTravel.rating">Ratings</label>
          <USelect size="lg" id="editedTravel.rating" class="w-full" name="editedTravel.rating" v-model="editedTravel.rating" required
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
          <label for="editedTravel.price">Price</label>
          <UInput size="lg" type="number" id="editedTravel.price" class="w-full" name="editedTravel.dates.departure" v-model="editedTravel.price" required />
        </div>

        <div>
          <label for="editedTravel.dates.departure">Departure date</label>
          <UInput size="lg" type="date" id="editedTravel.dates.departure" class="w-full" name="editedTravel.dates.departure" v-model="editedTravel.dates.departure" required />
        </div>

        <div>
          <label for="editedTravel.dates.return">Return date</label>
          <UInput size="lg" type="date" id="editedTravel.dates.return" class="w-full" name="editedTravel.dates.return" v-model="editedTravel.dates.return" required />
        </div>

        <div>
          <label for="editedTravel.img.src">Image URL</label>
          <UInput size="lg" type="url" id="editedTravel.img.src" class="w-full" name="editedTravel.img.src" v-model="editedTravel.img.src" required />
        </div>

      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton color="green" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-check" type="submit" :disabled="!isDataValid" :loading="pending">Save</UButton>
          <UButton color="black" size="md" class="px-5" icon="i-heroicons-x-circle" @click="$emit('cancel')">Cancel</UButton>
        </div>
      </template>
    </UCard>

  </form>
</template>

<script lang="ts" setup>
const { travel, pending } = defineProps({
  travel: {
    type: Object as PropType<Travel> | null,
    required: false,
    default: null,
  },
  pending: {
    type: Boolean,
    required: true,
    default: false,
  },
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

const isDataValid = computed(() => (
  editedTravel.value.title &&
  editedTravel.value.description &&
  editedTravel.value.rating &&
  editedTravel.value.price &&
  editedTravel.value.dates.departure &&
  editedTravel.value.dates.return &&
  editedTravel.value.img.src
));
</script>