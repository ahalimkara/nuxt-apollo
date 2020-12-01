<template>
  <Layout>
    <DefaultNav />
    <Nuxt />
    <DefaultFooter />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Layout } from 'ant-design-vue'

import DefaultNav from './default/Nav.vue'
import DefaultFooter from './default/Footer.vue'

export default Vue.extend({
  components: {
    Layout,
    DefaultNav,
    DefaultFooter,
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$store.state.locale,
      },
    }
  },
})
</script>

<style>
body {
  background: #f0f2f5;
}
.container {
  width: 1024px;
  max-width: 100%;
  min-height: 300px;
  margin: auto;
  padding: 20px;
}
</style>
