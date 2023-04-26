import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { delay } from 'lodash'

const KILL = window?.api?.kill

const delayFn = (fn = () => {}, time = 50) => {
  return new Promise((res) => {
    const timeid = delay(() => {
      fn()
      res(timeid)
    }, time)
  })
}

export const storePack = defineStore('pack', () => {
  const packingStatus = ref(false)

  //打包列表
  const packConfigList = reactive([])

  const startPack = async () => {
    //模拟处理数据
    await delayFn(() => {
      packConfigList.length = 0
      packConfigList.push(
        {
          id: 1,
          channel: 'android_official',
          status: 0,
          command: 'npm i ant-design-vue',
          path: 'D:/yostar/test/electron-terminal-demo'
        },
        {
          id: 2,
          channel: 'android_official1',
          status: 1,
          command: 'npm i ant-design-vue',
          path: 'D:/yostar/test/electron-terminal-demo'
        },
        {
          id: 3,
          channel: 'android_official2',
          status: 2,
          command: 'npm i ant-design-vue',
          path: 'D:/yostar/test/electron-terminal-demo'
        }
      )
    }, 3000)

    packingStatus.value = true

    console.log('开始打包')
  }

  const cancelPack = async () => {
    try {
      //获取打包进程PID
      console.log(packConfigList.filter((i) => i.pid).map((i) => i.pid))

      const res = await Promise.all(packConfigList.filter((i) => i.pid).map((i) => KILL(i.pid)))

      console.log(res)
      //
    } catch (error) {
      //
      console.log(error)
    }
    packingStatus.value = false
    console.log('取消打包')
  }

  return {
    startPack,
    cancelPack,
    packingStatus,
    packConfigList
  }
})
