<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :pagination="false"
      row-key="id"
      :loading="loading"
      :data="tagList?.data ?? []"
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
import { Tag } from '@/api/types/tag'
import { useMessage } from '@/hooks/message'
import { useTagStore } from '@/stores/tags'
import { Modal } from '@arco-design/web-vue'
const { tagList, loading, getTagsListAction, removeTagAction } = useTagStore()

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
      await removeTagAction(id)
      message.success('删除成功')
    },
  })
}
const emit = defineEmits(['edit'])
const handleAction = (row: Tag, action: string) => {
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
getTagsListAction()
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
