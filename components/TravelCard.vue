<template>
  <article class="flex flex-col relative shadow-xl rounded-lg group h-full hover:shadow-2xl transition-[shadow, transform] duration-200 hover:-translate-y-1">
    <div class="aspect-video overflow-hidden rounded-t-lg relative flex-none">
      <span class="absolute bottom-2 right-2 z-10 p-1 px-3 bg-white rounded-xl">
        <span class="text-sm">User rating: </span class="text-md font-bold">{{ travel.rating }} ⭐
      </span>
      <img class="w-full h-full object-cover group-hover:scale-110 transition-scale duration-500" :src="travel.img.src" alt="" />
    </div>
    <h1 class="pt-4 px-6">{{ travel.title }}</h1>
    <p class="px-6 line-clamp-3 flex-initial">{{ travel.description }}</p>
    <div class="text-sm text-slate-900 p-1 text-right mt-auto">
      <div><span class="text-xs">Departure: </span>{{ travel.dates.departure }}</div>
      <div><span class="text-xs">Return: </span>{{ travel.dates.return }}</div>
    </div>
    <div>💵 {{ travel.price }}$</div>
    <div class="flex p-2 align-bottom justify-end space-x-2 absolute top-2 left-2 z-10">
      <button @click="$emit('edit')">Edit</button>
      <button @click="$emit('delete')">Delete</button>
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps({
  travel: {
    type: Object as PropType<Travel>,
    required: true
  }
})
</script>
