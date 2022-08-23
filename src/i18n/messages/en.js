import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'en',
  message: {
    hello: 'hello world'
  },
  workDate: 'work calendar',
  ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  route: {
    dashboard: 'dashboard',
    departments: 'departments',
    employees: 'employees',
    permission: 'permission',
    salarys: 'salarys',
    setting: 'setting',
    social: 'social',
    approvals: 'approvals',
    attendances: 'attendances'
  }
}
