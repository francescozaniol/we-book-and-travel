<template>
  <div>
    <h2 v-if="error">
      {{ error.statusCode }}
    </h2>
    <UButton @click="handleError">
      Clear errors
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: null,
  },
});

const handleError = () => clearError({ redirect: '/' });
</script>