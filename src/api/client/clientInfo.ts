import type { ClientInfo } from '@/type/client/clientInfo'
import { request } from '@/lib/http'
import { createSSE } from '@/lib/sse'
import { useClientStore } from '@/stores/client'

export async function fetchClientInfo() {
  return await request<ClientInfo>({
    url: '/client/getClientInfo',
    method: 'GET',
  })
}

// clientInfo.ts
export const fetchClientInfoSse = createSSE('/client/streamClientInfo', {
  onMessage(data) {
    useClientStore().setInfo(data)
  },
  autoReconnect: true,
})
