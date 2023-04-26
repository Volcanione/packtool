<template>
  <div class="menu">
    <template v-for="route in menuRoutes" :key="route.path">
      <div
        v-if="!route.hidden"
        class="item"
        :class="{ active: setActive(route), alone: route.alone }"
        @click="jump(route)"
      >
        {{ route.meta.title }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouteConfig } from '@renderer/mixins/'
import { storeRoute } from '@renderer/pinia/route.js'

const { menuRoutes } = storeRoute()

const { route, router } = RouteConfig()
// console.log(router)
const setActive = computed(() => {
  return (r) => {
    return r.path === route.path || r.path === route.meta.active
  }
})
const jump = async (r) => {
  router.replace(r.path)
}
</script>

<style lang="less" scoped>
.menu {
  display: flex;
  flex-direction: column;

  .item {
    height: 40px;
    border-radius: @border-radius-base;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 0 17px;
    position: relative;
    cursor: pointer;

    &.active {
      background: #eceef2;
      color: @primary-color;

      &::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 20px;
        background: @primary-color;
        border-radius: @border-radius-base;
        left: 0;
        top: 0;
        transform: translateY(50%);
      }
    }

    &.alone {
      margin-top: 12px;

      &::after {
        content: '';
        position: absolute;
        height: 1px;
        background: #e3e6eb;
        border-radius: 6px;
        top: 0;
        left: 0;
        right: 0;
        transform: translateY(-12px);
      }
    }
  }
}
</style>
