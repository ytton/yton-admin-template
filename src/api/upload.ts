import http from './http'
import { Response, UploadResult } from './types'

export async function upload(file: any, type: 'image' = 'image') {
  const formData = new FormData()
  formData.append('file', file)
  const res = await http.post<UploadResult, Response<UploadResult>>(`/upload/${type}`, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
  return {
    ...res,
    url: 'http://localhost:3000/' + res.path,
  }
}
