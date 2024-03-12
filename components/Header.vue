<template>
  <header class="h-[60px] relative">
    <div class="fixed top-0 left-0 right-0 z-50 h-[60px] bg-slate-200">
      <nav class="container mx-auto flex items-center justify-between p-4 z-50">
        <div class="z-50">
          <nuxt-link to="/" class="text-xl font-bold border-none z-50 ">
            WeBookAndTravel
          </nuxt-link>
        </div>
        <div class="hidden lg:flex items-center space-x-8">
          <nuxt-link to="/" class="border-none">Book</nuxt-link>
          <nuxt-link to="/travel" class="border-none">Travel</nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>
