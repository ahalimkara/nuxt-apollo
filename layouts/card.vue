<template>
  <div>
    <card-header />
    <nuxt />
    <card-footer />
  </div>
</template>

<script>
  import CardHeader from './card/Header'
  import CardFooter from './card/Footer'

  export default {
    components: {
      CardHeader,
      CardFooter,
    },
    head() {
      return {
        htmlAttrs: {
          lang: this.$store.state.locale,
        },
      }
    },
  }
</script>
