import { ListResponse, Status } from '@/api/types'
import { AddUserDto, User, UserQuery } from '@/api/types/user'
import { addUser, getUserList, removeUser, updateUser } from '@/api/user'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('user', () => {
  const filter = ref<UserQuery>({
    keywords: '',
    size: 10,
    page: 1,
    status: undefined,
  })
  const updateFilterAction = (value: typeof filter.value) => (filter.value = value)
  const userList = ref<ListResponse<User>>()
  const loading = ref(true)
  const getUsersListAction = async () => {
    loading.value = true
    const res = await getUserList(filter.value)
    userList.value = res
    loading.value = false
  }

  const addUserAction = (user: AddUserDto) => {
    return addUser(user).then(() => getUsersListAction())
  }
  const removeUserAction = (id: number) => {
    return removeUser(id).then(async () => {
      //处理删除一页最后一条数据的情况
      await getUsersListAction()
      if (!userList.value?.data.length && userList.value?.meta.total) {
        updateFilterAction({
          ...filter.value,
          page: filter.value.page! - 1,
        })
        return getUsersListAction()
      }
      return true
    })
  }
  const updateUserAction = (id: number, user: AddUserDto) => {
    return updateUser(id, user).then(() => getUsersListAction())
  }

  return {
    filter,
    updateFilterAction,
    userList,
    loading,
    getUsersListAction,
    addUserAction,
    removeUserAction,
    updateUserAction,
  }
})

export default store
export const useUserStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
