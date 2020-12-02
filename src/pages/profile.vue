<template>
  <section class="container">
    {{ $t('Profile') + ': ' + viewer.name }}
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import Viewer from '../Viewer'

export default Vue.extend({
  middleware: 'authenticated',
  computed: {
    viewer(): Viewer {
      return this.$store.state.viewer
    },
  },
})
</script>

<style scoped></style>
