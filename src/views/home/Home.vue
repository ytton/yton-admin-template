<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main'
const { count, updateCount } = useMainStore()

const increment = () => {
  updateCount(count.value + 1)
}
</script>

<style scoped lang="less"></style>
