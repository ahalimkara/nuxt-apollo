<template>
  <ul class="nav-items">
    <li>
      <nuxt-link :to="'/profile'">
        Profile
      </nuxt-link>
    </li>
    <li>
      <a>
        Logout
      </a>
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
