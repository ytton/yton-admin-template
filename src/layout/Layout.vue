<template>
  <div class="layout">
    <LayoutHeader />
    <div class="bottom">
      <LayoutAside />
      <a-scrollbar class="content" outer-style="flex:1">
        <main>
          <LayoutBreadcrumb />
          <div class="wrap">
            <router-view></router-view>
          </div>
        </main>
        <LayoutFooter v-if="isShowFooter" />
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './header/LayoutHeader.vue'
import LayoutBreadcrumb from './breadcrumb/LayoutBreadcrumb.vue'
import LayoutFooter from './footer/LayoutFooter.vue'
import LayoutAside from './aside/LayoutAside.vue'
import { useGlobalStore } from '@/stores/global'
import { computed } from 'vue'
const { isShowFooter } = useGlobalStore()
const FooterHeight = computed(() => (isShowFooter.value ? '50px' : '0px'))
</script>

<style scoped lang="less">
.layout {
  width: 100vw;
  height: 100vh;
  &__aside {
    flex: 0 0 auto;
  }
  &__header {
    height: 60px;
  }
  .bottom {
    display: flex;
    width: 100vw;
    height: calc(100vh - 60px);
    :deep(.content) {
      height: calc(100vh - 60px);
      flex: 1;
      overflow-y: scroll;
      background: var(--content-bg-color);
      main {
        height: calc(100vh - 60px - v-bind(FooterHeight));
        box-sizing: border-box;
        padding: 25px 30px;
        .wrap {
          height: calc(100% - 87px);
        }
      }
    }
  }
}
</style>
