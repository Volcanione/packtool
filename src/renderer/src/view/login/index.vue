<template>
  <div class="login">
    <div class="login-content">
      <div class="startup-img"></div>
      <div class="login-form">
        <div class="title">邮箱登录</div>
        <a-form layout="vertical">
          <a-form-item label="邮箱">
            <a-input placeholder="请输入邮箱" style="width: 100%" size="large" allow-clear />
          </a-form-item>
          <a-form-item label="密码" class="password-item">
            <a-input placeholder="请输入密码" style="width: 100%" size="large" allow-clear />
          </a-form-item>
          <a-checkbox class="remember">记住登录状态</a-checkbox>
          <a-form-item>
            <a-button type="primary" class="submit" @click="login"> 登 录 </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouteConfig } from '@renderer/mixins/'

const { router } = RouteConfig()

const login = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-right: 0;

  .login-content {
    width: 1058px;
    height: 636px;
    display: flex;

    .startup-img {
      width: 474px;
      background: @primary-color;
      border-radius: 6px;
    }

    .login-form {
      padding: 0 88px;
      flex: 1;

      .title {
        font-weight: 600;
        font-size: 28px;
        line-height: 32px;
        margin-top: 108px;
        margin-bottom: 44px;
      }

      :deep(.ant-form-item) {
        .ant-form-item-label {
          label {
            color: #939599;
          }
        }

        .ant-input-affix-wrapper {
          padding: 15.5px 16px;
          border: none;
          background: #f7f8fa;

          input {
            background: transparent;
          }
        }
      }

      .remember {
        color: @text-color3;
        margin-bottom: 48px;
      }

      .password-item {
        margin-bottom: 8px !important;

        &.ant-form-item-has-error {
          margin-bottom: 32px !important;
        }

        &.ant-form-item-has-success {
          margin-bottom: 8px !important;
        }
      }
      .submit {
        width: 100%;
        height: 56px;
        font-size: 20px;
        line-height: 24px;
      }
    }
  }
}
</style>
