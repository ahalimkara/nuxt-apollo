<template>
  <div>
    <default-nav />
    <nuxt />
    <default-footer />
  </div>
</template>

<script>
  import DefaultNav from './default/Nav'
  import DefaultFooter from './default/Footer'

  export default {
    components: {
      DefaultNav,
      DefaultFooter,
    },
    head() {
      return {
        htmlAttrs: {
          lang: this.$store.state.locale,
        },
      }
    }
  }
</script>
