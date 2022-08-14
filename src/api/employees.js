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

/**
 * 获取员工列表
 * @param {Object} params
 * @returns Promise
 */
export function getEmployessListApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 *  批量导入员工
 * @param {Object} data
 * @returns Promise
 */
export function importEmployess(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
