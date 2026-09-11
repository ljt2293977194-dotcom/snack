/**
 * 分数相关接口调用。
 * 所有和分数有关的 HTTP 请求集中在这里。
 */

/** 后端统一响应格式 */
export interface ApiResponse<T> {
    code: number
    message: string
    data: T
  }
  
  /** 分数记录 */
  export interface Score {
    id: number
    playerName: string
    score: number
    createdAt: string
  }
  
  /** 后端服务地址 */
  const BASE_URL = 'http://localhost:8080'
  
  /**
   * 上传分数。
   * @returns 保存后的记录；失败抛出异常
   */
  export async function uploadScore(playerName: string, score: number): Promise<Score> {
    const res = await fetch(`${BASE_URL}/api/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, score }),
    })
    const json: ApiResponse<Score> = await res.json()
    if (json.code !== 0) {
      throw new Error(json.message)
    }
    return json.data
  }
  
  /**
   * 查询排行榜。
   * @param limit 返回条数
   */
  export async function fetchTopScores(limit = 10): Promise<Score[]> {
    const res = await fetch(`${BASE_URL}/api/scores/top?limit=${limit}`)
    const json: ApiResponse<Score[]> = await res.json()
    if (json.code !== 0) {
      throw new Error(json.message)
    }
    return json.data
  }