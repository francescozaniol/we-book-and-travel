<template>
  <article class="w-full relative" v-if="travel">

    <div class="absolute w-full min-h-[50vh] overflow-hidden">
      <div class="absolute h-full w-[104%] -ml-[2%] -mt-[2%] bg-cover bg-center blur-sm" :style="`background-image: url('${travel.img.src}')`" />
    </div>

    <div class="relative pt-[25vh]">
      <div class="container mx-auto pt-6">
        <h1 class="relative text-6xl bg-white inline-block p-4">
          {{ travel.title }}
        </h1>
        <div class="mt-6 px-6 pt-16 bg-white">
          <div class="max-w-[600px] mx-auto">

            <p class="text-xl">{{ travel.description }}</p>

            <hr class="my-16" />

            <div class="text-right">
              <div class="p-1 px-3 bg-white rounded-xl">
                <span>User rating: </span class="text-md font-bold">{{ travel.rating }} ⭐
              </div>
              <div class="text-slate-900 p-1 mt-auto">
                <div><span>Departure: </span>{{ travel.dates.departure }}</div>
                <div><span>Return: </span>{{ travel.dates.return }}</div>
              </div>
              <div>💵 {{ travel.price }}$</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const route = useRoute();

await useAsyncData(() => Promise.all([
  $store.travels.fetchTravel(Number(route.params.id)),
]));
const travel = computed(() => $store.travels.travel);
</script>
