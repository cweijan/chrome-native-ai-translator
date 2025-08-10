<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

defineProps<{
  /**
   * 进度值 0-100
   */
  progress: number
}>()
</script>

<template>
  <ProgressRoot
    :model-value="progress"
    class="rounded-full bg-white h-3 w-[250px] ring-1 ring-orange-500/40 relative overflow-hidden dark:bg-stone-950 dark:ring-orange-300/30"
  >
    <ProgressIndicator
      class="indicator rounded-full bg-orange-500/80 h-full w-full block transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)] relative overflow-hidden"
      :style="`transform: translateX(-${100 - progress}%)`"
    />
  </ProgressRoot>
</template>

<style scoped lang="scss">
@keyframes progress {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 30px 30px;
  }
}

.indicator {
  &::after {
    content: '';
    position: absolute;
    background-size: 30px 30px;
    inset: 0;
    animation: progress 1s infinite linear;
    background-image: linear-gradient(-45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent);
  }
}
</style>
