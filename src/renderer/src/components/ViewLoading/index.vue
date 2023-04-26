<template>
  <transition name="fade">
    <Spin v-if="loading" size="large" />
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'
export default defineComponent({
  components: { Spin },
  data() {
    return {
      loading: true
    }
  }
})
</script>

<style lang="less" scoped>
.ant-spin {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff !important;
  position: absolute;
  z-index: 4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-active {
  transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
