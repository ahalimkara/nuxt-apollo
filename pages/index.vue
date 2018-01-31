<template>
  <section class="container">
    {{ $t('Welcome {name}', { name: viewer && viewer.name }) }}
  </section>
</template>

<script>
  import viewer from '../graphql/query/viewer.gql'

  export default {
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
