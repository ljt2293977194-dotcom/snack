/**
 * 游戏常量配置。
 * 所有"魔法数字"集中在这里，方便统一调整。
 */

/** 画布格子数：横向 20 格，纵向 20 格 */
export const GRID_COLS = 20
export const GRID_ROWS = 20

/** 每个格子的像素大小（画布总尺寸 = 格子数 × 格子像素） */
export const CELL_SIZE = 20

/** 游戏初始速度：每步间隔毫秒数（数字越小蛇跑越快） */
export const INITIAL_SPEED_MS = 150

/** 每吃一个食物得多少分 */
export const SCORE_PER_FOOD = 10

/** 蛇的初始长度（含头） */
export const INITIAL_SNAKE_LENGTH = 3

/** 蛇的初始位置（头部坐标，以格子为单位） */
export const INITIAL_SNAKE_HEAD = { x: 10, y: 10 }