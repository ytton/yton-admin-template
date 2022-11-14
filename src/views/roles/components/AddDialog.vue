<template>
  <div>
    <a-modal
      v-model:visible="innerVisible"
      :on-before-ok="handleBeforeOk"
      title-align="start"
      @cancel="handleCancel"
    >
      <template #title> {{ data === null ? '添加' : '编辑' }} </template>
      <a-form ref="formRef" :model="formData" layout="vertical" auto-label-width>
        <a-form-item
          field="name"
          label="角色名称"
          :rules="[
            { required: true, message: '角色名称不能为空' },
            { minLength: 2, message: '角色名称不能低于2个字符' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="formData.name" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item field="permIds" label="权限表">
          <a-scrollbar
            style="max-height: 250px; width: 100%; overflow-y: auto"
            outer-style="width:100%"
          >
            <a-tree
              v-model:checked-keys="formData.permIds"
              checked-strategy="child"
              checkable
              block-node
              :data="permList as any"
              action-on-node-click="expand"
              :field-names="permTreeField"
              show-line
            />
          </a-scrollbar>
        </a-form-item>
        <a-form-item
          field="status"
          label="状态"
          :rules="[{ required: true, message: '请选择状态' }]"
          :validate-trigger="['input']"
        >
          <a-select v-model="formData.status" placeholder="选择状态">
            <a-option value="enable">enable</a-option>
            <a-option value="disable">disable</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { AddRoleDto, Role, UpdateRoleDto } from '@/api/types/role'
import { computed, defineProps, PropType, ref, watch } from 'vue'
import { useMessage } from '@/hooks/message'
import { Form } from '@arco-design/web-vue'
import { Status } from '@/api/types'
import { getRoleList } from '@/api/role'
import { useRoleStore } from '@/stores/roles'
import { getPermList } from '@/api/perms'
import { Perm } from '@/api/types/perm'
const { addRoleAction, updateRoleAction } = useRoleStore()
const props = defineProps({
  data: {
    type: Object as PropType<UpdateRoleDto>,
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

const formData = ref<AddRoleDto>({
  name: '',
  status: Status.enable,
  permIds: [],
})
const initData = async () => {
  if (!props.visible) {
    return
  }
  //重新初始化数据
  formData.value = {
    name: '',
    status: Status.enable,
    permIds: [],
  }
  //编辑的情况
  if (props.data) {
    formData.value = props.data
  }
}
const formRef = ref<InstanceType<typeof Form>>()
watch(() => props.visible, initData)
const message = useMessage()
const handleBeforeOk = async () => {
  const error = await formRef.value!.validate()
  if (error) {
    return false
  }
  try {
    if (props.data) {
      //编辑
      await updateRoleAction(props.data.id, formData.value)
      message.success('编辑成功')
      return true
    }
    await addRoleAction(formData.value)
    message.success('添加成功')
    return true
  } catch (error) {
    return false
  }
}
const handleCancel = () => {
  formRef.value!.resetFields()
}
const permList = ref<Perm[]>()
getPermList().then(
  (res) =>
    (permList.value = res.map((x) => ({
      ...x,
      checkable: x.perms && x.perms.length,
    })))
)
const permTreeField = {
  key: 'id',
  title: 'name',
  children: 'perms',
}
</script>

<style scoped lang="less"></style>
