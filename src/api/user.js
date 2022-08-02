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
