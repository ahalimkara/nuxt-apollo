<template>
  <Menu mode="horizontal" :selectable="false" class="menu">
    <MenuItem>
      <Link to="/profile">
        {{ $t('Profile') }}
      </Link>
    </MenuItem>
    <MenuItem>
      <a href="" @click.prevent="logout">
        {{ $t('Logout') }}
      </a>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Cookies from 'js-cookie'
import { Menu } from 'ant-design-vue'

import Link from '../../src/components/Link.vue'

export default Vue.extend({
  components: {
    Link,
    Menu,
    MenuItem: Menu.Item,
  },
  methods: {
    logout() {
      Cookies.remove('accessToken')
      this.$store.commit('SET_ACCESS_TOKEN', null)

      this.$apollo.provider.defaultClient.resetStore()

      const locale = this.$route.params.locale || ''
      const location = locale ? `/${locale}/login` : '/login'

      this.$router.push(location)
    },
  },
})
</script>

<style scoped>
.menu {
  line-height: 62px;
  border-bottom: 0;
  max-width: 1024px;
}
</style>
