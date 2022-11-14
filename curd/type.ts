import { BaseQuery } from '.'

export interface ReplaceMe {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}
export type AddReplaceMeDto = Omit<ReplaceMe, 'createdAt' | 'updatedAt' | 'id'>

export type UpdateReplaceMeDto = AddReplaceMeDto & {
  id: number
}
export type ReplaceMeQuery = BaseQuery<{
  keywords?: string
}>
