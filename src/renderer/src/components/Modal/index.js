import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
//封装confirm

const confirm = Modal.confirm
const error = Modal.error

const ModalFn = (arg = {}, type) => {
  return new Promise((res, rej) => {
    const config = {
      okText: '确定',
      cancelText: '取消',
      onOk() {
        res()
      },
      onCancel() {
        rej()
      }
    }
    Object.assign(config, arg)

    const modal = type === 'confirm' ? confirm(config) : error(config)

    if (arg.onOk) {
      res(modal)
    }
  })
}

Object.assign(Modal, {
  async confirm(arg) {
    try {
      const res = await ModalFn(arg, 'confirm')
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async error(arg) {
    try {
      const res = await ModalFn(arg, 'error')
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
})

export default Modal
