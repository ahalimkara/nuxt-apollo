<template>
  <NuxtLink :to="toWithLocale"><slot></slot></NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'

import config, { Locales } from '../config'

const prependLocale = (locale: Locales | null, path: string) => {
  const regexp = new RegExp(`^/(${config.AVAILABLE_LOCALES.join('|')})(/.+)?$`)

  if (!locale || regexp.test(path)) {
    return path
  }

  return `/${locale}/${path.replace(/^\/+/, '')}`.replace(/\/+$/, '')
}

export default Vue.extend({
  props: {
    to: { type: [String, Object], required: true },
  },
  computed: {
    toWithLocale() {
      let to = this.to || ''

      if (typeof to === 'string') {
        to = prependLocale((this.$route as Route).params.locale as Locales, to)
      } else if (typeof to === 'object') {
        to.params = to.params || {}
        to.params.locale =
          to.params.locale || (this.$route as Route).params.locale
      }

      return to
    },
  },
})
</script>

<style scoped></style>
