import type { SummonerInfo } from '@/type/summoner/summonerInfo'
import { request } from '@/lib/http'

/**
 * 获取召唤师排位信息
 * @param params 查询参数，支持 name 或 puuid
 */
export async function getRankInfo(params?: { name?: string, puuid?: string }) {
  return await request<SummonerInfo>({
    url: '/lcu/getRankInfo',
    method: 'GET',
    params,
  })
}
