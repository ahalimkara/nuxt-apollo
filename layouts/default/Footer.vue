<template>
  <footer class="container">
    <Row type="flex">
      <Col flex="auto">
        &copy; {{ $t('{year} All rights reserved', { year }) }}
      </Col>
      <Col flex="none">
        <FooterLocales />
      </Col>
    </Row>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Col, Row } from 'ant-design-vue'

import FooterLocales from '../../src/components/FooterLocales.vue'

export default Vue.extend({
  components: {
    FooterLocales,
    Col,
    Row,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
})
</script>

<style scoped>
footer {
  color: #909090;
  font-size: 14px;
}
</style>
