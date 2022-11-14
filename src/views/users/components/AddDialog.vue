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
        <a-form-item field="avatar" label="头像" hide-label :validate-trigger="['change', 'input']">
          <a-upload
            :file-list="file ? [file] : []"
            :show-file-list="false"
            :auto-upload="false"
            @change="onChange"
          >
            <template #upload-button>
              <div
                :class="`arco-upload-list-item${
                  file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                }`"
              >
                <div v-if="file && file.url" class="arco-upload-list-picture custom-upload-avatar">
                  <img :src="file.url" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-spin
                    v-if="file.status === 'uploading'"
                    :style="{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translateX(-50%) translateY(-50%)',
                    }"
                  />
                </div>
                <div v-else class="arco-upload-picture-card">
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-form-item>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              field="username"
              label="用户名"
              :rules="[
                { required: true, message: '用户名不能为空' },
                { minLength: 4, message: '用户名不能低于4个字符' },
              ]"
              :validate-trigger="['change', 'input']"
            >
              <a-input v-model="formData.username" placeholder="请输入用户名" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="email"
              label="邮箱"
              :rules="[{ type: 'email', message: '请输入正确的邮箱地址' }]"
              :validate-trigger="['change', 'input']"
            >
              <a-input v-model="formData.email" placeholder="请输入邮箱地址" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item
          v-if="!data"
          field="password"
          label="密码"
          :rules="[
            { required: true, message: '密码不能为空' },
            { minLength: 4, message: '密码不能低于4个字符' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input-password v-model="formData.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item
          field="roleIds"
          label="角色"
          :rules="[{ required: true, message: '请至少选择一个角色' }]"
          :validate-trigger="['input']"
        >
          <a-select
            v-model="formData.roleIds"
            multiple
            :max-tag-count="2"
            allow-clear
            placeholder="选择状态"
          >
            <a-option v-for="role of roleList" :key="role.id" :value="role.id">{{
              role.name
            }}</a-option>
          </a-select>
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
import { AddUserDto, UpdateUserDto, User } from '@/api/types/user'
import { computed, defineProps, PropType, ref, watch } from 'vue'
import { useMessage } from '@/hooks/message'
import { Form } from '@arco-design/web-vue'
import { Status } from '@/api/types'
import { upload } from '@/api/upload'
import { getRoleList } from '@/api/role'
import { Role } from '@/api/types/role'
import { useUserStore } from '@/stores/users'
const { addUserAction, updateUserAction } = useUserStore()
const props = defineProps({
  data: {
    type: Object as PropType<UpdateUserDto>,
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

// #region upload-file
const file = ref()
const onChange = async (_: unknown, currentFile: any) => {
  file.value = { ...currentFile, status: 'uploading' }
  const res = await upload(currentFile.file)
  formData.value.avatar = res.url
  file.value = {
    ...currentFile,
    status: 'done',
    url: res.url,
  }
}
// #endregion

const formData = ref<AddUserDto>({
  avatar: undefined,
  username: '',
  email: '',
  password: '',
  roleIds: [],
  status: Status.enable,
})
const initData = async () => {
  if (!props.visible) {
    return
  }
  //重新初始化数据
  formData.value = {
    avatar: undefined,
    username: '',
    email: undefined,
    password: '',
    roleIds: [],
    status: Status.enable,
  }
  //编辑的情况
  if (props.data) {
    formData.value = props.data
    formData.value.email ??= undefined
    file.value = { url: formData.value.avatar }
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
      await updateUserAction(props.data.id, formData.value)
      message.success('编辑成功')
      return true
    }
    await addUserAction(formData.value)
    message.success('添加成功')
    return true
  } catch (error) {
    return false
  }
}
const handleCancel = () => {
  formRef.value!.resetFields()
}
const roleList = ref<Role[]>()
getRoleList().then((res) => (roleList.value = res.data))
</script>

<style scoped lang="less"></style>
