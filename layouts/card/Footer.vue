<template>
  <footer class="container">
    {{ APP_NAME }} &copy; {{ new Date().getFullYear() + ' ' + $t('All rights reserved') }}

    <footer-locales />
  </footer>
</template>

<script>
  import { APP_NAME } from '../../config'
  import FooterLocales from '../../components/FooterLocales'

  export default {
    components: {
      FooterLocales,
    },
    data() {
      return {
        APP_NAME,
      }
    },
  }
</script>

<style scoped>
  footer {
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    text-align: center;
    padding: 20px;
  }
</style>
