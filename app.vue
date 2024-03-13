<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'antialiased h-full',
  },
  bodyAttrs: {
    class: 'h-full m-0',
  },
});
</script>