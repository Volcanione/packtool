import Loading from './index.vue'
import { createVNode, render } from 'vue'

export function directive_loading(app) {
  // const LoadingUpdate = {} as any;
  app.directive('loading', {
    mounted(el, binding) {
      const modalParent = el?.parentNode
      let ParentEl = null
      if (modalParent?.classList.contains('modalContentBox')) {
        ParentEl = modalParent.parentNode.parentNode
      }
      if (binding.arg) {
        return
      }
      const vnode = createVNode(Loading)
      let timeId = -1
      render(vnode, ParentEl || el)
      el.style.position = 'relative'
      // el.appendChild(container);
      const instance = vnode.component
      el.setLoading = (state) => {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          instance.data.loading = state
          clearTimeout(timeId)
        }, 0)
      }
      el.setLoading(binding.value)
      el.setAttribute('id', instance.uid)
    },
    updated(el, binding) {
      if (binding.arg) {
        return
      }
      el.setLoading(binding.value)
    }
  })
}

export default {
  install: (app) => {
    directive_loading(app)
  }
}
