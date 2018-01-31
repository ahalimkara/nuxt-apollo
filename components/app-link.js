import config from '../config'

const prependLocale = (locale, path) => {
  const regexp = new RegExp(`^/(${config.AVAILABLE_LOCALES.join('|')})(/.+)?$`)
  if (!locale || regexp.test(path)) {
    return path
  }

  return `/${locale}/${path.replace(/^\/+/, '')}`.replace(/\/+$/, '')
}

export default {
  name: 'app-link',
  functional: true,
  render(h, { data, children, parent: { $route } }) {
    let to = (data.attrs && data.attrs.to) || ''

    if (typeof to === 'string') {
      to = prependLocale($route.params.locale, to)

    } else if (typeof to === 'object') {
      to.params = to.params || {}
      to.params.locale = to.params.locale || $route.params.locale
    }

    if (data.attrs) {
      data.attrs.to = to
    } else {
      data.attrs = { to }
    }

    return h('nuxt-link', data, children)
  },
}
