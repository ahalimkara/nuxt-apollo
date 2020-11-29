<template>
  <Dropdown :trigger="['click']" placement="topRight">
    <a class="ant-dropdown-link" @click.prevent="">
      {{ currentLocaleName }} <Icon type="global" />
    </a>
    <Menu slot="overlay" @click="changeLocale">
      <MenuItem v-for="(locale, key) in localeNames" :key="key">
        <a>{{ locale }}</a>
      </MenuItem>
    </Menu>
  </Dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import { Dropdown, Menu, Icon } from 'ant-design-vue'

import config, { Locales } from '../config'

const { DEFAULT_LOCALE, LOCALE_NAMES, AVAILABLE_LOCALES } = config

export default Vue.extend({
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    Icon,
  },
  data() {
    const currentLocale = (this.$route.params.locale ||
      DEFAULT_LOCALE) as Locales

    return {
      localeNames: LOCALE_NAMES,
      currentLocaleName: LOCALE_NAMES[currentLocale],
    }
  },
  methods: {
    changeLocale({ key: locale }: { key: Locales }) {
      const path = locale === DEFAULT_LOCALE ? '' : `/${locale}`

      const pathRegExp = new RegExp(
        `^(/(${AVAILABLE_LOCALES.join('|')}))?(/.*)?$`
      )

      const pathMatches = this.$route.fullPath.match(pathRegExp) || []
      const pathWithoutLocale = pathMatches[3] || '/'
      const location = (path + pathWithoutLocale).replace(/\/+$/, '') || '/'

      window.location = (location as unknown) as Location
    },
  },
})
</script>

<style scoped></style>
