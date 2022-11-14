import { getCurrentInstance } from 'vue'
import { Message } from '@arco-design/web-vue'
export function useMessage(): typeof Message {
  return getCurrentInstance()!.appContext.config.globalProperties.$message
}
