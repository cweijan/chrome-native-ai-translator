<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import DouButton from './base/DouButton.vue'

const intervalMS = 60 * 60 * 1000

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    r
    && setInterval(() => {
      r.update()
    }, intervalMS)
  },
})

async function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> {{ $t('reload_prompt.ready') }} </span>
      <span v-else>
        {{ $t('reload_prompt.message') }}
      </span>
    </div>
    <div class="flex gap-2">
      <DouButton v-if="needRefresh" type="primary" small @click="updateServiceWorker()">
        {{ $t('reload_prompt.reload') }}
      </DouButton>
      <DouButton type="primary" small @click="close">
        {{ $t('reload_prompt.close') }}
      </DouButton>
    </div>
  </div>
</template>

<style>
.pwa-toast {
  --uno: fixed left-0 bottom-0;
  --uno: shadow-xl shadow-dark-500/3 dark:shadow-light-500/3 border-1 border-dark-500/20 dark:border-light-300/20 rounded-lg;
  --uno: bg-white/30 dark:bg-dark-500/30;
  --uno: backdrop-blur-lg;
  --uno: z-10 m-4 p-3;
}

.pwa-toast .message {
  --uno: mb-2;
}
</style>
