<template>
  <ul class="nav-items">
    <li>
      <nuxt-link :to="'/profile'">
        Profile
      </nuxt-link>
    </li>
    <li>
      <a
        href=""
        @click.prevent="logout">
        Logout
      </a>
    </li>
  </ul>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    methods: {
      async resetStore() {
        await this.$apollo.provider.defaultClient.resetStore()
      },
      logout() {
        Cookies.remove('accessToken')
        this.$store.commit('SET_ACCESS_TOKEN', null)
        this.resetStore()
        this.$router.push('/login')
      },
    },
  }
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
