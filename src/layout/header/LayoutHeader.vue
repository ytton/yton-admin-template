<template>
  <div class="layout__header">
    <div class="logo"><img src="@/assets/vue.svg" alt="logo" /><span>yton</span></div>
    <div class="actions">
      <a-button type="text">
        <template #icon>
          <icon-language />
        </template>
      </a-button>
      <a-button type="text" @click="toggleTheme">
        <template #icon>
          <icon-sun-fill v-if="theme === 'light'" />
          <icon-moon-fill v-else />
        </template>
      </a-button>
      <a-button type="text">
        <template #icon>
          <icon-notification />
        </template>
      </a-button>
    </div>
    <div class="user">
      <a-dropdown @select="handleSelect($event as string)">
        <a-badge :count="9" dot :dot-style="{ width: '10px', height: '10px' }">
          <a-avatar shape="square">
            <img v-if="userInfo?.user.avatar" :src="userInfo?.user.avatar" alt="" />
            <span v-else>{{ userInfo?.user.username }}</span>
          </a-avatar>
        </a-badge>
        <template #content>
          <a-doption value="setting">个人设置</a-doption>
          <a-doption value="exit">退出登录</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const { theme, toggleTheme } = useGlobalStore()
const { logoutAction, userInfo } = useAuthStore()
const router = useRouter()
const handleSelect = (op: string): any => {
  switch (op) {
    case 'setting':
      break
    case 'exit':
      logoutAction()
      router.push('/login')
      break
    default:
  }
}
</script>

<style scoped lang="less">
.layout__header {
  display: flex;
  align-items: center;
  padding: 0 40px;
  padding-left: 20px;
  background-color: var(--header-bg-color);
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border-2);
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 60px;
    font-size: 20px;
    color: var(--color-text-1);
    border-bottom: 1px solid var(--color-border-1);
    margin-right: auto;
    > img {
      width: 30px;
      height: 30px;
    }
    > span {
      margin-left: 15px;
    }
  }
  .actions {
    margin: 0 20px;
    padding: 0 20px;
    border-right: 1px solid var(--color-border-4);
    .arco-btn {
      font-size: 18px;
      color: var(--color-text-1);
      &:hover {
        background-color: transparent;
      }
    }
    .arco-btn + .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>
