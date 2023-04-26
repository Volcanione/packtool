<template>
  <Portal to="#header-tool">
    <div class="right-content">
      <CheckBar
        v-model:activeKey="activeKey"
        :menu="[
          { label: '官方', key: 1 },
          { label: 'bilibili', key: 2 }
        ]"
      />
    </div>
  </Portal>
  <Content class="content" />
</template>

<script setup>
import { inject, ref } from 'vue'
import Content from './components/Content.vue'

const setRouteViewLoading = inject('setRouteViewLoading')

const activeKey = ref(1)

setRouteViewLoading(false)
</script>

<style lang="less" scoped>
.right-content {
  margin-left: 20px;
  position: relative;
  padding-left: 12px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    border: 1px solid #edeff2;
    height: 22px;
    bottom: 4px;
  }
}
.content {
  padding-top: 12px;
  width: 680px;
}
</style>
