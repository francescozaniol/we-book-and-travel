<template>
  <article class="flex flex-col relative shadow-xl rounded-lg aspect-[3/4]">
    <img class="w-full rounded-t-lg" :src="item.img.src" alt="" />
    <div class="p-2">
      <h1>{{ item.title }}</h1>
      <p class="line-clamp-4">{{ item.description }}</p>
    </div>
    <div class="relative mt-auto">
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
