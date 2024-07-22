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

defineOgImage({
  url: 'og-image.png',
  // le dimensioni di default sarebbero width: 1200, height: 600, quindi crea una immagine di ste dimensioni; ma puoi customizzarla anche cosi':
  // width: 800,
  // height: 800, 
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