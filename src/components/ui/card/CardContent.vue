<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <Primitive
      as="div"
      data-slot="card-content"
      :class="cn('p-6', $props.class)"
  >
    <slot />
  </Primitive>
</template>
