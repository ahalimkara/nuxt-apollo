<template>
  <header>
    <nuxt-link
      class="logo"
      :to="'/'"
    >
      <el-button type="text">Nuxt Apollo</el-button>
    </nuxt-link>
  </header>
</template>

<script>
  export default {}
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
