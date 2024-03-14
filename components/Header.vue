<template>
  <header class="h-[60px] w-full relative">
    <div class="fixed top-0 w-full z-50 h-[60px] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md">
      <nav class="container mx-auto flex items-center justify-between h-full px-4 z-50">
        <div class="z-50">
          <nuxt-link to="/" class="text-xl font-bold border-none z-50 [&>*]:inline-block whitespace-nowrap py-2">
            <span class="text-red-600 font-medium">We</span><span class="text-slate-900 dark:text-white">B<span class="max-sm:sr-only">ook</span></span><span class="text-md text-slate-400 font-normal">&</span><span class="text-slate-900 dark:text-white">T<span class="max-sm:sr-only">ravel</span></span>
          </nuxt-link>
        </div>
        <div class="flex items-center flex-wrap max-sm:flex-initial space-x-8 max-sm:space-x-2 ml-auto justify-end">
          <nuxt-link to="/bookings" class="border-b-[2px] transition-colors py-1 max-sm:p-0" :class="$route.path === '/bookings' ? 'border-red-600' : 'text-slate-600 dark:text-neutral-400 border-transparent'">Bookings</nuxt-link>
          <nuxt-link to="/" class="border-b-[2px] transition-colors py-1 max-sm:p-0" :class="$route.path === '/' ? 'border-red-600' : 'text-slate-600 border-transparent'">Travels</nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>
