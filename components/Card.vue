<template>
  <article class="flex flex-col relative shadow-xl rounded-lg group h-full">
    <div class="aspect-video overflow-hidden rounded-t-lg relative flex-none">
      <span class="absolute top-2 right-2 z-10 p-1 px-3 bg-white rounded-xl">💵 {{ item.price }}$</span>
      <img class="w-full h-full object-cover group-hover:scale-110 transition-scale duration-500" :src="item.img.src" alt="" />
      <div class="absolute w-full bottom-0 text-slate-900 p-1 text-right opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition[opacity, transform] translate-y-1 duration-500 bg-white/80">
        <span class="text-sm">User rating: </span class="text-md font-bold">{{ item.rating }} ⭐
      </div>
    </div>
    <div class="p-2">
      <h1>{{ item.title }}</h1>
      <p class="line-clamp-4">{{ item.description }}</p>
    </div>
    <div class="text-sm text-slate-900 p-1 text-right mt-auto">
        <span class="text-xs">Departure: </span>{{ item.dates.departure }} | <span class="text-xs">Return: </span>{{ item.dates.return }}
      </div>
    <div class="relative mt-0">
      <slot name="actions" />
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps({
  item: {
    type: Object as PropType<Travel>,
    required: true
  }
})
</script>
