import { useAuthStore } from '@/stores/auth'
import { Message } from '@arco-design/web-vue'
import { request } from 'D:/projections/yton-tools/index'

export const http = request.create({
  baseURL: 'http://localhost:3000/api',
  needMessage: true,
  message: Message as any,
  needAuth: true,
  handleAuth(config) {
    const { userInfo } = useAuthStore()
    config.headers!.authorization = 'Bearer ' + userInfo.value?.accessToken
    return config
  },
  handleResponse(res) {
    res = res.data
    return res
  },
  handleError(err: any) {
    const msg = err.response?.data?.message ?? '未知错误'
    err.message = (Array.isArray(msg) ? msg.join(';') : msg) as string
    return Promise.reject(err)
  },
})
export default http
