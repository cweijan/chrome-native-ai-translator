<script setup lang="ts">

</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  --uno: p-2 select-none cursor-pointer;
  --uno: rounded-lg bg-light-400 dark:bg-dark-800;
  --uno: border-1 border-dark/20 dark:border-light/20;
  --uno: shadow-lg shadow-dark/3 dark:shadow-light/3;
  --uno: transition duration-100 will-change-transform;

  &:hover {
    --uno: bg-light-700 dark:bg-dark-200;
  }

  &:active {
    --uno: scale-90;
  }

  &:disabled {
    --uno: scale-100 opacity-50 cursor-not-allowed  pointer-events-none bg-light-400 dark:bg-dark-800;
  }
}
</style>
