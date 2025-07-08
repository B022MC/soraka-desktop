// src/type/summoner/summonerInfo.ts

export interface RankInfo {
  division: string
  highestDivision: string
  highestTier: string
  highestTierCn: string
  isProvisional: boolean
  leaguePoints: number
  losses: number
  queueType: string
  queueTypeCn: string
  tier: string
  tierCn: string
  wins: number
}

export interface SummonerBasicInfo {
  gameName: string
  platformIdCn: string
  profileIconId: number
  profileIconUrl: string
  puuid: string
  summonerLevel: number
  tagLine: string
  xpSinceLastLevel?: number
  xpUntilNextLevel?: number
  percentCompleteForNextLevel?: number
}
export interface SummonerInfo {
  rank: {
    queueMap: {
      RANKED_FLEX_SR?: RankInfo
      RANKED_SOLO_5x5?: RankInfo
      [key: string]: RankInfo | undefined // 允许其他排位类型
    }
  }
  summoner: SummonerBasicInfo
}
