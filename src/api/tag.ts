import http from './http'
import { ListResponse, Response } from './types'
import { AddTagDto, Tag, TagQuery } from './types/tag'
export function getTagList(query: TagQuery) {
  return http.get<Tag, ListResponse<Tag>>('/tag', {
    params: {
      q: query.keywords,
      q_fields: 'name',
      _page: query.page ?? 1,
      _size: query.size ?? 10,
    },
  })
}
export function addTag(tag: AddTagDto) {
  return http.post<Tag, Response<Tag>>('/tag', tag)
}
export function getOne(id: number) {
  return http.get<Tag, Response<Tag>>(`/tag/${id}`)
}
export function removeTag(id: number) {
  return http.delete(`/tag/${id}`)
}
export function updateTag(id: number, tag: AddTagDto) {
  return http.patch<Tag, Response<Tag>>(`/tag/${id}`, { id, ...tag })
}
