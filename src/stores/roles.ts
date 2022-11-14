import { ListResponse } from '@/api/types'
import { AddRoleDto, Role } from '@/api/types/role'
import { addRole, getRoleList, removeRole, updateRole } from '@/api/role'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('role', () => {
  const filter = ref({
    keywords: '',
    pageSize: 10,
    currentPage: 1,
    role: '',
    status: '',
  })
  const updateFilterAction = (value: typeof filter.value) => (filter.value = value)
  const roleList = ref<ListResponse<Role>>()
  const loading = ref(true)
  const getRoleListAction = async () => {
    loading.value = true
    const res = await getRoleList({ withPerms: true, name: filter.value.keywords })
    roleList.value = res
    loading.value = false
  }

  const addRoleAction = (role: AddRoleDto) => {
    return addRole(role).then(() => getRoleListAction())
  }
  const removeRoleAction = (id: number) => {
    return removeRole(id).then(() => getRoleListAction())
  }
  const updateRoleAction = (id: number, role: AddRoleDto) => {
    return updateRole(id, role).then(() => getRoleListAction())
  }

  return {
    filter,
    updateFilterAction,
    roleList,
    loading,
    getRoleListAction,
    addRoleAction,
    removeRoleAction,
    updateRoleAction,
  }
})

export default store
export const useRoleStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
