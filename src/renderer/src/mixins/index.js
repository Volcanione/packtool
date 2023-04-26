import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function RouteConfig(param = null) {
  const route = useRoute()
  const router = useRouter()

  const query = {}
  if (typeof param === 'string') {
    //
    query[param] = computed(() => route.query[param])
  }

  if (param instanceof Array) {
    param.forEach((p) => {
      query[p] = computed(() => route.query[p])
    })
  }

  return {
    router,
    route,
    ...query
  }
}
