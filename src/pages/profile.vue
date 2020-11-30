<template>
  <section class="container">
    {{ $t('Profile') + ': ' + viewer.name }}
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  middleware: 'authenticated',
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

<style scoped></style>
