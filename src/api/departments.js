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
