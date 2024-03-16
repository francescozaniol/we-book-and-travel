<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
@media (prefers-reduced-motion: no-preference) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity .15s ease;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
}

#__nuxt {
  height: 100%;
}
</style>