<template>
  <div class="layout__aside">
    <!-- <component :is="'icon-tag'"></component> -->
    <LayoutMenu class="menu" />
  </div>
</template>

<script setup lang="ts">
import LayoutMenu from './LayoutMenu.vue'
</script>

<style scoped lang="less">
.layout__aside {
  height: 100%;
  border-right: 1px solid var(--color-border-1);
  background: var(--menu-bg-color);

  .menu {
    height: 100%;
  }
}
</style>
