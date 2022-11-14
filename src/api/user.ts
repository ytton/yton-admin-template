import http from './http'
import { ListResponse, Response } from './types'
import { AddUserDto, User, UserQuery } from './types/user'
export function getUserList(query: UserQuery) {
  return http.get<User, ListResponse<User>>('/user?_include=roles', {
    params: {
      q: query.keywords,
      q_fields: 'username',
      status: query.status,
      _page: query.page ?? 1,
      _size: query.size ?? 10,
    },
  })
}
export function addUser(user: AddUserDto) {
  return http.post<User, Response<User>>('/user', user)
}
export function getOne(id: number) {
  return http.get<User, Response<User>>(`/user/${id}`)
}
export function removeUser(id: number) {
  return http.delete(`/user/${id}`)
}
export function updateUser(id: number, user: AddUserDto) {
  return http.patch<User, Response<User>>(`/user/${id}`, { id, ...user })
}
