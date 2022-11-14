<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :pagination="false"
      row-key="id"
      :loading="loading"
      :data="replaceMeList?.data ?? []"
      :row-selection="rowSelection"
      :scroll="{ x: '100%', y: '100%' }"
    >
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
import { ReplaceMe } from '@/api/types/replaceMe'
import { useMessage } from '@/hooks/message'
import { useReplaceMeStore } from '@/stores/replaceMes'
import { Modal } from '@arco-design/web-vue'
const { replaceMeList, loading, getReplaceMesListAction, removeReplaceMeAction } =
  useReplaceMeStore()

const rowSelection = {
  type: 'checkbox' as const,
}
const columns = [
  {
    title: '标签名',
    dataIndex: 'name',
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
      await removeReplaceMeAction(id)
      message.success('删除成功')
    },
  })
}
const emit = defineEmits(['edit'])
const handleAction = (row: ReplaceMe, action: string) => {
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
getReplaceMesListAction()
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
}
.remove-modal .arco-modal-footer {
  margin-top: 0px;
  text-align: right;
}
</style>
