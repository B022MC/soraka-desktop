<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import WelcomeCard from '@/pages/home/components/WelcomeCard.vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-4xl font-bold">
      {{ t('home.label') }}
    </h1>

    <!-- 使用卡片组件 -->
    <WelcomeCard />
  </div>
</template>
