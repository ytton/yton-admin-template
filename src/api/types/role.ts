import { Status } from '.'
import { Perm } from './perm'

export interface Role {
  id: number
  name: string
  perms?: Perm[]
  status?: Status
  createdAt: Date
  updatedAt: Date
}
export type AddRoleDto = Omit<Role, 'createdAt' | 'updatedAt' | 'id'> & {
  permIds?: number[]
}
export type UpdateRoleDto = AddRoleDto & {
  id: number
}
