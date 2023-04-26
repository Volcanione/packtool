import router from '@renderer/router/'
import { storePack } from '@renderer/pinia/pack.js'
import { storeRoute } from '@renderer/pinia/route.js'
import { Modal } from '@renderer/components/'
import { delay } from 'lodash'

const delayFn = (fn = () => {}, time = 50) => {
  return new Promise((res) => {
    const timeid = delay(() => {
      fn()
      res(timeid)
    }, time)
  })
}

let timeid
router.beforeEach(async (to, from) => {
  const Pack = storePack()
  const { cancelPack } = Pack
  const { setRouteViewLoading, setRouteViewheader } = storeRoute()

  if (Pack.packingStatus) {
    try {
      await Modal.confirm({
        title: '当前有打包计划正在进行中，继续操作将视为取消，确定继续操作吗？'
      })
      await cancelPack()
    } catch (error) {
      return false
    }
  }

  setRouteViewLoading(true)
  clearTimeout(timeid)
  timeid = await delayFn(() => {
    setRouteViewheader(true)
  })
})
