<template>
  <teleport v-if="state" :to="to">
    <transition v-if="transition" mode="out-in" name="fade-transform">
      <slot v-if="slotState" />
    </transition>
    <template v-else>
      <slot v-if="slotState" />
    </template>
  </teleport>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref } from 'vue'
export default defineComponent({
  props: {
    to: {
      type: String,
      default: 'body'
    },
    transition: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const state = ref(false)
    const slotState = ref(false)
    onMounted(async () => {
      state.value = true
      await nextTick()
      slotState.value = true
    })
    return {
      state,
      slotState
    }
  }
})
</script>
<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-transform-enter {
  opacity: 1;
  transform: translateX(0);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
