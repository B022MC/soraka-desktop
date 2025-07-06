<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <Primitive
      as="div"
      data-slot="card"
      :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', $props.class)"
  >
    <slot />
  </Primitive>
</template>
