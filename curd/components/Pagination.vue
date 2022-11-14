<template>
  <div class="pagination">
    <div class="total">
      第{{ range[0] }}-{{ range[1] }}条，总共有{{ replaceMeList?.meta?.total ?? 0 }}条
    </div>
    <a-pagination
      v-model:current="filter.page"
      v-model:page-size="filter.size"
      :total="replaceMeList?.meta?.total ?? 0"
      @change="getReplaceMesListAction()"
    />
  </div>
</template>

<script setup lang="ts">
import { useReplaceMeStore } from '@/stores/replaceMes'
import { computed } from 'vue'

const { filter, replaceMeList, getReplaceMesListAction } = useReplaceMeStore()
const range = computed(() => {
  const page = filter.value.page ?? 1
  const size = filter.value.size ?? 10
  const offset = (page - 1) * size
  return [offset + 1, offset + size]
})
</script>

<style scoped lang="less">
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
