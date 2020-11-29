<template>
  <Layout class="layout">
    <div class="page">
      <Link to="/" class="logo">Nuxt Apollo</Link>
      <Nuxt />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Layout } from 'ant-design-vue'

import Link from '../src/components/Link.vue'

export default Vue.extend({
  components: {
    Layout,
    Link,
  },
})
</script>

<style scoped>
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page {
  width: 100%;
  max-width: 300px;
  margin: 20px;
}
.logo {
  text-align: center;
  display: block;
  font-size: 24px;
  margin: 24px 0;
}
</style>
