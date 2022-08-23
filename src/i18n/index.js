import Vue from 'vue'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import zh from '@/i18n/messages/zh'
import en from '@/i18n/messages/en'
Vue.use(VueI18n)
// 准备翻译的语言环境信息
export const messages = {
  zh,
  en
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'zh', // 设置地区
  messages // 设置地区信息
})

export default i18n
