<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string; variant?: 'default' | 'success' | 'destructive' }>()
</script>

<template>
  <Primitive
      as="span"
      data-slot="badge"
      :class="cn(
      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors',
      {
        'bg-primary text-primary-foreground': !variant || variant === 'default',
        'bg-green-500 text-white': variant === 'success',
        'bg-red-500 text-white': variant === 'destructive'
      },
      $props.class
    )"
  >
    <slot />
  </Primitive>
</template>
