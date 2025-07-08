<script setup lang="ts">
import { computed } from 'vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Progress from '@/components/ui/progress/Progress.vue'
import { useClientStore } from '@/stores/client'
import { useRankStore } from '@/stores/rank'
import { resolveClientAsset } from '@/utils/lcuAsset'

const rankStore = useRankStore()

const profileIconUrl = computed(() => {
  const path = rankStore.info?.summoner?.profileIconUrl
  return path ? resolveClientAsset(path) : ''
})
const userStore = {
  avatar: '',
  nickname: '',
}
const summonerName = computed(() => rankStore.info?.summoner?.gameName || userStore.nickname)
const clientStore = useClientStore()
const clientInfo = computed(() => clientStore.info)
const isConnected = computed(() => clientInfo.value?.connected === true)

// const { t } = useI18n()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6)
    return '凌晨好'
  if (hour < 12)
    return '早上好'
  if (hour < 18)
    return '下午好'
  return '晚上好'
})
</script>

<template>
  <Card class="w-full sm:max-w-2xl shadow-sm">
    <CardContent
      class="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
    >
      <!-- 用户头像 -->
      <Avatar class="w-12 h-12 sm:w-16 sm:h-16">
        <AvatarImage :src="profileIconUrl || 'src/assets/vue.svg'" />
        <AvatarFallback>{{ summonerName?.charAt(0) ?? 'U' }}</AvatarFallback>
      </Avatar>

      <div class="flex-1 space-y-1 w-full">
        <!-- 欢迎语 -->
        <p class="text-base sm:text-lg font-semibold text-center sm:text-left">
          {{ greeting }}！{{ summonerName }}
        </p>

        <!-- 游戏阶段 -->
        <p class="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          游戏状态：
          <span class="font-medium">
            {{ clientInfo?.game_phase || '未知' }}
          </span>
        </p>

        <!-- 客户端路径 -->
        <p class="text-xs sm:text-sm text-muted-foreground break-all text-center sm:text-left">
          客户端路径：
          <span class="font-medium">
            {{ clientInfo?.client_path || '未找到' }}
          </span>
        </p>

        <!-- 端口 + token -->
        <p
          v-if="isConnected"
          class="text-xs sm:text-sm text-muted-foreground text-center sm:text-left"
        >
          端口：
          <span class="font-medium">{{ clientInfo?.port }}</span>
          &nbsp;&nbsp;
          Token：
          <span class="font-medium break-all">{{ clientInfo?.token }}</span>
        </p>

        <!-- 状态徽章 -->
        <p class="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          状态：
          <Badge v-if="isConnected" variant="success">
            已连接
          </Badge>
          <span v-else class="text-red-500 text-xs">等待连接</span>
        </p>

        <!-- 进度条 -->
        <div v-if="!isConnected" class="mt-3">
          <Progress indeterminate class="h-[6px] sm:h-2" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
