/**
 * 游戏主循环：定义游戏状态和执行一步逻辑。
 * 纯逻辑模块，不含定时器，不依赖浏览器 API。
 */

import type { Direction, GameStatus, Point } from './types'
import { SCORE_PER_FOOD } from './constants'
import {
  createSnake,
  directionToDelta,
  isHitSelf,
  isHitWall,
  isOpposite,
  moveSnake,
} from './snake'
import { createFood, isEating } from './food'

/**
 * 完整的游戏状态。
 * 整个游戏的所有信息都在这个对象里，便于快照、回放、测试。
 */
export interface GameState {
  snake: Point[]
  food: Point
  direction: Direction
  nextDirection: Direction
  status: GameStatus
  score: number
}

/**
 * 创建初始游戏状态。
 */
export function createInitialState(): GameState {
  const snake = createSnake()
  return {
    snake,
    food: createFood(snake),
    direction: 'right',
    nextDirection: 'right',
    status: 'idle',
    score: 0,
  }
}

/**
 * 执行一步游戏逻辑，返回新的状态对象。
 * 输入输出都是不可变的（不修改原 state）。
 *
 * @param state 当前状态
 * @returns 新状态
 */
export function tick(state: GameState): GameState {
  // 非游戏进行中，状态不变
  if (state.status !== 'playing') {
    return state
  }

  // 1. 采用下一次的方向
  const direction = state.nextDirection

    // 2. 预判是否吃到食物
    const delta = directionToDelta(direction)
    // 蛇永远至少有一节
    const head = state.snake[0]!
    const nextHead: Point = { x: head.x + delta.x, y: head.y + delta.y }
  const willEat = isEating(nextHead, state.food)

  // 3. 移动蛇
  const newSnake = moveSnake(state.snake, direction, willEat)

  // 4. 碰撞检测
  if (isHitWall(newSnake[0]!) || isHitSelf(newSnake)) {
    return {
      ...state,
      snake: newSnake,
      direction,
      status: 'gameover',
    }
  }

  // 5. 吃到食物：加分 + 生成新食物
  if (willEat) {
    return {
      ...state,
      snake: newSnake,
      direction,
      food: createFood(newSnake),
      score: state.score + SCORE_PER_FOOD,
    }
  }

  // 6. 普通移动
  return {
    ...state,
    snake: newSnake,
    direction,
  }
}

/**
 * 把方向存到 nextDirection。
 * 不能和当前方向相反（禁止 180 度掉头）。
 */
export function changeDirection(state: GameState, dir: Direction): GameState {
  if (isOpposite(state.direction, dir)) {
    return state
  }

  return { ...state, nextDirection: dir }
}