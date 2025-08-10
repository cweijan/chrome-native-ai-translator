<script setup lang="ts" generic="T extends string | number, U">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { ref } from 'vue'

defineProps<{
  options: {
    value: T
    label: string
    disabled?: boolean
    extra?: U
  }[]
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

defineSlots<{
  default: (props: { index: number, value: T, label: string, disabled?: boolean, extra?: U }) => any
}>()

const modelValue = defineModel<T>({ required: true })

const open = ref(false)
</script>

<template>
  <SelectRoot v-model="modelValue" v-model:open="open" :disabled="disabled">
    <SelectTrigger
      v-bind="$attrs" class="select-wrapper" :class="{
        active: open,
      }" :aria-label="label"
    >
      <SelectValue :placeholder="placeholder" class="label" :disabled="disabled">
        <template v-for="option, index of options" :key="option.value">
          <template v-if="modelValue === option.value">
            <template v-if="!$slots.default">
              {{ option.label }}
            </template>
            <slot v-else :value="option.value" :label="option.label" :disabled="option.disabled" :extra="option.extra" :index="index" />
          </template>
        </template>
      </SelectValue>
      <div class="i-mingcute-down-line" />
    </SelectTrigger>
    <SelectPortal>
      <Transition name="trans-fade">
        <SelectContent v-if="open" :body-lock="true" class="popup-wrapper" :side-offset="5">
          <SelectScrollUpButton class="scroll-button">
            <div class="i-mingcute-up-fill" />
          </SelectScrollUpButton>

          <SelectViewport class="popup-content">
            <template v-for="option, index of options" :key="option.value">
              <SelectItem :value="option.value" class="popup-label" :disabled="option.disabled">
                <SelectItemText>
                  <template v-if="!$slots.default">
                    {{ option.label }}
                  </template>
                  <slot v-else :value="option.value" :label="option.label" :disabled="option.disabled" :extra="option.extra" :index="index" />
                </SelectItemText>
              </SelectItem>
            </template>
          </SelectViewport>

          <SelectScrollDownButton class="scroll-button">
            <div class="i-mingcute-down-fill" />
          </SelectScrollDownButton>
        </SelectContent>
      </Transition>
    </SelectPortal>
  </SelectRoot>
</template>

<style lang="scss" scoped>
.select-wrapper {
  --uno: flex items-center gap-1 text-base cursor-pointer select-none;
  --uno: ps-3 pe-2 py-1.5;
  --uno: rounded-full bg-orange-200 dark:bg-orange-500/20;
  --uno: transition duration-100;

  .label {
    --uno: flex-grow min-w-0 whitespace-nowrap;
  }
}

.trans-fade-enter-active,
.trans-fade-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.trans-fade-enter-from,
.trans-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

:deep(.popup-wrapper) {
  --uno: ring-1 bg-white dark:bg-black rounded-2xl;
  --uno: z-10 select-none max-w-90vw;
  --uno: overflow-hidden;
  --uno: shadow-2xl shadow-black/20 dark:shadow-white/30;

  .popup-label {
    --uno: m-1 py-1 ps-2 pe-3 min-w-30 min-w-0;
    --uno: rounded-xl;
    --uno: transition-colors;
    --uno: cursor-pointer;

    &[data-disabled] {
      --uno: text-gray-500 dark:text-gray-400;
      --uno: cursor-not-allowed;
    }

    &[data-highlighted] {
      --uno: bg-orange-500/15 dark:bg-orange-500/40 outline-none;
    }

    &.popup-label[data-state="checked"] {
      --uno: bg-orange-900/80 text-white;
    }
  }

  .popup-content {
    --uno: text-base;
  }

  .scroll-button {
    --uno: h-25px flex cursor-default items-center justify-center;
  }
}
</style>
