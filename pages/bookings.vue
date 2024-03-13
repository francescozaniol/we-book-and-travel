<template>
  <div class="px-5 pb-20 container mx-auto">

    <div v-if="bookings">
      <li v-for="booking in bookings" :key="booking.id">
        {{ booking }}
      </li>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();

const bookings = computed(() => $store.bookings.bookings);

await useAsyncData(() => Promise.all([
  $store.bookings.fetchBookings(),
]));
</script>
