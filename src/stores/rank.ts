// src/stores/rank.ts
import type { SummonerInfo } from '@/type/summoner/summonerInfo'
import { defineStore } from 'pinia'

export const useRankStore = defineStore('rank', {
  state: () => ({
    info: null as SummonerInfo | null,
  }),
  actions: {
    setInfo(data: SummonerInfo) {
      this.info = data
    },
    clear() {
      this.info = null
    },
  },
})
