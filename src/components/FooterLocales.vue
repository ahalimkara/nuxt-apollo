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
    return {
      localeNames: LOCALE_NAMES,
    }
  },
  computed: {
    currentLocaleName() {
      return LOCALE_NAMES[this.$store.state.locale as Locales]
    },
  },
  methods: {
    changeLocale({ key: locale }: { key: Locales }) {
      // TODO move path logic to a helper function
      const path = locale === DEFAULT_LOCALE ? '' : `/${locale}`

      const pathRegExp = new RegExp(
        `^(/(${AVAILABLE_LOCALES.join('|')}))?(/.*)?$`
      )

      const pathMatches = this.$route.fullPath.match(pathRegExp) || []
      const pathWithoutLocale = pathMatches[3] || '/'
      const location = (path + pathWithoutLocale).replace(/\/+$/, '') || '/'

      this.$router.push(location)
    },
  },
})
</script>

<style scoped></style>
