<template>
  <section class="container">
    {{ $t('Profile') + ': ' + viewer.name }}
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated',
  computed: {
    viewer() {
      return this.$store.state.viewer
    },
  },
})
</script>

<style scoped></style>
