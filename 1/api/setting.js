import request from '@/utils/request'

/**
 * 根据id获取企业信息
 * @param {String} companyId
 * @returns Promise
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
