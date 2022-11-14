import http from './http'
import { ListResponse, Response } from './types'
import { AddReplaceMeDto, ReplaceMe, ReplaceMeQuery } from './types/replaceMe'
export function getReplaceMeList(query: ReplaceMeQuery) {
  return http.get<ReplaceMe, ListResponse<ReplaceMe>>('/replaceMe', {
    params: {
      q: query.keywords,
      q_fields: 'name',
      _page: query.page ?? 1,
      _size: query.size ?? 10,
    },
  })
}
export function addReplaceMe(replaceMe: AddReplaceMeDto) {
  return http.post<ReplaceMe, Response<ReplaceMe>>('/replaceMe', replaceMe)
}
export function getOne(id: number) {
  return http.get<ReplaceMe, Response<ReplaceMe>>(`/replaceMe/${id}`)
}
export function removeReplaceMe(id: number) {
  return http.delete(`/replaceMe/${id}`)
}
export function updateReplaceMe(id: number, replaceMe: AddReplaceMeDto) {
  return http.patch<ReplaceMe, Response<ReplaceMe>>(`/replaceMe/${id}`, { id, ...replaceMe })
}
