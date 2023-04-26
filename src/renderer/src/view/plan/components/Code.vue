<template>
  <highlightjs ref="highlightjsRef" class="highlightjs" autodetect :code="code" />
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    defalut: null
  }
})

const code = ref(`build:start`)

// const codeConfig = reactive({
//   command: 'yarn',
//   path: 'D:/yostar/test/electron-terminal-demo'
// })

const highlightjsRef = ref(null)

const init = async () => {
  try {
    await window.api.LS(
      {
        command: props.data.command,
        path: props.data.path
      },
      async (res, pid) => {
        code.value += `\n${res}`
        if (!props.data.pid) {
          Object.assign(props.data, { pid })
          console.log(props.data)
        }
        await nextTick()
        highlightjsRef.value.$el.children[0].scrollTo({
          top: highlightjsRef.value.$el.children[0].offsetTop,
          behavior: 'smooth'
        })
      }
    )
    console.log('执行完毕')
  } catch (error) {
    console.log(error)
    //
  }
}
init()
</script>

<style lang="less" scoped>
.highlightjs {
  margin-bottom: 0;

  :deep(.hljs) {
    max-height: 200px;
    overflow-y: auto;
    background: transparent;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      width: 8px;
      height: 8px;
      background: #d1d4da;
      border-radius: @border-radius-base;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }
}
</style>
