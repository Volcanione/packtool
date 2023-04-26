<template>
  <div class="root">
    <div class="header">
      <img src="../assets/icon.png" class="logo" />
      <span class="title">打包工具</span>
      <span class="version">v1.4.0</span>
    </div>
    <a-select style="width: 100%; margin-bottom: 12px" size="large">
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <Menu />
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
</script>

<style lang="less" scoped>
.root {
  padding: 0 16px;

  .header {
    display: flex;
    align-items: center;
    height: 24px;
    margin-top: 18px;
    margin-bottom: 16px;

    .logo {
      width: 24px;
      margin-left: 4px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      margin-left: 10px;
    }

    .version {
      width: 40px;
      height: 18px;
      background: #eceef2;
      border-radius: 2px;
      font-size: 10px;
      color: @text-color3;
      text-align: center;
      line-height: 18px;
      margin-left: auto;
      margin-right: 0;
    }
  }

  .game-select {
  }
}
</style>
