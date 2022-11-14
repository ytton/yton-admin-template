import http from './http'
import { ListResponse, Response } from './types'
import { AddRoleDto, Role, UpdateRoleDto } from './types/role'
export function getRoleList(query: { withPerms?: boolean; name?: string } = {}) {
  return http.get<Role, ListResponse<Role>>('/role', {
    params: {
      q: query.name,
      q_fields: 'name',
      _page: 1,
      _size: 9999,
      _include: query.withPerms ? 'perms' : '',
    },
  })
}
export function addRole(role: AddRoleDto) {
  return http.post<Role, Response<Role>>('/role', role)
}
export function getOne(id: number) {
  return http.get<Role, Response<Role>>(`/role/${id}`)
}
export function removeRole(id: number) {
  return http.delete(`/role/${id}`)
}
export function updateRole(id: number, role: AddRoleDto) {
  return http.patch<Role, Response<Role>>(`/role/${id}`, { id, ...role })
}
