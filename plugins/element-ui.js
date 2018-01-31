import Vue from 'vue'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

export default () => {
  const locale = enLocale // { store: { state } } state.locale === 'zh' ? zhLocale : enLocale
  Vue.use(Element, { locale })
}
