<template>
  <div class="dashboard-card">
    <div class="dashboard-card__copy" @click="clickCopy">
      <a-button shape="circle">
        <template #icon><icon-copy /> </template>
      </a-button>
    </div>
    <div class="dashboard-card__content">
      <div class="dashboard-card__title">{{ props.title }}</div>
      <div v-if="props.desc" class="dashboard-card__desc">{{ props.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from '@/hooks/message'

const props = defineProps<{
  title?: string
  desc?: string
  bgColor?: string
}>()
const message = useMessage()
const clickCopy = () => {
  const save = function (e: any) {
    e.clipboardData.setData('text/plain', props.title)
    e.preventDefault()
  }
  document.addEventListener('copy', save)
  document.execCommand('copy')
  document.removeEventListener('copy', save)
  message.success('复制成功')
}
</script>

<style scoped lang="less">
.dashboard-card {
  position: relative;
  background: v-bind(
    "bgColor ?? 'linear-gradient(143deg, rgba(3,135,252,1) 0%, rgba(31,198,228,1) 100%)'"
  );
  color: #fff;
  padding: 34px 20px 27px;
  min-width: 200px;
  align-items: center;
  border-radius: 8px;
  &__copy {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  &__title {
    font-weight: bold;
    font-size: @font-size-title-3;
    line-height: 1.5;
  }
}
</style>
