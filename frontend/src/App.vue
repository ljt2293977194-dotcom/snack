<script setup lang="ts">
import { ref, onMounted } from 'vue'

const healthStatus = ref<string>('加载中...')
const healthTime = ref<string>('')
const errorMsg = ref<string>('')

async function checkHealth() {
  try {
    const res = await fetch('http://localhost:8080/api/health')
    const json = await res.json()
    if (json.code === 0) {
      healthStatus.value = json.data.status
      healthTime.value = json.data.timestamp
    } else {
      errorMsg.value = json.message
    }
  } catch (e) {
    errorMsg.value = String(e)
  }
}

onMounted(() => {
  checkHealth()
})
</script>

<template>
  <div style="text-align: center; padding: 40px; font-family: sans-serif">
    <h1>Snack 贪吃蛇</h1>
    <h2>前后端联通性检查</h2>

    <p v-if="healthStatus === 'ok'" style="color: green">
      ✅ 后端连接正常
    </p>
    <p v-else-if="errorMsg" style="color: red">
      ❌ 连接失败：{{ errorMsg }}
    </p>
    <p v-else>⏳ {{ healthStatus }}</p>

    <p v-if="healthTime" style="color: #666; font-size: 14px">
      服务器时间：{{ healthTime }}
    </p>
  </div>
</template>