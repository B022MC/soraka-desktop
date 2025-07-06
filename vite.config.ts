import path from 'node:path'
import os from 'node:os'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// 获取本机局域网 IP，用于 Vite HMR WebSocket host
function getLocalIP() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name]
    if (!iface) continue
    for (const i of iface) {
      if (i.family === 'IPv4' && !i.internal) {
        return i.address
      }
    }
  }
  return 'localhost'
}

// 允许通过环境变量覆盖 IP（优先）
// 如：TAURI_DEV_HOST=192.168.1.66 pnpm tauri dev
const localIP = process.env.TAURI_DEV_HOST || getLocalIP()

export default defineConfig(() => ({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  clearScreen: false,
  server: {
    host: '0.0.0.0', // ✅ 监听所有地址
    port: 1420,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: localIP, // ✅ 解决 ENOTFOUND 问题
      port: 1421,
    },
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
}))
