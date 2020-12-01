<template>
  <div class="container">
    {{ $t('Welcome {name}', { name: viewer ? viewer.name : 'guest' }) }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    viewer() {
      return this.$store.state.viewer
    },
  },
})
</script>

<style scoped></style>
