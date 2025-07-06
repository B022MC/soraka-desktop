<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  modelValue?: number
  indeterminate?: boolean
}>()
</script>

<template>
  <div
      role="progressbar"
      aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="indeterminate ? undefined : modelValue"
      :class="cn(
      'relative h-[0.375rem] sm:h-2 w-full overflow-hidden rounded-full bg-muted',
      $props.class,
    )"
  >
    <!-- 有具体数值 -->
    <div
        v-if="!indeterminate"
        class="h-full w-full bg-primary transition-all duration-300"
        :style="{ transform: `translateX(-${100 - (modelValue ?? 0)}%)` }"
    />

    <!-- 无限加载动画 -->
    <div
        v-else
        class="absolute top-0 left-0 h-full w-1/3 min-w-[30px] sm:min-w-[48px] bg-primary animate-progress-indeterminate will-change-transform"
    />
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s infinite ease-in-out;
}
</style>
