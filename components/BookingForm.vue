<template>
  <form @submit.prevent="$emit('submit', unref(editedBooking))">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <fieldset>

        </fieldset>

        <template #footer>
          <div class="flex space-x-2">
            <UButton color="white" variant="solid" size="md" class="px-5 mr-auto disabled:opacity-40" icon="i-heroicons-chevron-left" type="submit" :disabled="currentStep === 1">Back</UButton>
            <UButton v-if="currentStep !== 3" color="white" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-chevron-right" type="submit" :disabled="!isDataValid[currentStep]" :loading="pending">Next</UButton>
            <UButton v-else color="green" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-check" type="submit" :disabled="!isDataValid[currentStep]" :loading="pending">Save</UButton>
            <UButton color="black" size="md" class="px-5" icon="i-heroicons-x-circle" @click="$emit('cancel')">Cancel</UButton>
          </div>
        </template>

      </UCard>

  </form>
</template>

<script lang="ts" setup>
const { pending } = defineProps({
  pending: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const editedBooking = reactive({
  id: null,
  travelId: null,
  customer: {
    name: '',
    email: '',
    phone: '',
    age: null,
    gender: null,
  },
  payment: null,
  notes: '',
});

let currentStep = ref(1);

const isDataValid = computed(() => ({
  1: !!(
    editedBooking.travelId !== null
  ),
  2: !!(
    editedBooking.customer.name &&
    editedBooking.customer.email &&
    editedBooking.customer.phone &&
    editedBooking.customer.age &&
    editedBooking.customer.gender !== null
  ),
  3: !!(
    editedBooking.travelId !== null
  ),
}));
</script>
