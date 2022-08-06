import request from '@/utils/request'

/**
 * 获取员工列表（简单）
 * @returns Promise
 */
export function getEmployessList() {
  return request({
    url: '/sys/user/simple'
  })
}
