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

/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}

/**
 * 通过角色id实现删除
 * @param {*} id 角色id
 * @returns Promise
 */
export function removeRolesApi(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

/**
 * 根据id获取角色详情
 * @param {*} id 角色id
 * @returns  Promise
 */
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id
  })
}

/**
 * 给角色分配权限
 * @param {*} data id permIDs
 * @returns Promise
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
