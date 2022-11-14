<template>
  <div class="menu">
    <a-scrollbar style="height: 100%; overflow-y: auto">
      <a-menu
        v-model:collapsed="collapsed"
        auto-open-selected
        :default-selected-keys="activeMenu"
        :style="{ width: '200px' }"
        accordion
        show-collapse-button
        :theme="theme"
        @menu-item-click="handleClick"
      >
        <LayoutMenuItem v-for="menu of menuList" :key="menu.path" :data="menu" is-top />
      </a-menu>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { useMenu } from '@/hooks/auth'
import LayoutMenuItem from './LayoutMenuItem.vue'
import { useRouter } from 'vue-router'
const { theme } = useGlobalStore()
const collapsed = ref(false)
const left = computed(() => (collapsed.value ? '-4px' : '-8px'))

const menuList = useMenu()
const router = useRouter()
const activeMenu = ref([router.currentRoute.value.path])
const handleClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="less">
.menu {
  position: relative;
  .arco-scrollbar {
    height: 100%;
  }
  :deep(.arco-menu) {
    --color-menu-dark-bg: transparent;
    height: 100%;
    .arco-menu-inner {
      padding-right: 0;
    }

    .arco-menu-inner > .arco-menu-selected,
    .arco-menu-inner > .arco-menu-inline > .arco-menu-selected {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: v-bind(left);
        display: inline-block;
        width: 6px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }
    }
  }
}
</style>
