/**
 * 蛇的逻辑：创建、移动、增长、碰撞检测。
 * 纯函数模块，不依赖任何 Vue 或浏览器 API，便于单元测试。
 */

import type { Direction, Point } from './types'
import {
  INITIAL_SNAKE_HEAD,
  INITIAL_SNAKE_LENGTH,
  GRID_COLS,
  GRID_ROWS,
} from './constants'

/**
 * 根据方向，算出下一步的偏移量。
 */
export function directionToDelta(direction: Direction): Point {
  switch (direction) {
    case 'up':
      return { x: 0, y: -1 }
    case 'down':
      return { x: 0, y: 1 }
    case 'left':
      return { x: -1, y: 0 }
    case 'right':
      return { x: 1, y: 0 }
  }
}

/**
 * 判断两个方向是否相反（用于禁止 180 度掉头）。
 */
export function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'up' && b === 'down') ||
    (a === 'down' && b === 'up') ||
    (a === 'left' && b === 'right') ||
    (a === 'right' && b === 'left')
  )
}

/**
 * 创建初始蛇：水平排列，头在右，尾在左。
 */
export function createSnake(): Point[] {
  const snake: Point[] = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({
      x: INITIAL_SNAKE_HEAD.x - i,
      y: INITIAL_SNAKE_HEAD.y,
    })
  }
  return snake
}

/**
 * 计算蛇的下一步位置（头部新位置）。
 * @param snake 当前蛇身
 * @param direction 移动方向
 * @param willEat 是否吃到食物（吃到了尾巴不动，否则尾巴缩掉）
 * @returns 新蛇身数组
 */
export function moveSnake(
  snake: Point[],
  direction: Direction,
  willEat: boolean,
): Point[] {
    const delta = directionToDelta(direction)
  // 蛇永远至少有一节（由游戏逻辑保证），所以 snake[0] 一定存在
  const head = snake[0]!
  const newHead: Point = {
    x: head.x + delta.x,
    y: head.y + delta.y,
  }

  const newSnake = [newHead, ...snake]

  if (!willEat) {
    // 没吃到食物，去掉尾巴，长度不变
    newSnake.pop()
  }
  // 吃到食物，不去尾巴，长度 +1

  return newSnake
}

/**
 * 判断是否撞墙。
 */
export function isHitWall(head: Point): boolean {
  return (
    head.x < 0 ||
    head.x >= GRID_COLS ||
    head.y < 0 ||
    head.y >= GRID_ROWS
  )
}

/**
 * 判断是否撞到自己。
 * 注意：传入的 snake 是"移动后"的蛇，检查头是否和后面身体重叠。
 */
export function isHitSelf(snake: Point[]): boolean {
    // 蛇永远至少有一节，head 一定存在
    const head = snake[0]!
    return snake.slice(1).some((p) => p.x === head.x && p.y === head.y)
  }