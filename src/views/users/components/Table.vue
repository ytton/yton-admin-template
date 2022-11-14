<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :pagination="false"
      row-key="id"
      :loading="loading"
      :data="userList?.data ?? []"
      :row-selection="rowSelection"
      :scroll="{ x: '100%', y: '100%' }"
    >
      <template #username="{ record }">
        <div class="username-wrapper">
          <a-avatar :size="40" shape="square"
            ><img v-if="record.avatar" :src="record.avatar" alt="" /><span v-else>
              {{ record.username }}</span
            >
          </a-avatar>
          <div>
            <div class="username">{{ record.username }}</div>
            <div class="roles">{{ record.roles.map((x: any) => x.name).join(' & ') }}</div>
          </div>
        </div>
      </template>
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
</template>

<script setup lang="ts">
import { User } from '@/api/types/user'
import { useMessage } from '@/hooks/message'
import { useUserStore } from '@/stores/users'
import { Modal } from '@arco-design/web-vue'
const { userList, loading, getUsersListAction, removeUserAction } = useUserStore()

const rowSelection = {
  type: 'checkbox' as const,
}
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    slotName: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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

const message = useMessage()
const remove = (id: number) => {
  Modal.confirm({
    title: '提醒',
    titleAlign: 'start',
    content: '是否删除当前内容？',
    okText: '删除',
    modalClass: 'remove-modal',
    onOk: async () => {
      await removeUserAction(id)
      message.success('删除成功')
    },
  })
}
const emit = defineEmits(['edit'])
const handleAction = (row: User, action: string) => {
  switch (action) {
    case 'edit':
      emit('edit', row)
      break
    case 'remove':
      remove(row.id)
      break
    default:
      break
  }
}
getUsersListAction()
</script>

<style scoped lang="less">
.table-container {
  height: calc(100% - 60px - 52px);
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
  .username-wrapper {
    display: flex;
    align-items: center;
    > div:last-child {
      margin-left: 20px;
      .username {
        font-size: @font-size-title-1;
        font-weight: 50px;
      }
      .roles {
        color: var(--color-text-3);
      }
    }
  }
  .status-text {
    color: var(--color-text-3);
    margin-left: 5px;
  }
}
.remove-modal .arco-modal-footer {
  margin-top: 0px;
  text-align: right;
}
</style>
