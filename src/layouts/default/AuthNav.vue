<template>
  <Menu mode="horizontal" :selectable="false" class="menu">
    <MenuItem>
      <Link to="/profile">
        {{ $t('Profile') }}
      </Link>
    </MenuItem>
    <MenuItem>
      <a href="" @click.prevent="logout">
        {{ $t('Log out') }}
      </a>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Menu } from 'ant-design-vue'

import Link from '../../components/Link.vue'
import { doLogout } from '../../middleware/auth'

export default Vue.extend({
  components: {
    Link,
    Menu,
    MenuItem: Menu.Item,
  },
  methods: {
    logout() {
      doLogout({
        store: this.$store,
        apolloClient: this.$apollo.provider.defaultClient,
      })

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
