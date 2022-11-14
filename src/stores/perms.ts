import { getPermList, addPerm, removePerm, updatePerm } from '@/api/perms'
import { AddPermDto, Perm } from '@/api/types/perm'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('perms', () => {
  const filter = ref({
    keywords: '',
  })
  const updateFilterAction = (value: typeof filter.value) => (filter.value = value)

  const permsList = ref<Perm[]>([])
  const loading = ref(true)
  const getPermsListAction = async () => {
    loading.value = true
    const res = await getPermList()
    permsList.value = res
    loading.value = false
  }

  const addPermAction = (perm: AddPermDto) => {
    return addPerm(perm).then(() => getPermsListAction())
  }
  const removePermAction = (id: number) => {
    return removePerm(id).then(() => getPermsListAction())
  }
  const updatePermAction = (id: number, perm: AddPermDto) => {
    return updatePerm(id, perm).then(() => getPermsListAction())
  }

  return {
    filter,
    updateFilterAction,
    permsList,
    loading,
    getPermsListAction,
    addPermAction,
    removePermAction,
    updatePermAction,
  }
})

export default store
export const usePermStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
