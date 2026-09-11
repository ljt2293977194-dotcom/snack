<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Direction } from '../game/types'
import { CELL_SIZE, GRID_COLS, GRID_ROWS, INITIAL_SPEED_MS } from '../game/constants'
import { changeDirection, createInitialState, tick, type GameState } from '../game/gameLoop'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameState = ref<GameState>(createInitialState())

let timerId: number | null = null

/** 把当前游戏状态画到画布上 */
function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const state = gameState.value

  // 清空画布
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 画食物
  ctx.fillStyle = '#e74c3c'
  ctx.fillRect(state.food.x * CELL_SIZE, state.food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

  // 画蛇
  state.snake.forEach((p, i) => {
    ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60' // 蛇头浅绿，身体深绿
    ctx.fillRect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  })

  // 游戏结束遮罩
  if (state.status === 'gameover') {
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = '16px sans-serif'
    ctx.fillText('点击"重新开始"再来一局', canvas.width / 2, canvas.height / 2 + 20)
  }
}

/** 启动游戏循环 */
function startLoop() {
  stopLoop()
  timerId = window.setInterval(() => {
    gameState.value = tick(gameState.value)
    render()
  }, INITIAL_SPEED_MS)
}

/** 停止游戏循环 */
function stopLoop() {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
}

/** 开始游戏 */
function startGame() {
  gameState.value = createInitialState()
  gameState.value.status = 'playing'
  render()
  startLoop()
}

/** 键盘处理 */
function handleKeydown(e: KeyboardEvent) {
  const map: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
  }
  const dir = map[e.key]
  if (dir) {
    e.preventDefault()
    gameState.value = changeDirection(gameState.value, dir)
  }
}

onMounted(() => {
  render()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopLoop()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="game-board">
    <div class="hud">
      <span>得分：{{ gameState.score }}</span>
      <button v-if="gameState.status !== 'playing'" @click="startGame">
        {{ gameState.status === 'gameover' ? '重新开始' : '开始游戏' }}
      </button>
    </div>

    <canvas
      ref="canvasRef"
      :width="GRID_COLS * CELL_SIZE"
      :height="GRID_ROWS * CELL_SIZE"
    />
  </div>
</template>

<style scoped>
.game-board {
  display: inline-block;
}
.hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
}
canvas {
  border: 2px solid #444;
  border-radius: 4px;
  display: block;
}
button {
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  background: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #27ae60;
}
</style>