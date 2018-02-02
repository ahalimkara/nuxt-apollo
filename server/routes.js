const { AVAILABLE_LOCALES } = require('../config')
const locale = `/:locale(${AVAILABLE_LOCALES.join('|')})?`

module.exports = [
  {
    path: locale,
    name: 'home',
    component: 'index',
  },
  {
    path: `${locale}/login`,
    name: 'login',
    component: 'login',
  },
  {
    path: `${locale}/register`,
    name: 'register',
    component: 'register',
  },
  {
    path: `${locale}/profile`,
    name: 'profile',
    component: 'profile',
  },
]
