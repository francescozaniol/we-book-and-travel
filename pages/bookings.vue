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
          {{ $t('BOOKINGS.ADD_NEW') }}
        </UButton>
        <Icon name="carbon:bar" size="2em" />
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
          {{ $t('CUSTOMERS.AGE_SHOW', { age: row.customer.age }) }} | {{ $t('CUSTOMERS.GENDER_SHOW', { gender: labelsUtil.getGenderLabel(row.customer.gender) }) }}
        </template>
        <template #travel-data="{ row }">
          <strong>{{ row.travel.title }}</strong><br>
          {{ $t('BOOKINGS.TRAVEL_DATES', { from: row.travel.dates.departure, to: row.travel.dates.return }) }}<br>
          {{ $t('BOOKINGS.TRAVEL_PRICE', { n: row.travel.price }) }}
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
const { $i18n } = useNuxtApp();

const bookings = computed(() => $store.bookings.bookings);

const bookingsTableColumns = [
  {
    key: 'id',
    label: $i18n.t('BOOKINGS.ID'),
  },
  {
    key: 'travel',
    label: $i18n.t('BOOKINGS.TRAVEL'),
  },
  {
    key: 'customer',
    label: $i18n.t('BOOKINGS.CUSTOMER'),
  },
  {
    key: 'payment',
    label: $i18n.t('BOOKINGS.PAYMENT'),
  },
  {
    key: 'notes',
    label: $i18n.t('BOOKINGS.NOTES'),
  },
];

useAsyncData(() => useGlobalLoader([
  $store.bookings.fetchBookings(),
], 'blocking'));

const formModal = reactive({
  isOpen: false,
  pending: false,
});

async function saveBooking (booking: NewBooking) {
  formModal.pending = true;
  try {
    await $store.bookings.storeBooking(booking);
    formModal.isOpen = false;
  } finally {
    formModal.pending = false;
  }
}
</script>
