<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <Primitive
      as="div"
      data-slot="avatar-fallback"
      :class="cn('flex h-full w-full items-center justify-center bg-muted text-muted-foreground', $props.class)"
  >
    <slot />
  </Primitive>
</template>
