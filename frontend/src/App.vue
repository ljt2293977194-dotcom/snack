<script setup lang="ts">
import GameBoard from './components/GameBoard.vue'
import RankingList from './components/RankingList.vue'
</script>

<template>
  <div class="app">
    <h1>Snack 贪吃蛇</h1>
    <GameBoard />
    <RankingList />
  </div>
</template>

<style scoped>
.app {
  text-align: center;
  padding: 30px 20px;
  font-family: sans-serif;
  color: #eee;
  background: #222;
  min-height: 100vh;
}
</style>