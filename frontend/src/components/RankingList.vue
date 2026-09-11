<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchTopScores, type Score } from '../api/score'

const scores = ref<Score[]>([])
const loading = ref(false)
const errorMsg = ref('')

/** 拉取排行榜 */
async function load() {
  loading.value = true
  errorMsg.value = ''
  try {
    scores.value = await fetchTopScores(10)
  } catch (e) {
    errorMsg.value = '加载失败：' + (e as Error).message
  } finally {
    loading.value = false
  }
}

/** 格式化时间显示 */
function formatTime(iso: string): string {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '-'
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

onMounted(load)
</script>

<template>
  <div class="ranking">
    <h2>🏆 排行榜</h2>

    <p v-if="loading" class="status">加载中...</p>
    <p v-else-if="errorMsg" class="status error">{{ errorMsg }}</p>
    <p v-else-if="scores.length === 0" class="status">还没有记录，快来玩一局吧</p>

    <ol v-else class="list">
      <li v-for="(s, i) in scores" :key="s.id">
        <span class="rank">{{ i + 1 }}</span>
        <span class="name">{{ s.playerName }}</span>
        <span class="score">{{ s.score }}</span>
        <span class="time">{{ formatTime(s.createdAt) }}</span>
      </li>
    </ol>

    <button :disabled="loading" @click="load">刷新</button>
  </div>
</template>

<style scoped>
.ranking {
  display: inline-block;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 6px;
  min-width: 400px;
}
h2 {
  margin: 0 0 15px;
  font-size: 20px;
}
.status {
  color: #888;
  font-size: 14px;
}
.status.error {
  color: #e74c3c;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px;
}
.list li {
  display: grid;
  grid-template-columns: 30px 1fr 60px 130px;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #333;
  font-size: 14px;
  text-align: left;
}
.rank {
  color: #f39c12;
  font-weight: bold;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.score {
  color: #2ecc71;
  font-weight: bold;
  text-align: right;
}
.time {
  color: #666;
  font-size: 12px;
}
button {
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
}
button:hover:not(:disabled) {
  background: #2980b9;
}
button:disabled {
  background: #666;
  cursor: not-allowed;
}
</style>