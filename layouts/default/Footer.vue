<template>
  <footer class="container">
    <el-row type="flex">
      <div class="el-col-copy">
        {{ APP_NAME }} &copy; {{ new Date().getFullYear() + ' ' + $t('All rights reserved') }}
      </div>
      <div class="el-col-locales">
        <footer-locales />
      </div>
    </el-row>
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
    padding-top: 20px;
    padding-bottom: 20px;
    color: #909090;
    font-size: 14px;
  }

  .el-col-copy {
    flex: 1 1 auto;
  }

  .el-col-locales {
    flex: 0 0 auto;
    text-align: right;
  }
</style>
