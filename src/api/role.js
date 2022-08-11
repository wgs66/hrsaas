import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params
 * @returns Promise
 */
export function getRoleApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 添加角色
 * @param {Object} data
 * @returns Promise
 */
export function postRpleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
