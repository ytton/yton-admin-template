<template>
  <a-form :model="filter" class="filter" layout="inline">
    <a-form-item label="Show">
      <a-pagination
        v-model:page-size="filter.size"
        :total="userList?.meta?.total ?? 0"
        class="page-size"
        show-page-size
        @page-size-change="getUsersListAction"
      />
    </a-form-item>
    <a-form-item hide-label>
      <a-select
        default-value="*"
        :style="{ width: '112px' }"
        placeholder="all status"
        @change="handleStatus"
      >
        <a-option value="*">all Status</a-option>
        <a-option value="enable">enable</a-option>
        <a-option value="disable">disable</a-option>
      </a-select>
    </a-form-item>
    <a-form-item hide-label class="ml right">
      <a-input-search
        v-model="filter.keywords"
        :style="{ width: '320px' }"
        placeholder="Please enter something"
        @search="getUsersListAction"
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
import { Status } from '@/api/types'
import { useUserStore } from '@/stores/users'

const { filter, userList, getUsersListAction } = useUserStore()

const handleStatus = (value: Status | '*') => {
  if (value === '*') {
    filter.value.status = undefined
  } else {
    filter.value.status = value
  }
  getUsersListAction()
}
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
