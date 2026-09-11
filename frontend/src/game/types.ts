/**
 * 游戏通用类型定义。
 */

/** 坐标点（以格子为单位，不是像素） */
export interface Point {
    x: number
    y: number
  }
  
  /** 移动方向 */
  export type Direction = 'up' | 'down' | 'left' | 'right'
  
  /** 游戏状态 */
  export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover'