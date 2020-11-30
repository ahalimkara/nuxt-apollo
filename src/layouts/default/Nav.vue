<template>
  <LayoutHeader class="header">
    <Row type="flex" class="nav">
      <Col flex="auto">
        <Menu mode="horizontal" :selectable="false" class="menu">
          <MenuItem>
            <Link to="/">Nuxt Apollo</Link>
          </MenuItem>
        </Menu>
      </Col>
      <Col flex="none">
        <auth-nav v-if="isAuthenticated" />
        <guest-nav v-else />
      </Col>
    </Row>
  </LayoutHeader>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'
import { Col, Layout, Menu, Row } from 'ant-design-vue'

import Link from '../../components/Link.vue'
import GuestNav from './GuestNav.vue'
import AuthNav from './AuthNav.vue'

export default Vue.extend({
  components: {
    LayoutHeader: Layout.Header,
    Menu,
    MenuItem: Menu.Item,
    Row,
    Col,
    Link,
    AuthNav,
    GuestNav,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  apollo: {
    viewer: {
      prefetch: true,
      query: gql`
        query {
          viewer {
            name
          }
        }
      `,
    },
  },
})
</script>

<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0;
}
.nav {
  max-width: 1024px;
  margin: auto;
}
.menu {
  line-height: 62px;
  border-bottom: 0;
  max-width: 1024px;
}
</style>
