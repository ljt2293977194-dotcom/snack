/**
 * 食物逻辑：随机生成食物位置，且不能和蛇身重叠。
 */

import type { Point } from './types'
import { GRID_COLS, GRID_ROWS } from './constants'

/**
 * 在空格子里随机生成一个食物。
 * @param snake 当前蛇身，食物不能落在这些格子上
 * @returns 食物坐标
 */
export function createFood(snake: Point[]): Point {
  // 1. 先找出所有空格子
  const empty: Point[] = []
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      if (!snake.some((p) => p.x === x && p.y === y)) {
        empty.push({ x, y })
      }
    }
  }

  // 2. 没有空格子说明蛇已经填满整个棋盘，这种情况游戏应该结束
  if (empty.length === 0) {
    throw new Error('棋盘已满，无法生成食物')
  }

  // 3. 从空格子里随机选一个
  // empty 已确认非空（上面检查过 length === 0），所以取下标一定存在
  const index = Math.floor(Math.random() * empty.length)
  return empty[index]!
}

/**
 * 判断蛇头是否吃到食物。
 */
export function isEating(head: Point, food: Point): boolean {
  return head.x === food.x && head.y === food.y
}