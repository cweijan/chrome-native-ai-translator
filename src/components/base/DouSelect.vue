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
            <slot
              v-else :value="option.value" :label="option.label" :disabled="option.disabled" :extra="option.extra"
              :index="index"
            />
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
                  <slot
                    v-else :value="option.value" :label="option.label" :disabled="option.disabled"
                    :extra="option.extra" :index="index"
                  />
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
  --uno: flex items-center gap-1 text-sm cursor-pointer select-none;
  --uno: ps-3 pe-2 py-1.5;
  --uno: rounded-lg bg-light-400 dark:bg-dark-800;
  --uno: border-1 border-dark/20 dark:border-light/20;
  --uno: shadow-lg shadow-dark/3 dark:shadow-light/3;
  --uno: transition duration-100;

  .label {
    --uno: flex-grow min-w-0 whitespace-nowrap text-ellipsis overflow-hidden;
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
  --uno: z-10 select-none max-w-90vw;
  --uno: overflow-hidden;
  --uno: rounded-xl bg-light-500/40 dark:bg-dark-400/40;
  --uno: backdrop-blur-md;
  --uno: border-1 border-dark/20 dark:border-light/20;
  --uno: shadow-lg shadow-dark/3 dark:shadow-light/3;

  .popup-label {
    --uno: m-1 py-1 ps-2 pe-3 min-w-30 min-w-0 whitespace-nowrap;
    --uno: rounded-lg;
    --uno: transition-colors;
    --uno: cursor-pointer;

    &[data-disabled] {
      --uno: opacity-50;
      --uno: cursor-not-allowed;
    }

    &[data-highlighted] {
      --uno: bg-dark-300/5 dark:bg-light-300/5 outline-none;
    }

    &.popup-label[data-state="checked"] {
      --uno: from-light-200 to-light-50 bg-linear-to-t dark:from-dark-800 dark:to-dark-400;
      --uno: border-1 border-dark/20 dark:border-light/20;
    }
  }

  .popup-content {
    --uno: text-base;
  }

  .scroll-button {
    --uno: h-25px flex cursor-default items-center justify-center;
    --uno: bg-transparent;
  }
}
</style>
