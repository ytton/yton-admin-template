import { Method } from '.'

export interface Perm {
  id: number
  name: string
  url: string | undefined
  method: Method | undefined
  entityId: number | undefined
  perms: Perm[]
  createdAt: Date
  updatedAt: Date
}

export type AddPermDto = Omit<Perm, 'createdAt' | 'updatedAt' | 'perms' | 'id'>
