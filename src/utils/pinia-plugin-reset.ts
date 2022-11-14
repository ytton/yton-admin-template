import { cloneDeep } from 'lodash-es'
import { PiniaPluginContext } from 'pinia'

export function piniaPluginReset({ store }: PiniaPluginContext): void {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
