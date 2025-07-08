<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
import { watch } from 'vue'
import { getRankInfo } from '@/api/summoner/summonerInfo.ts'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'

import { TooltipProvider } from '@/components/ui/tooltip'
import { useClientStore } from '@/stores/client'
import { useRankStore } from '@/stores/rank'

// 启动监听 client 状态变化
const clientStore = useClientStore()
const rankStore = useRankStore()

watch(
  () => clientStore.info,
  async (info) => {
    if (info) {
      try {
        const rankInfo = await getRankInfo()
        rankStore.setInfo(rankInfo)
      }
      catch (err) {
        console.warn('获取排位信息失败:', err)
        rankStore.clear()
      }
    }
    else {
      rankStore.clear()
    }
  },
  { immediate: true },
)
</script>

<template>
  <ConfigProvider>
    <AppTopbar />
    <TooltipProvider>
      <main class="flex">
        <AppSidebar />
        <section class="bg-background grow p-4">
          <router-view />
        </section>
      </main>
    </TooltipProvider>
  </ConfigProvider>
</template>
