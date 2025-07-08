// src/stores/client.ts
import type { ClientInfo } from '@/type/client/clientInfo'

import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
  state: () => ({
    info: null as ClientInfo | null,
  }),
  actions: {
    setInfo(data: ClientInfo) {
      if (JSON.stringify(this.info) !== JSON.stringify(data)) {
        this.info = data
      }
    },
  },
})
