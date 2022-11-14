<template>
  <div class="role">
    <div class="header">
      <a-form :model="filter" class="filter" layout="inline">
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
        :pagination="false"
        row-key="id"
        :loading="loading"
        :data="roleList?.data ?? []"
        :row-selection="rowSelection"
        :scroll="{ x: '100%', y: '100%' }"
      >
        <template #status="{ record }">
          <div>
            <div :class="`table-status ${record.status}`"></div>
            <span class="status-text">{{ record.status }}</span>
          </div>
        </template>
        <template #actions="{ record }">
          <a-dropdown @select="handleAction(record, $event as string)">
            <a-button class="more-btn"
              ><template #icon> <icon-more-vertical /> </template
            ></a-button>
            <template #content>
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
    <AddDialog v-model:visible="dialogVisible" :data="editData" />
  </div>
</template>

<script setup lang="ts">
import AddDialog from './components/AddDialog.vue'
import { reactive, ref } from 'vue'
import { useRoleStore } from '@/stores/roles'
import { Modal } from '@arco-design/web-vue'
import { Role, UpdateRoleDto } from '@/api/types/role'
import { useMessage } from '@/hooks/message'
const { roleList, loading, getRoleListAction, removeRoleAction } = useRoleStore()

const filter = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})

const rowSelection = {
  type: 'checkbox' as const,
}
const columns = [
  {
    title: '角色名',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
  },
  {
    title: '',
    slotName: 'actions',
    width: 80,
  },
]
const handleAction = (row: any, action: string) => {
  switch (action) {
    case 'edit':
      edit(row)
      break
    case 'remove':
      remove(row.id)
      break
    default:
      break
  }
}

const dialogVisible = ref(false)
const referEntityId = ref<number>()
const add = (id?: number) => {
  referEntityId.value = id
  editData.value = undefined
  dialogVisible.value = true
}
const editData = ref<UpdateRoleDto>()
const edit = (data: Role) => {
  editData.value = { ...data, permIds: data.perms?.map((x) => x.id) ?? [] }
  referEntityId.value = undefined
  dialogVisible.value = true
}
const message = useMessage()
const remove = (id: number) => {
  Modal.confirm({
    title: '提醒',
    titleAlign: 'start',
    content: '是否删除当前内容？',
    okText: '删除',
    modalClass: 'remove-modal',
    onOk: async () => {
      await removeRoleAction(id)
      message.success('删除成功')
    },
  })
}
getRoleListAction()
</script>

<style scoped lang="less">
.role {
  height: 100%;
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
    .status-text {
      color: var(--color-text-3);
      margin-left: 5px;
    }
  }
  .footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
