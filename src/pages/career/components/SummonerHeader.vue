<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CircularProgress from '@/components/ui/progress/CircularProgress.vue'
import { useRankStore } from '@/stores/rank'
import { resolveClientAsset } from '@/utils/lcuAsset'

const rankStore = useRankStore()
const summoner = computed(() => rankStore.info?.summoner)
const defaultAvatar = new URL('@/assets/logo.png', import.meta.url).href

const expPercent = computed(() => {
  const current = rankStore.info?.summoner?.xpSinceLastLevel ?? 0
  const next = rankStore.info?.summoner?.xpUntilNextLevel ?? 0
  const percent = rankStore.info?.summoner?.percentCompleteForNextLevel

  if (percent !== undefined && percent !== null) {
    return Math.min(Math.max(percent, 0), 100)
  }

  const total = current + next
  if (total > 0) {
    return Math.min(Math.max((current / total) * 100, 0), 100)
  }

  return 0
})

function onRefresh() {
  // 可扩展刷新逻辑
  console.log('点击刷新召唤师信息')
}

function onShowHistory() {
  console.log('点击查看历史战绩')
}

const columns = [
  { title: '类型', dataIndex: 'type', align: 'center' },
  { title: '总场次', dataIndex: 'total', align: 'center' },
  { title: '胜率', dataIndex: 'rate', align: 'center' },
  { title: '胜场', dataIndex: 'wins', align: 'center' },
  { title: '负场', dataIndex: 'loses', align: 'center' },
  { title: '段位', dataIndex: 'rank', align: 'center' },
  { title: '胜点', dataIndex: 'lp', align: 'center' },
  { title: '赛季最高', dataIndex: 'seasonMax', align: 'center' },
  { title: '上赛季结算', dataIndex: 'lastSeason', align: 'center' },
]

const rankData = ref<any[]>([])

onMounted(() => {
  const queueMap = rankStore.info?.rank.queueMap
  if (queueMap) {
    rankData.value = Object.entries(queueMap).map(([key, item]) => ({
      type: item.queueTypeCn || item.queueType || key,
      total: item.wins + item.losses,
      rate: `${Math.round((item.wins / (item.wins + item.losses)) * 100)}%`,
      wins: item.wins,
      loses: item.losses,
      rank: `${item.tierCn || item.tier} ${item.division}`,
      lp: item.leaguePoints,
      seasonMax: `${item.highestTierCn} ${item.highestDivision}`,
      lastSeason: '未知', // 如有 last season 数据可填充
    }))
  }
})
</script>

<template>
  <div class="summoner-header bg-white dark:bg-zinc-900 border border-border dark:border-zinc-700 rounded-xl p-4 shadow-md relative transition-colors">    <!-- 操作按钮 -->
    <div class="absolute top-3 right-4 flex gap-2">
      <button class="text-xs text-muted-foreground hover:text-primary" @click="onRefresh">
        刷新
      </button>
      <button class="text-xs text-muted-foreground hover:text-primary" @click="onShowHistory">
        历史战绩
      </button>
    </div>

    <!-- 等级与头像 -->
    <div class="relative w-[88px] h-[88px] mx-auto">
      <CircularProgress :percent="expPercent" :size="88" :stroke="6" class="avatar-progress" />
      <img
        :src="summoner?.profileIconUrl ? resolveClientAsset(summoner.profileIconUrl) : defaultAvatar"
        class="w-[75px] h-[75px] rounded-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow"
      >
      <div class="text-xs text-center text-green-600 font-semibold mt-1">
        {{ summoner?.summonerLevel ?? '--' }}
      </div>
    </div>

    <!-- 昵称和标签 -->
    <div class="text-center mt-3 font-semibold text-lg">
      {{ summoner?.gameName || '未知召唤师' }}
    </div>
    <div class="text-center text-xs text-muted-foreground">
      #{{ summoner?.tagLine || '0000' }}
    </div>

    <!-- 排位表格 -->
    <div class="mt-6">
      <table class="w-full text-sm border rounded overflow-hidden">
        <thead class="bg-muted">
          <tr>
            <th v-for="col in columns" :key="col.dataIndex" class="px-2 py-1 text-center font-medium">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rankData" :key="row.type" class="border-t hover:bg-muted/30">
            <td v-for="col in columns" :key="col.dataIndex" class="text-center px-2 py-1">
              {{ row[col.dataIndex] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.avatar-progress {
  display: block;
}
</style>
