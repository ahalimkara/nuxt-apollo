<template>
  <Menu mode="horizontal" class="menu">
    <MenuItem>
      <Link to="/login">
        {{ $t('Sign in') }}
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to="/register">
        {{ $t('Sign up') }}
      </Link>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Menu } from 'ant-design-vue'

import Link from '../../src/components/Link.vue'

export default Vue.extend({
  components: {
    Link,
    Menu,
    MenuItem: Menu.Item,
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
