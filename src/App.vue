<script setup lang="ts">
import Logo from './components/logo.vue'
import { useDarkMode } from './composables/useDarkMode'

useDarkMode()
</script>

<template>
  <header class="select-none flex  justify-between items-center">
    <h1 class="text-xl md:text-3xl text-orange-500 font-600 flex items-center gap-0.5em">
      <div class="bg-current p-1.5 rounded-lg">
        <Logo :stroke-width="1.5" class="text-0.875em text-white dark:text-dark-900" />
      </div>
      Fancy Translator
    </h1>
    <nav>
      <ul class="flex items-center gap-3 text-base md:text-xl">
        <li>
          <a href="https://github.com/daidr/fancy-translator" target="_blank" rel="noopener" class="inline-flex items-center gap-1">
            <div class="i-mingcute-github-line" />
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="flex-grow">
    <router-view />
  </main>
  <footer class="flex justify-between select-none">
    <p class="px-2">
      Coded with ❤️
    </p>
    <p class="px-2">
      &copy; {{ new Date().getFullYear() }} <a href="https://github.com/daidr" target="_blank" rel="noopener">DAIDR</a>.
    </p>
  </footer>
</template>

<style scoped></style>
