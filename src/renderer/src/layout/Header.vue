<template>
  <div v-if="routeViewConfig.header" class="breadcrumb">
    <div class="title">{{ route?.meta?.title }}</div>
    <div id="header-tool" class="header-tool-bar"></div>
  </div>
</template>

<script setup>
import { RouteConfig } from '@renderer/mixins/'
import { storeRoute } from '@renderer/pinia/route.js'
const { routeViewConfig } = storeRoute()

const { route } = RouteConfig()
console.log(route)
</script>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 24px;
  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
  }
  .header-tool-bar {
    flex: 1;
  }
}
</style>
