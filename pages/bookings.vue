<template>
  <div class="px-5 pb-20 container mx-auto">
    <div class="flex items-center align-middle py-6 max-sm:block">
      <div>
        <UButton
          color="red"
          icon="i-heroicons-plus-circle"
          size="xl"
          class="max-sm:w-full max-sm:justify-center"
          @click="formModal.isOpen = true"
        >
          Add new Booking
        </UButton>
      </div>
    </div>

    <div v-if="bookings">
      <UTable
        :rows="bookings"
        :columns="bookingsTableColumns"
      >
        <template #customer-data="{ row }">
          <strong>{{ row.customer.name }}</strong><br>
          {{ row.customer.email }} | {{ row.customer.phone }}<br>
          Age: {{ row.customer.age }} | Gender: {{ labelsUtil.getGenderLabel(row.customer.gender) }}<br>
        </template>
        <template #travel-data="{ row }">
          <strong>{{ row.travel.title }}</strong><br>
          Dates: {{ row.travel.dates.departure }} to {{ row.travel.dates.return }}<br>
          Price: {{ row.travel.price }}$
        </template>
        <template #payment-data="{ row }">
          {{ labelsUtil.getPaymentLabel(row.payment) }}<br>
        </template>
        <template #notes-data="{ row }">
          <div class="min-w-[40ch] w-full whitespace-normal">
            {{ row.notes }}
          </div>
        </template>
      </UTable>
    </div>

    <UModal v-model="formModal.isOpen">
      <BookingForm
        :pending="formModal.pending"
        @submit="saveBooking"
        @cancel="formModal.isOpen = false"
      />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { BookingForm } from '#components';
const { $store } = useNuxtApp();

const bookings = computed(() => $store.bookings.bookings);

const bookingsTableColumns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'travel',
    label: 'Travel',
  },
  {
    key: 'customer',
    label: 'Customer',
  },
  {
    key: 'payment',
    label: 'Payment',
  },
  {
    key: 'notes',
    label: 'Notes',
  },
];

useAsyncData(() => Promise.all([
  $store.bookings.fetchBookings(),
]));

const formModal = reactive({
  isOpen: false,
  pending: false,
});

async function saveBooking (booking: NewBooking) {
  formModal.pending = true;
  await $store.bookings.storeBooking(booking);
  formModal.isOpen = false;
  formModal.pending = false;
}
</script>
