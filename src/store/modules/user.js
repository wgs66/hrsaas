import { login, getUserInfoApi, getUserDetails } from '@/api'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
      setTokenTime()
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      // console.log(userBaseInfo.userId)
      const userInfo = await getUserDetails(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
