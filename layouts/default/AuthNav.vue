<template>
  <ul class="nav-items">
    <li>
      <app-link to="/profile">
        {{ $t('Profile') }}
      </app-link>
    </li>
    <li>
      <a
        href=""
        @click.prevent="logout">
        {{ $t('Logout') }}
      </a>
    </li>
  </ul>
</template>

<script>
  import Cookies from 'js-cookie'

  import AppLink from '../../components/app-link'

  export default {
    components: {
      AppLink,
    },
    methods: {
      async resetStore() {
        await this.$apollo.provider.defaultClient.resetStore()
      },
      logout() {
        Cookies.remove('accessToken')
        this.$store.commit('SET_ACCESS_TOKEN', null)
        this.resetStore()
        const locale = this.$route.params.locale || ''
        this.$router.push(`/${locale}/login`.replace(/^\/+/, '/'))
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
