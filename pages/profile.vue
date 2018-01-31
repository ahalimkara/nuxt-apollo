<template>
  <section class="container">
    {{ $t('Profile') + ' ' + viewer.name }}
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

<style scoped>
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
