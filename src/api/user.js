import request from '@/utils/request'

/**
 * 登录
 * @param {String} data mobile password
 * @returns Promise
 */

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据用户id获取详细信息
 * @param {Steing} id 用户id
 * @returns Promise
 */
export function getUserDetails(id) {
  return request({
    url: '/sys/user/' + id
  })
}
