<template>
  <div v-if="empty" class="empty">
    <img :src="emptyImg" alt="" />
    <span>当前游戏未配置完成签名证书及图标闪屏，<br />请配置完成后再新建打包计划。</span>
  </div>
  <a-form v-else layout="vertical">
    <Tips class="tips"
      >打包完成后的包体 PID 均为正式环境 PID，实际 PID 环境指向依赖于 SDK 平台端版本管理。</Tips
    >
    <a-form-item label="文件名">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="所属应用">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="母包地址">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="SDK 版本号">
      <a-input size="large" allow-clear />
    </a-form-item>
    <div class="line"></div>
    <a-form-item label="渠道">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="包体加固">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="输出路径">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="sumbit" @click="submit">开始打包</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { inject, ref } from 'vue'
import emptyImg from '@renderer/assets/empty.png'
import { RouteConfig } from '@renderer/mixins'

const { router } = RouteConfig()

const setRouteViewLoading = inject('setRouteViewLoading')
const setRouteViewheader = inject('setRouteViewheader')

const empty = ref(false)
const init = () => {
  //初始化处理完数据后取消loading
  setRouteViewheader(!empty.value)
  setRouteViewLoading(false)
}

init()

const submit = () => {
  router.replace('/packagingStart')
  setRouteViewLoading(true)
}
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  height: calc(100vh - 46px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: @text-color3;
    line-height: 20px;
    margin-top: 24px;
  }
}

.ant-form {
  width: 680px;
  margin-top: 12px;
  .tips {
    margin-bottom: 12px;
  }
  .line {
    border: 1px dashed #edeff2;
  }
  .sumbit {
    float: right;
    margin-top: 8px;
  }
}
</style>
