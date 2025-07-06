<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ src?: string; alt?: string; class?: string }>()
</script>

<template>
  <img
      :src="src"
      :alt="alt"
      :class="cn('aspect-square h-full w-full object-cover', $props.class)"
  />
</template>
