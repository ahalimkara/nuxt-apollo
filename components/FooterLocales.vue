<template>
  <el-dropdown
    placement="top-end"
    trigger="click"
    @command="changeLocale">

    <el-button size="mini">
      {{ localeName }}
      <i class="el-icon-arrow-up el-icon--right" />
    </el-button>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(locale, key) in LOCALE_NAMES"
        :key="key"
        :command="key">
        {{ locale }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { DEFAULT_LOCALE, LOCALE_NAMES, AVAILABLE_LOCALES } from '../config'

  export default {
    data() {
      return {
        LOCALE_NAMES,
        localeName: LOCALE_NAMES[this.$route.params.locale || DEFAULT_LOCALE],
      }
    },
    methods: {
      changeLocale(locale) {
        locale = locale === DEFAULT_LOCALE ? '' : '/' + locale
        const pathRegExp = new RegExp(`^(/(${AVAILABLE_LOCALES.join('|')}))?(/.*)?$`)
        const pathWithoutLocale = this.$route.fullPath.match(pathRegExp)[3] || ''
        window.location = (locale + pathWithoutLocale).replace(/\/+$/, '')
      },
    },
  }
</script>

<style scoped>

</style>
