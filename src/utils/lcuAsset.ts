// src/utils/lcuAsset.ts
import { CLIENT_PROXY_PREFIX } from '@/constants'

/**
 * 拼接客户端资源地址，如头像、图标等
 * @param path 后端返回的相对路径（例如 /lol-game-data/assets/...）
 * @returns 带完整前缀的 URL
 */
export function resolveClientAsset(path?: string): string {
  if (!path)
    return ''
  return `${CLIENT_PROXY_PREFIX}${path}`
}
