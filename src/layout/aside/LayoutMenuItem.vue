<template>
  <a-sub-menu v-if="props.data.children && props.data.children.length">
    <template #icon>
      <component :is="props.data.meta.icon" v-if="props.data.meta?.icon"></component>
      <icon-apps v-else-if="isTop" />
      <span v-else class="icon-circle"></span>
    </template>
    <template #title>{{ props.data.meta!.title }}</template>
    <LayoutMenuItem v-for="sub of props.data.children" :key="sub.path" :data="sub" />
  </a-sub-menu>
  <a-menu-item v-else :key="props.data.path">
    <template #icon>
      <component :is="props.data.meta.icon" v-if="props.data.meta?.icon"></component>
      <icon-apps v-else-if="isTop" />
      <span v-else class="icon-circle"></span>
    </template>
    {{ props.data.meta!.title }}
  </a-menu-item>
</template>

<script setup lang="ts">
import { PropType, toRefs, defineProps } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  data: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  isTop: {
    type: Boolean,
    default: false,
  },
})
</script>
