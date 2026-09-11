<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Direction } from '../game/types'
import { CELL_SIZE, GRID_COLS, GRID_ROWS, INITIAL_SPEED_MS } from '../game/constants'
import { changeDirection, createInitialState, tick, type GameState } from '../game/gameLoop'
import { fetchTopScores, uploadScore } from '../api/score'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameState = ref<GameState>(createInitialState())

// 最高分（从后端拉取）
const bestScore = ref<number>(0)

// 上传状态
const playerName = ref<string>('')
const uploading = ref<boolean>(false)
const uploadMsg = ref<string>('')

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
    ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60'
    ctx.fillRect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  })

  // 游戏结束遮罩
  if (state.status === 'gameover') {
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 30)
    ctx.font = '16px sans-serif'
    ctx.fillText(`本局得分：${state.score}`, canvas.width / 2, canvas.height / 2 + 5)
  }
}

/** 启动游戏循环 */
function startLoop() {
  stopLoop()
  timerId = window.setInterval(() => {
    const prev = gameState.value
    gameState.value = tick(prev)
    render()
    // 检测是否刚结束
    if (prev.status === 'playing' && gameState.value.status === 'gameover') {
      onGameOver()
    }
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
  uploadMsg.value = ''
  render()
}

/** 游戏结束回调 */
async function onGameOver() {
  stopLoop()
  // 如果本局分数为 0，直接刷新最高分即可
  if (gameState.value.score === 0) {
    await loadBestScore()
    return
  }
  // 等玩家填昵称后点"上传分数"
}

/** 上传分数 */
async function submitScore() {
  const name = playerName.value.trim()
  if (!name) {
    uploadMsg.value = '请输入昵称'
    return
  }
  uploading.value = true
  uploadMsg.value = ''
  try {
    await uploadScore(name, gameState.value.score)
    uploadMsg.value = '上传成功！'
    await loadBestScore()
  } catch (e) {
    uploadMsg.value = '上传失败：' + (e as Error).message
  } finally {
    uploading.value = false
  }
}

/** 加载最高分 */
async function loadBestScore() {
  try {
    const list = await fetchTopScores(1)
    bestScore.value = list[0]?.score ?? 0
  } catch {
    // 后端没起或网络问题，忽略
  }
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
  if (!dir) return

  e.preventDefault()

  if (gameState.value.status !== 'playing') return

  if (timerId === null) {
    startLoop()
  }

  gameState.value = changeDirection(gameState.value, dir)
}

onMounted(() => {
  render()
  loadBestScore()
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
      <span>最高分：{{ bestScore }}</span>
      <button v-if="gameState.status !== 'playing'" @click="startGame">
        {{ gameState.status === 'gameover' ? '重新开始' : '开始游戏' }}
      </button>
    </div>

    <canvas
      ref="canvasRef"
      :width="GRID_COLS * CELL_SIZE"
      :height="GRID_ROWS * CELL_SIZE"
    />

    <!-- 游戏结束时显示上传表单 -->
    <div v-if="gameState.status === 'gameover' && gameState.score > 0" class="upload-panel">
      <input
        v-model="playerName"
        type="text"
        placeholder="输入昵称（1-20字符）"
        maxlength="20"
        :disabled="uploading"
      />
      <button :disabled="uploading" @click="submitScore">
        {{ uploading ? '上传中...' : '上传分数' }}
      </button>
      <p v-if="uploadMsg" class="upload-msg">{{ uploadMsg }}</p>
    </div>

    <p class="tips">
      {{ gameState.status === 'playing' && timerId === null
        ? '按方向键或 WASD 开始移动'
        : '方向键或 WASD 控制方向' }}
    </p>
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
  gap: 20px;
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
button:hover:not(:disabled) {
  background: #27ae60;
}
button:disabled {
  background: #666;
  cursor: not-allowed;
}
.upload-panel {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.upload-panel input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #444;
  border-radius: 4px;
  background: #333;
  color: #eee;
}
.upload-msg {
  width: 100%;
  font-size: 14px;
  color: #f39c12;
}
.tips {
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}
</style>