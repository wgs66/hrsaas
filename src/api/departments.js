import request from '@/utils/request'

/**
 * 获取企业部门列表
 * @returns  Promise
 */

export function getDepartmentList() {
  return request({
    url: '/company/department'
  })
}

/**
 *  根据部门id删除部门
 * @param {String} id 部门id
 * @returns
 */
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {Object} data
 * code 部门编码，同级部门不可重复
 * introduce 介绍
 * manager 负责人名称
 * name 部门名称
 * pid 父级部门id
 * @returns Promise
 */
export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
