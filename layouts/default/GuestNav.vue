<template>
  <ul class="nav-items">
    <li>
      <nuxt-link :to="'/login'">
        Sign in
      </nuxt-link>
    </li>
    <li>
      <nuxt-link :to="'/register'">
        <el-button type="primary">Sign up</el-button>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {}
</script>

<style scoped>
  .nav-items {
    display: inline-block;
  }

  .nav-items li {
    line-height: 60px;
    display: inline-block;
  }

  .nav-items > li {
    margin-left: 20px;
  }

  .nav-items li:first-child {
    margin-left: 0;
  }
</style>
