<template>
  <div class="container">
    {{ $t('Welcome {name}', { name: viewer && viewer.name }) }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
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
