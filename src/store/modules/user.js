import { login } from '@/api'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
    }
  }
}
