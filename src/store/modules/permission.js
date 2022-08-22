import router, { asyncRoutes, constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [],
    points: []
  },
  mutations: {
    setRouter(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRouter(context, roles) {
      // console.log(roles.menus)
      const routes = asyncRoutes.filter((item) => {
        // console.log(item.meta.id)
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRouter', routes)
      // console.log(routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    },
    setPointsAction(context, points) {
      context.commit('setPoints', points)
    }
  }
}
