<template>
  <a-form layout="vertical">
    <Tips class="tips">
      1.Android 系统要求所有 APK 必须先使用证书进行数字签名后安装到设备上或进行更新；<br />
      2.为确保同一游戏更新可覆盖安装，一个游戏只能配置一个签名证书； <br />
      3.由于 bilibili渠道要求二次签名，首次签名时，官方和 bilibili 使用同一套签名；<br />
      4.修改签名证书，需要重新使用打包工具出包，否则不会生效。
    </Tips>
    <a-form-item label="签名证书">
      <UploadFile multiple :count="1" />
      <span class="fileTips">请上传 10M 以内的 .jks 或 .keystore 文件</span>
    </a-form-item>
    <a-form-item label="证书密码">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="证书链名称">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item label="证书链密码">
      <a-input size="large" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="sumbit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { inject } from 'vue'
const setRouteViewLoading = inject('setRouteViewLoading')

setRouteViewLoading(false)
</script>

<style lang="less" scoped>
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

  .fileTips {
    font-size: 12px;
    color: @text-color3;
    line-height: 14px;
  }
}
</style>
