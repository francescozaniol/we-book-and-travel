<template>
  <article
    class="flex flex-col relative shadow-xl rounded-lg group h-full hover:shadow-2xl transition-[shadow, transform] duration-200 [@media(hover:hover)]:hover:-translate-y-1 dark:bg-neutral-800"
    :data-testid="`travel-card-${travel.id}`"
  >
    <div class="aspect-[16/9] overflow-hidden rounded-t-lg relative">
      <span class="absolute bottom-2 right-2 z-10 p-1 px-3 bg-white text-black dark:bg-neutral-900 dark:text-white rounded-xl">
        <span class="text-sm">User rating: <span class="text-md font-bold">{{ travel.rating }} ⭐</span></span>
      </span>
      <img
        class="w-full h-full object-cover group-hover:scale-110 transition-scale duration-500 motion-reduce:group-hover:scale-100"
        :src="travel.img.src"
        alt=""
      >
    </div>

    <h1 class="py-4 px-6 text-2xl font-bold md:text-3xl">
      {{ travel.title }}
    </h1>

    <p class="px-6 2xl:line-clamp-3 xl:line-clamp-2 lg:line-clamp-4 md:line-clamp-2 sm:line-clamp-4">
      {{ travel.description }}
    </p>

    <div class="text-md text-slate-900 dark:text-white pt-2 px-6 mt-auto">
      <div class="flex flex-row space-x-4 mb-2">
        <div>
          <div class="text-xs">
            Departure:
          </div>{{ travel.dates.departure }}
        </div>
        <div>
          <div class="text-xs">
            Return:
          </div>{{ travel.dates.return }}
        </div>
      </div>
      <div class="mb-2">
        <div class="text-xs">
          Price/Person:
        </div>{{ travel.price }}$
      </div>
    </div>

    <hr class="dark:border-neutral-700">

    <div class="flex p-2 align-bottom justify-end space-x-2">
      <UButton
        color="black"
        variant="solid"
        icon="i-heroicons-pencil-square"
        @click="$emit('edit')"
      >
        Edit
      </UButton>
      <UButton
        color="black"
        variant="solid"
        icon="i-heroicons-trash"
        @click="$emit('delete')"
      >
        Delete
      </UButton>
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps({
  travel: {
    type: Object as PropType<Travel>,
    required: true,
  },
});

defineEmits(['edit', 'delete']);
</script>
