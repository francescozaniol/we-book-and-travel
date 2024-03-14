<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModals />
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'antialiased h-full overflow-y-scroll',
  },
  bodyAttrs: {
    class: 'h-full m-0',
  },
});
</script>

<style>
#__nuxt {
  @apply h-full;
}
</style>