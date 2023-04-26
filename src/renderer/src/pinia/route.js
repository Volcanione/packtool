import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { constantRoutes } from '@renderer/router/'

export const storeRoute = defineStore('route', () => {
  const routes = reactive([...constantRoutes])
  const menuRoutes = reactive(constantRoutes.find((r) => r.layout).children || [])
  const routeViewConfig = reactive({
    loading: true,
    header: true
  })

  const setRouteViewLoading = (state = true) => {
    Object.assign(routeViewConfig, { loading: state })
  }

  const setRouteViewheader = (state = true) => {
    Object.assign(routeViewConfig, { header: state })
  }
  return {
    routes,
    menuRoutes,
    routeViewConfig,
    setRouteViewLoading,
    setRouteViewheader
  }
})
