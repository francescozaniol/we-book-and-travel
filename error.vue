<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <UButton @click="handleError">Clear errors</UButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>