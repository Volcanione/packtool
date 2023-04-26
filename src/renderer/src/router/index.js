import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@renderer/layout/index.vue'
import Login from '@renderer/view/login/index.vue'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/packagingPlan',
    layout: true,
    children: [
      {
        path: '/packagingPlan',
        name: 'PackagingPlan',
        component: () => import('@renderer/view/plan/index.vue'),
        meta: {
          icon: '&#xe631;',
          title: '打包计划'
        }
      },
      {
        path: '/packagingStart',
        name: 'PackagingStart',
        hidden: true,
        component: () => import('@renderer/view/plan/pack.vue'),
        meta: {
          icon: '&#xe631;',
          title: '开始打包',
          active: '/packagingPlan'
        }
      },
      {
        path: '/signature',
        name: 'Signature',
        component: () => import('@renderer/view/signature/index.vue'),
        meta: {
          icon: '&#xe631;',
          title: '签名证书'
        }
      },
      {
        path: '/iconSignature',
        name: 'IconSignature',
        component: () => import('@renderer/view/iconSignature/index.vue'),
        meta: {
          icon: '&#xe631;',
          title: '图标闪屏'
        }
      },
      {
        path: '/multimedia',
        name: 'Multimedia',
        component: () => import('@renderer/view/multimedia/index.vue'),
        meta: {
          icon: '&#xe631;',
          title: '其他配置'
        }
      },
      {
        path: '/localHistory',
        name: 'LocalHistory',
        alone: true,
        component: () => import('@renderer/view/localHistory/index.vue'),
        meta: {
          icon: '&#xe631;',
          title: '本地历史'
        }
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: constantRoutes
})

export default router
