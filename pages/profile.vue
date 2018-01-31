<template>
  <section class="container">
    Profile {{ viewer.name }}
  </section>
</template>

<script>
  import viewer from '../graphql/query/viewer.gql'

  export default {
    middleware: 'authenticated',
    apollo: {
      viewer: {
        prefetch: true,
        query: viewer,
      },
    },
  }
</script>

<style>
  .container {
  }
</style>
