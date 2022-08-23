import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  name: '中文',
  message: '你好，世界',
  workDate: '工作日历',
  ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  route: {
    dashboard: '首页',
    departments: '组织架构',
    employees: '员工',
    permission: '权限管理',
    salarys: '工资',
    setting: '公司设置',
    social: '社保',
    approvals: '审批',
    attendances: '考勤'
  }
}
