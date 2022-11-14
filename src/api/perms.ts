import http from './http'
import { Response } from './types'
import { AddPermDto, Perm } from './types/perm'
export function getPermList() {
  return http.get<Perm, Response<Perm[]>>('/perm')
}
export function addPerm(perm: AddPermDto) {
  return http.post<Perm, Response<Perm>>('/perm', perm)
}
export function getOne(id: number) {
  return http.get<Perm, Response<Perm>>(`/perm/${id}`)
}
export function removePerm(id: number) {
  return http.delete(`/perm/${id}`)
}
export function updatePerm(id: number, perm: AddPermDto) {
  return http.patch<Perm, Response<Perm>>(`/perm/${id}`, { id, ...perm })
}
