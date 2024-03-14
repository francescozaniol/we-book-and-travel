<template>
  <div class="px-5 pt-16 pb-20 container mx-auto">

    <div class="flex items-center align-middle py-6 max-sm:block">
      <div>
        <UButton color="red" icon="i-heroicons-plus-circle" size="xl" class="max-sm:w-full max-sm:justify-center" @click="addBooking">Add new Booking</UButton>
      </div>
    </div>

    <div v-if="bookings">
      <UTable
        :rows="bookings"
        :columns="bookingsTableColumns"
      >
        <template #customer-data="{ row }">
          <strong>{{ row.customer.name }}</strong><br/>
          {{ row.customer.email }} | {{ row.customer.phone }}<br/>
          Age: {{ row.customer.age }} | Gender: {{ labelsUtil.getGenderLabel(row.customer.gender) }}<br/>
        </template>
        <template #payment-data="{ row }">
          {{ labelsUtil.getPaymentLabel(row.payment) }}<br/>
        </template>
        <template #notes-data="{ row }">
          <div class="min-w-[40ch] w-full whitespace-normal">{{ row.notes }}</div>
        </template>
      </UTable>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { BookingForm } from '#components'
const { $store } = useNuxtApp();

const bookings = computed(() => $store.bookings.bookings);

const bookingsTableColumns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'customer',
    label: 'Customer'
  },
  {
    key: 'payment',
    label: 'Payment'
  },
  {
    key: 'notes',
    label: 'Notes'
  },
];

await useAsyncData(() => Promise.all([
  $store.bookings.fetchBookings(),
]));

function addBooking () {
  useModal().open(BookingForm);
}
</script>
