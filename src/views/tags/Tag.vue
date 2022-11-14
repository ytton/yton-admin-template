<template>
  <div class="tag">
    <Filter @add="add" />
    <Table class="table" @add="add" @edit="edit" />
    <Pagination class="footer" />
    <AddDialog v-model:visible="dialogVisible" :data="editData" />
  </div>
</template>

<script setup lang="ts">
import Filter from './components/Filter.vue'
import AddDialog from './components/AddDialog.vue'
import Table from './components/Table.vue'
import Pagination from './components/Pagination.vue'
import { ref } from 'vue'
import { UpdateTagDto, Tag } from '@/api/types/tag'

const dialogVisible = ref(false)
const editData = ref<UpdateTagDto>()

const add = () => {
  editData.value = undefined
  dialogVisible.value = true
}

const edit = (data: Tag) => {
  editData.value = { ...data }
  dialogVisible.value = true
}
</script>

<style scoped lang="less">
.tag {
  height: 100%;
  .table {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
  }
}
</style>
