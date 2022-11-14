import { BaseQuery, Status } from '.'

export interface Tag {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}
export type AddTagDto = Omit<Tag, 'createdAt' | 'updatedAt' | 'id'>

export type UpdateTagDto = AddTagDto & {
  id: number
}
export type TagQuery = BaseQuery<{
  keywords?: string
}>
