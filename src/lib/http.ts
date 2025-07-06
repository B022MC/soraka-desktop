import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from './schema'
import axios from 'axios'

const HOST = import.meta.env.VITE_API_HOST || window.location.hostname
const BASE_URL = `http://${HOST}:8022`

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

// 请求拦截器（结构保留）
http.interceptors.request.use((config) => {
  return config
})

// 响应拦截器（统一错误处理）
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // 可添加全局提示逻辑
    console.error('[HTTP ERROR]', error)
    return Promise.reject(error)
  },
)

/**
 * 泛型请求函数，自动返回业务 data
 */
export async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<ApiResponse<T>> = await http.request(config)
  const data = res.data
  if (data.code !== 0) {
    throw new Error(data.msg || '请求失败')
  }
  return data.data
}
