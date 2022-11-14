import { ListResponse, Status } from '@/api/types'
import { AddTagDto, Tag, TagQuery } from '@/api/types/tag'
import { addTag, getTagList, removeTag, updateTag } from '@/api/tag'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('tag', () => {
  const filter = ref<TagQuery>({
    keywords: '',
    size: 10,
    page: 1,
  })
  const updateFilterAction = (value: typeof filter.value) => (filter.value = value)
  const tagList = ref<ListResponse<Tag>>()
  const loading = ref(true)
  const getTagsListAction = async () => {
    loading.value = true
    const res = await getTagList(filter.value)
    tagList.value = res
    loading.value = false
  }

  const addTagAction = (tag: AddTagDto) => {
    return addTag(tag).then(() => getTagsListAction())
  }
  const removeTagAction = (id: number) => {
    return removeTag(id).then(async () => {
      //处理删除一页最后一条数据的情况
      await getTagsListAction()
      if (!tagList.value?.data.length && tagList.value?.meta.total) {
        updateFilterAction({
          ...filter.value,
          page: filter.value.page! - 1,
        })
        return getTagsListAction()
      }
      return true
    })
  }
  const updateTagAction = (id: number, tag: AddTagDto) => {
    return updateTag(id, tag).then(() => getTagsListAction())
  }

  return {
    filter,
    updateFilterAction,
    tagList,
    loading,
    getTagsListAction,
    addTagAction,
    removeTagAction,
    updateTagAction,
  }
})

export default store
export const useTagStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
