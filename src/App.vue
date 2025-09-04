<script setup lang="ts">
import ColorModeSwitcher from './components/ColorModeSwitcher.vue'
import LangSwitcher from './components/LangSwitcher.vue'
import Logo from './components/logo.vue'
import { useDarkMode } from './composables/useDarkMode'

useDarkMode()
</script>

<template>
  <header class="select-none flex justify-between items-center px-4 py-3.5"
    style="border-bottom: 1px solid rgba(0, 0, 0, .12);">
    <h1 class="text-xl md:text-2xl text-dark-500/80 dark:text-light-50/80 flex items-center gap-0.5em">
      <a class="inline-flex gap-x-1 hover:text-inherit" href="https://translate.google.com/" target="_blank"
        rel="noopener">
        <img src="/google.svg" alt="logo" width="74" height="24">
        <span style="font-size: 22px;">翻译</span>
      </a>
    </h1>
    <nav>
      <ul class="flex items-center gap-3 text-base md:text-xl">
        <li>
          <a href="https://github.com/cweijan/chrome-native-ai-translator" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1">
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
  <footer class="flex justify-between select-none items-end">
    <p class="px-2 whitespace-nowrap text-sm md:text-base" />
    <div class="px-2 flex gap-2 items-end text-sm md:text-base flex-col">
      <div class="flex gap-2">
        <ColorModeSwitcher />
        <LangSwitcher />
      </div>
      <p class="whitespace-nowrap">
        &copy; {{ new Date().getFullYear() }} <a href="https://github.com/cweijan" target="_blank"
          rel="noopener">cweijan</a>
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
