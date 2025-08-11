<script setup lang="ts">
import Logo from './components/logo.vue'
import { useDarkMode } from './composables/useDarkMode'

useDarkMode()
</script>

<template>
  <header class="select-none flex  justify-between items-center">
    <h1 class="text-xl md:text-3xl text-dark-500/80 dark:text-light-50/80 flex items-center gap-0.5em">
      <div class="p-1.5 rounded-lg ring-1 text-current ring-dark-500/20 dark:ring-light-300/20 bg-white/30 dark:bg-dark-700/30 backdrop-blur-md shadow-xl shadow-dark-500/8 dark:shadow-light-500/8">
        <Logo :stroke-width="1.25" class="text-0.875em" />
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
