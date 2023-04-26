<template>
  <div class="layout">
    <Sidebar class="sidebar" />
    <div v-loading="routeViewConfig.loading" class="page">
      <Header class="header" />
      <div class="content">
        <div class="page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import { provide } from 'vue'
import { storeRoute } from '@renderer/pinia/route.js'
const { routeViewConfig, setRouteViewLoading, setRouteViewheader } = storeRoute()

provide('setRouteViewLoading', setRouteViewLoading)
provide('setRouteViewheader', setRouteViewheader)
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .sidebar {
    width: 200px;
    background: #f4f5f7;
  }

  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    margin-top: 16px;
  }

  .content {
    overflow-y: auto;
    flex: 1;
    .page {
      padding: 0 24px;
    }
    &::-webkit-scrollbar {
      width: 4px;
      height: 10px;
      background: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      height: 10px;
      background: #d1d4da;
      border-radius: @border-radius-base;
      opacity: 0;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }
}
</style>
