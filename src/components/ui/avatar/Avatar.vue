<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <Primitive
      as="div"
      data-slot="avatar"
      :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', $props.class)"
  >
    <slot />
  </Primitive>
</template>
