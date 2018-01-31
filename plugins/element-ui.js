import Vue from 'vue'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import ElementLocale from 'element-ui/lib/locale'

export default ({ store: { state } }) => {
  const locale = state.locale === 'zh' ? zhLocale : enLocale
  // app.i18n.mergeLocaleMessage(state.locale === 'zh' ? 'zh' : 'en', locale)
  // ElementLocale.i18n((key, value) => app.i18n.t(key, value))
  Vue.use(Element, { locale })
}
