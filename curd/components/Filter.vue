<template>
  <a-form :model="filter" class="filter" layout="inline">
    <a-form-item label="Show">
      <a-pagination
        v-model:page-size="filter.size"
        :total="replaceMeList?.meta?.total ?? 0"
        class="page-size"
        show-page-size
        @page-size-change="getReplaceMesListAction"
      />
    </a-form-item>
    <a-form-item hide-label class="ml right">
      <a-input-search
        v-model="filter.keywords"
        :style="{ width: '320px' }"
        placeholder="Please enter something"
        @search="getReplaceMesListAction"
      />
      <a-button type="primary" @click="add()">
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
      <a-button>
        <template #icon>
          <icon-more-vertical />
        </template>
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { useReplaceMeStore } from '@/stores/replaceMes'

const { filter, replaceMeList, getReplaceMesListAction } = useReplaceMeStore()

const emit = defineEmits(['add'])
const add = () => emit('add')
</script>

<style scoped lang="less">
.filter {
  display: flex;
  align-items: center;
  .page-size {
    :deep(.arco-pagination-list) {
      display: none;
    }
  }
  .arco-btn {
    margin-left: 10px;
  }
  .right {
    margin-right: 0;
  }
}
</style>
