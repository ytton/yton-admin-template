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
          label="标签名"
          :rules="[
            { required: true, message: '标签名不能为空' },
            { minLength: 2, message: '标签名不能低于2个字符' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="formData.name" placeholder="请输入标签名" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { AddTagDto, UpdateTagDto, Tag } from '@/api/types/tag'
import { computed, defineProps, PropType, ref, watch } from 'vue'
import { useMessage } from '@/hooks/message'
import { Form } from '@arco-design/web-vue'
import { useTagStore } from '@/stores/tags'
const { addTagAction, updateTagAction } = useTagStore()
const props = defineProps({
  data: {
    type: Object as PropType<UpdateTagDto>,
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

const formData = ref<AddTagDto>({
  name: '',
})
const initData = async () => {
  if (!props.visible) {
    return
  }
  //重新初始化数据
  formData.value = {
    name: '',
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
      await updateTagAction(props.data.id, formData.value)
      message.success('编辑成功')
      return true
    }
    await addTagAction(formData.value)
    message.success('添加成功')
    return true
  } catch (error) {
    return false
  }
}
const handleCancel = () => {
  formRef.value!.resetFields()
}
</script>

<style scoped lang="less"></style>
