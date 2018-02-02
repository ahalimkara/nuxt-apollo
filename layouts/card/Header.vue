<template>
  <header>
    <app-link
      class="logo"
      to="/">
      <el-button type="text">{{ APP_NAME }}</el-button>
    </app-link>
  </header>
</template>

<script>
  import { APP_NAME } from '../../config'
  import AppLink from '../../components/app-link'

  export default {
    components: {
      AppLink,
    },
    data() {
      return {
        APP_NAME,
      }
    },
  }
</script>

<style scoped>
  header {
    text-align: center;
    padding-top: 18px;
    padding-bottom: 10px;
  }

  .logo .el-button {
    font-size: 20px;
    padding: 20px;
  }
</style>
