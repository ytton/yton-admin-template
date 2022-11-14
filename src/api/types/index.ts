export type Response<T> = T
export type PageQuery = {
  page: number
  size: number
}

export type ListResponse<T> = {
  meta: {
    total: number
    size: number
  }
  data: T[]
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Status {
  enable = 'enable',
  disable = 'disable',
}

export type UploadResult = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
export type BaseQuery<T> = {
  page?: number
  size?: number
} & {
  [key in keyof T]: T[key]
}
