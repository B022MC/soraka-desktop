<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: number
  stroke?: number
  color?: string
  percent: number
}>()

const size = computed(() => props.size ?? 88)
const strokeWidth = computed(() => props.stroke ?? 6)
const radius = computed(() => (size.value - strokeWidth.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() =>
    circumference.value * (1 - props.percent / 100),
)
</script>

<template>
  <svg
      :width="size"
      :height="size"
      class="rotate-[-90deg]"
      viewBox="0 0 100 100"
      :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <!-- 背景圆 -->
    <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke-width="strokeWidth"
        class="text-gray-200"
        stroke="currentColor"
    />
    <!-- 进度圆 -->
    <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="color || '#22c55e'"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
    />
  </svg>
</template>
