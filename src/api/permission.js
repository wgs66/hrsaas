import request from '@/utils/request'

// 获取权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

/**
 * 添加权限
 * @param {*} data
 * @returns Promise
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
