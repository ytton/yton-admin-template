<template>
  <div class="login">
    <div class="form-container">
      <div class="logo"><img src="@/assets/vue.svg" alt="logo" />yton</div>
      <div class="left">
        <div class="title">登录 xxx管理系统</div>
        <div class="sub">请输入你的账号和密码</div>
        <a-form :model="form" class="form" layout="vertical" @submit-success="handleSubmit">
          <a-form-item
            field="name"
            hide-asterisk
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 4, message: 'must be greater than 4 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input v-model="form.name" placeholder="username" />
          </a-form-item>
          <a-form-item
            hide-asterisk
            field="pwd"
            :rules="[
              { required: true, message: 'password is required' },
              { minLength: 3, message: 'must be greater than 3 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input-password v-model="form.pwd" placeholder="password" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary" long>登录</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="right">
        <div class="title">欢迎来到 xxx管理系统</div>
        <div class="sub">一个普普通通的后台系统模板</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { loginAction } = useAuthStore()
const router = useRouter()
const route = useRoute()
const handleSubmit = async () => {
  await loginAction(form.name, form.pwd)
  const from = route.query.from ?? '/'
  router.replace(from as string)
}
const form = reactive({
  name: '',
  pwd: '',
})
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #161d26;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-container {
  width: 1128px;
  height: 702px;
  position: relative;
  display: flex;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding: 30px;
    align-items: center;
    font-size: 20px;
    color: #fff;
    > img {
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
  }
  .left,
  .right {
    padding-top: 136px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .title {
    font-size: 30px;
    color: #fff;
  }
  .sub {
    color: #fff;
    margin-top: 20px;
    font-size: 14px;
  }
  .left {
    flex: 1 0;
    background-color: #1f2935;
    .sub {
      color: #8291a9;
    }
    .form {
      width: 300px;
      margin-top: 40px;
    }
  }
  .right {
    width: 432px;
    background: linear-gradient(-135deg, #ff3d57, #ff8a48);
  }
}
</style>
