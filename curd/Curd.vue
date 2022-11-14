<template>
  <div class="replace-me">
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
import { UpdateReplaceMeDto, ReplaceMe } from '@/api/types/replaceMe'

const dialogVisible = ref(false)
const editData = ref<UpdateReplaceMeDto>()

const add = () => {
  editData.value = undefined
  dialogVisible.value = true
}

const edit = (data: ReplaceMe) => {
  editData.value = { ...data }
  dialogVisible.value = true
}
</script>

<style scoped lang="less">
.replaceMe {
  height: 100%;
  .table {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
  }
}
</style>
