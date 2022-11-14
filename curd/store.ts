import { ListResponse } from '@/api/types'
import { AddReplaceMeDto, ReplaceMe, ReplaceMeQuery } from '@/api/types/replaceMe'
import { addReplaceMe, getReplaceMeList, removeReplaceMe, updateReplaceMe } from '@/api/replaceMe'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('replaceMe', () => {
  const filter = ref<ReplaceMeQuery>({
    keywords: '',
    size: 10,
    page: 1,
  })
  const updateFilterAction = (value: typeof filter.value) => (filter.value = value)
  const replaceMeList = ref<ListResponse<ReplaceMe>>()
  const loading = ref(true)
  const getReplaceMesListAction = async () => {
    loading.value = true
    const res = await getReplaceMeList(filter.value)
    replaceMeList.value = res
    loading.value = false
  }

  const addReplaceMeAction = (replaceMe: AddReplaceMeDto) => {
    return addReplaceMe(replaceMe).then(() => getReplaceMesListAction())
  }
  const removeReplaceMeAction = (id: number) => {
    return removeReplaceMe(id).then(async () => {
      //处理删除一页最后一条数据的情况
      await getReplaceMesListAction()
      if (!replaceMeList.value?.data.length && replaceMeList.value?.meta.total) {
        updateFilterAction({
          ...filter.value,
          page: filter.value.page! - 1,
        })
        return getReplaceMesListAction()
      }
      return true
    })
  }
  const updateReplaceMeAction = (id: number, replaceMe: AddReplaceMeDto) => {
    return updateReplaceMe(id, replaceMe).then(() => getReplaceMesListAction())
  }

  return {
    filter,
    updateFilterAction,
    replaceMeList,
    loading,
    getReplaceMesListAction,
    addReplaceMeAction,
    removeReplaceMeAction,
    updateReplaceMeAction,
  }
})

export default store
export const useReplaceMeStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
