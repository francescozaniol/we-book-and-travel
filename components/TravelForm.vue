<template>
  <form @submit.prevent="$emit('submit', unref(editedTravel))">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h1 class="text-3xl">
          <template v-if="editedTravel.id === null">
            {{ $t('TRAVELS.ADD_NEW') }}
          </template>
          <template v-else>
            {{ $t('TRAVELS.EDIT_TRAVEL') }}
          </template>
        </h1>
      </template>

      <div class="space-y-3">
        <div>
          <label for="editedTravel.title">{{ $t('TRAVELS.TITLE') }}</label>
          <UInput
            id="editedTravel.title"
            v-model="editedTravel.title"
            size="lg"
            class="w-full"
            type="text"
            name="editedTravel.title"
            required
          />
        </div>

        <div>
          <label for="editedTravel.description">{{ $t('TRAVELS.DESCRIPTION') }}</label>
          <UInput
            id="editedTravel.description"
            v-model="editedTravel.description"
            size="lg"
            class="w-full"
            type="text"
            name="editedTravel.description"
            required
          />
        </div>

        <div>
          <label for="editedTravel.rating">{{ $t('TRAVELS.RATING') }}</label>
          <USelect
            id="editedTravel.rating"
            v-model="editedTravel.rating"
            size="lg"
            class="w-full"
            name="editedTravel.rating"
            required
            option-attribute="name"
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
          <label for="editedTravel.price">{{ $t('TRAVELS.PRICE') }}</label>
          <UInput
            id="editedTravel.price"
            v-model="editedTravel.price"
            size="lg"
            type="number"
            class="w-full"
            name="editedTravel.dates.departure"
            required
          />
        </div>

        <div>
          <label for="editedTravel.dates.departure">{{ $t('TRAVELS.DEPARTURE_DATE') }}</label>
          <UInput
            id="editedTravel.dates.departure"
            v-model="editedTravel.dates.departure"
            size="lg"
            type="date"
            class="w-full"
            name="editedTravel.dates.departure"
            required
          />
        </div>

        <div>
          <label for="editedTravel.dates.return">{{ $t('TRAVELS.RETURN_DATE') }}</label>
          <UInput
            id="editedTravel.dates.return"
            v-model="editedTravel.dates.return"
            size="lg"
            type="date"
            class="w-full"
            name="editedTravel.dates.return"
            required
          />
        </div>

        <div>
          <label for="editedTravel.img.src">{{ $t('TRAVELS.IMAGE_URL') }}</label>
          <UInput
            id="editedTravel.img.src"
            v-model="editedTravel.img.src"
            size="lg"
            type="url"
            class="w-full"
            name="editedTravel.img.src"
            required
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton
            color="green"
            size="md"
            class="px-5 disabled:opacity-40"
            icon="i-heroicons-check"
            type="submit"
            :disabled="!isDataValid"
            :loading="pending"
          >
            {{ $t('GENERIC.SAVE') }}
          </UButton>
          <UButton
            color="black"
            size="md"
            class="px-5"
            icon="i-heroicons-x-circle"
            @click="$emit('cancel')"
          >
            {{ $t('GENERIC.CANCEL') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </form>
</template>

<script lang="ts" setup>
const { travel, pending } = defineProps({
  travel: {
    type: Object as PropType<Travel | null>,
    required: false,
    default: null,
  },
  pending: {
    type: Boolean,
    required: true,
    default: false,
  },
});

defineEmits(['submit', 'cancel']);

const editedTravel = ref({}) as Ref<Travel | NewTravel>;

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
  };
} else {
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