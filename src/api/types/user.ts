import { BaseQuery, Status } from '.'
import { Role } from './role'

export interface User {
  id: number
  avatar?: string
  username: string
  email?: string
  roles?: Role[]
  status?: Status
  createdAt: Date
  updatedAt: Date
}
export type AddUserDto = Omit<User, 'createdAt' | 'updatedAt' | 'id'> & {
  roleIds?: number[]
  password?: string
}
export type UpdateUserDto = AddUserDto & {
  id: number
}
export type UserQuery = BaseQuery<{
  keywords?: string
  status?: Status
}>
