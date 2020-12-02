<template>
  <div class="container">
    {{ $t('Welcome {name}', { name: viewer ? viewer.name : 'guest' }) }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Viewer from '../Viewer'

export default Vue.extend({
  computed: {
    viewer(): Viewer {
      return this.$store.state.viewer
    },
  },
})
</script>

<style scoped></style>
