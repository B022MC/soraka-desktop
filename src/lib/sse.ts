const DEFAULT_PORT = 8022
const host = import.meta.env.VITE_API_HOST || location.hostname
const BASE_URL = `http://${host}:${DEFAULT_PORT}`

export interface SSEOptions {
  onMessage: (data: any) => void
  onError?: (event: Event) => void
  onOpen?: (event: Event) => void
  autoReconnect?: boolean
  reconnectInterval?: number
}

/**
 * 创建一个 SSE 实例，支持自动重连
 */
export function createSSE(path: string, options: SSEOptions): {
  start: () => void
  close: () => void
} {
  let eventSource: EventSource | null = null
  let reconnectTimer: number | null = null

  const fullUrl = `${BASE_URL}${path}`

  const connect = () => {
    console.info(`[SSE] Connecting to ${fullUrl}`)
    eventSource = new EventSource(fullUrl)

    eventSource.onopen = (event) => {
      console.info('[SSE] Connected.')
      options.onOpen?.(event)
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        options.onMessage(data)
      } catch (e) {
        console.warn('[SSE] JSON parse error:', e)
      }
    }

    eventSource.onerror = (event) => {
      console.warn('[SSE] Connection error. Reconnecting...', event)
      options.onError?.(event)
      eventSource?.close()
      eventSource = null

      if (options.autoReconnect) {
        reconnectTimer = window.setTimeout(() => {
          connect()
        }, options.reconnectInterval || 3000)
      }
    }
  }

  return {
    start: connect,
    close: () => {
      if (reconnectTimer)
        clearTimeout(reconnectTimer)
      if (eventSource)
        eventSource.close()
      console.info('[SSE] Connection closed.')
    },
  }
}
