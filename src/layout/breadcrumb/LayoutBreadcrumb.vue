<template>
  <div v-if="cur.meta.title" class="layout__breadcrumb">
    <div class="layout__breadcrumb-title">{{ cur.meta.title }}</div>
    <div>
      <a-breadcrumb>
        <template #separator>
          <icon-right />
        </template>
        <a-breadcrumb-item>
          <icon-home />
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="item of list" :key="item.path">{{
          item.meta.title
        }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const list = computed(() => router.currentRoute.value.matched.filter((x) => x.meta && x.meta.menu))
const cur = router.currentRoute
</script>

<style scoped lang="less">
.layout__breadcrumb {
  margin-bottom: 17px;
  &-title {
    color: var(--color-text-1);
    font-size: @font-size-title-3;
    font-weight: bold;
    margin-bottom: 18px;
  }
}
</style>
