import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
}) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { data, message, success } = res.data
    console.log(success)
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  function (error) {
    Message.error('登录失败！')
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
