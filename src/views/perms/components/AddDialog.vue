<template>
  <div>
    <a-modal
      v-model:visible="innerVisible"
      :on-before-ok="handleBeforeOk"
      title-align="start"
      @cancel="handleCancel"
    >
      <template #title> {{ data === null ? '添加' : '编辑' }} </template>
      <a-tabs v-model:active-key="activeTab">
        <a-tab-pane :key="0" :disabled="entityId != undefined || !!data">
          <template #title> <icon-calendar /> 实体 </template>
          <a-form ref="formRef1" :model="perm" layout="vertical" auto-label-width>
            <a-form-item
              field="name"
              label="实体名"
              :rules="[{ required: true, message: '实体名不能为空' }]"
              :validate-trigger="['change', 'input']"
            >
              <a-input v-model="perm.name" placeholder="请输入实体名" />
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane :key="1" :disabled="!!data">
          <template #title> <icon-clock-circle /> 权限 </template>
          <a-form ref="formRef2" :model="perm" layout="vertical" auto-label-width>
            <a-form-item
              field="name"
              label="关联实体"
              :rules="[{ required: true, message: '关联实体不能为空' }]"
              :validate-trigger="['input']"
            >
              <a-select
                v-model="perm.entityId"
                :disabled="!!perm.entityId"
                placeholder="选择关联实体"
              >
                <a-option v-for="entity of permsList" :key="entity.id" :value="entity.id">{{
                  entity.name
                }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item
              field="name"
              label="权限名"
              :rules="[{ required: true, message: '权限名不能为空' }]"
              :validate-trigger="['change', 'input']"
            >
              <a-input v-model="perm.name" placeholder="请输入权限名" />
            </a-form-item>
            <a-row :gutter="10">
              <a-col :span="5"
                ><a-form-item
                  field="method"
                  label="method"
                  :rules="[{ required: true, message: '权限url不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <a-select v-model="perm.method" placeholder="GET">
                    <a-option
                      v-for="method of ['GET', 'POST', 'PATCH', 'DELETE']"
                      :key="method"
                      :value="method"
                      >{{ method }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="19"
                ><a-form-item
                  field="url"
                  label="url"
                  :rules="[{ required: true, message: '权限url不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <a-input v-model="perm.url" placeholder="请输入权限url" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { AddPermDto, Perm } from '@/api/types/perm'
import { computed, defineProps, PropType, ref, watch } from 'vue'
import { usePermStore } from '@/stores/perms'
import { useMessage } from '@/hooks/message'
import { Form } from '@arco-design/web-vue'
import { Method } from '@/api/types'
const { permsList, getPermsListAction, addPermAction, updatePermAction } = usePermStore()

const props = defineProps({
  data: {
    type: Object as PropType<Perm>,
    default: null,
  },
  entityId: {
    type: Number,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits<(event: 'update:visible', value: boolean) => void>()
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})
const message = useMessage()
const perm = ref<AddPermDto>({
  name: '',
  url: '',
  method: undefined,
  entityId: undefined,
})
const formRef1 = ref<InstanceType<typeof Form>>()
const formRef2 = ref<InstanceType<typeof Form>>()
const formRefs = [formRef1, formRef2]
const activeTab = ref(0)
const initData = async () => {
  if (!props.visible) {
    return
  }
  activeTab.value = props.entityId ? 1 : 0
  //重新初始化数据
  perm.value = {
    name: '',
    url: '',
    method: [undefined, Method.GET][activeTab.value],
    entityId: props.entityId,
  }
  //编辑的情况
  if (props.data) {
    perm.value = props.data
    activeTab.value = perm.value.entityId ? 1 : 0
  }
}
watch(() => props.visible, initData)
watch(
  () => activeTab,
  () => (perm.value.method = [undefined, Method.GET][activeTab.value])
)
const handleBeforeOk = async () => {
  const error = await formRefs[activeTab.value].value!.validate()
  if (error) {
    return false
  }
  if (props.data) {
    //编辑
    await updatePermAction(props.data.id, perm.value)
    message.success('编辑成功')
    return true
  }
  await addPermAction(perm.value)
  message.success('添加成功')
  return true
}
const handleCancel = () => {
  formRefs[activeTab.value].value!.resetFields()
  activeTab.value = 0
}
getPermsListAction()
</script>

<style scoped lang="less"></style>
