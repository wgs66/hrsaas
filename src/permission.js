import router from './router'

import store from './store'

const whitelist = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }

    // 1 登录
    // 是否进入登录页
    if (to.path === '/login') {
      //   1.1 跳转到首页
      next('/')
    } else {
      // 1.2 不是 直接放行
      next()
    }
  } else {
    //   2 未登录
    // 访问的师傅在白名单内 允许通过
    const isCludes = whitelist.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
    // 2.1 在白名单 放行
    // 2.2 不在白名单 跳到登录页
  }
})
