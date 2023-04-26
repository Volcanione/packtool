<template>
  <a-tabs v-if="menu.length" v-model:activeKey="activeKey">
    <a-tab-pane v-for="tab in menu" :key="tab.key" :tab="tab.label" />
  </a-tabs>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  menu: {
    type: Array,
    default() {
      return []
    }
  },
  activeKey: {
    type: [String, Number],
    required: true
  }
})

const emits = defineEmits(['update:activeKey'])

const activeKey = computed({
  get() {
    return props.activeKey
  },
  set(val) {
    emits('update:activeKey', val)
  }
})
</script>

<style lang="less" scoped>
.ant-tabs {
  :deep(.ant-tabs-nav) {
    margin: 0;
    height: 30px;

    .ant-tabs-nav-operations {
      height: 100%;
    }

    &::before {
      display: none !important;
    }

    .ant-tabs-tab {
      padding-left: 8px;
      padding-right: 8px;
      font-size: 16px;
    }

    .ant-tabs-tab-btn {
      padding-top: 2px;
    }

    .ant-tabs-tab + .ant-tabs-tab {
      margin-left: 8px;
    }

    .ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        font-weight: 600;
        color: @text-color !important;
        transition: all 0.2s;
      }
    }
  }
}
</style>
