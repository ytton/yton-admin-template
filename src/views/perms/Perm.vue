<template>
  <div class="user">
    <div class="header">
      <a-form :model="filter" class="filter" layout="inline">
        <a-form-item field="value1" hide-label>
          <a-select :style="{ width: '140px' }" placeholder="Select">
            <a-option>ALL Roles</a-option>
            <a-option>admin</a-option>
            <a-option>user</a-option>
            <a-option>guest</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="value1" hide-label>
          <a-select :style="{ width: '112px' }" placeholder="Select">
            <a-option>ALL Status</a-option>
            <a-option>enable</a-option>
            <a-option>disable</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="value1" hide-label class="ml right">
          <a-input-search :style="{ width: '320px' }" placeholder="Please enter something" />
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
    </div>
    <div class="table">
      <a-table
        :columns="columns"
        :data="transPermsList"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%' }"
        :pagination="false"
      >
        <template #actions="{ record }">
          <a-dropdown @select="handleAction(record, $event as string)">
            <a-button class="more-btn"
              ><template #icon> <icon-more-vertical /> </template
            ></a-button>
            <template #content>
              <a-doption v-if="!record.entityId" value="add"
                ><template #icon> <icon-plus-circle /></template>新增</a-doption
              >
              <a-doption value="edit"
                ><template #icon> <icon-edit /> </template>编辑</a-doption
              >
              <a-doption value="remove"
                ><template #icon> <icon-delete /> </template>删除</a-doption
              >
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </div>
    <AddDialog v-model:visible="dialogVisible" :data="editData" :entity-id="referEntityId" />
  </div>
</template>

<script setup lang="ts">
import AddDialog from './components/AddDialog.vue'
import { usePermStore } from '@/stores/perms'
import { computed, ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { Perm } from '@/api/types/perm'

const { filter, permsList, loading, getPermsListAction, removePermAction } = usePermStore()
getPermsListAction()

const dialogVisible = ref(false)
const transPermsList = computed(() => {
  const res = JSON.parse(
    JSON.stringify(permsList.value)
      .replace(/"id"/g, '"key"')
      .replace(/"perms"/g, '"children"')
      .replace(/,"children":\[\]/g, '')
  )
  return res
})
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
  {
    title: 'method',
    dataIndex: 'method',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '更新时间',
    slotName: 'updateAt',
  },
  {
    title: '',
    slotName: 'actions',
    width: 80,
  },
]
const handleAction = (row: any, action: string) => {
  switch (action) {
    case 'add':
      add(row.key)
      break
    case 'edit':
      delete row.children
      edit({ id: row.key, ...row })
      break
    case 'remove':
      remove(row.key)
      break
    default:
      break
  }
}
const referEntityId = ref<number>()
const add = (id?: number) => {
  referEntityId.value = id
  editData.value = undefined
  dialogVisible.value = true
}
const editData = ref<Perm>()
const edit = (data: Perm) => {
  editData.value = data
  referEntityId.value = undefined
  dialogVisible.value = true
}
const remove = (id: number) => {
  Modal.confirm({
    title: '提醒',
    titleAlign: 'start',
    content: '是否删除当前内容？',
    okText: '删除',
    modalClass: 'remove-modal',
    onOk: () => {
      removePermAction(id)
    },
  })
}
</script>

<style scoped lang="less">
.user {
  height: 100%;
  .filter {
    display: flex;
    align-items: center;
    .arco-btn {
      margin-left: 10px;
    }
    .right {
      margin-right: 0;
    }
  }
  .table {
    margin-top: 20px;
    flex: 1;
    height: calc(100% - 60px);
    :deep(.arco-table-container) {
      height: 100%;
      .arco-scrollbar:last-child {
        flex: 1;
        .arco-table-body {
          height: 100%;
          .arco-table-element {
            box-sizing: border-box;
            border-bottom: 1px solid var(--color-neutral-3);
          }
        }
      }
    }
    .more-btn {
      background-color: transparent;
    }
  }
}
</style>
<style>
.remove-modal .arco-modal-footer {
  margin-top: 0px;
  text-align: right;
}
</style>
