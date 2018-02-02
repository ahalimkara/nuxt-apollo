<template>
  <div class="default-nav">
    <div class="container">
      <el-row type="flex">
        <app-link
          class="el-col-logo nav-item"
          to="/">
          <el-button type="text">{{ APP_NAME }}</el-button>
        </app-link>
        <div class="el-col-nav">
          <auth-nav v-if="$store.state.accessToken" />
          <guest-nav v-if="!$store.state.accessToken" />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { willPrefetch } from 'vue-apollo'

  import { APP_NAME } from '../../config'
  import viewer from '../../graphql/query/viewer.gql'

  import AppLink from '../../components/app-link'
  import GuestNav from './GuestNav'
  import AuthNav from './AuthNav'

  export default willPrefetch({
    data() {
      return {
        APP_NAME,
      }
    },
    components: {
      AppLink,
      AuthNav,
      GuestNav,
    },
    computed: {
      ...mapGetters([
        'isAuth',
      ]),
    },
    apollo: {
      viewer: {
        prefetch: true,
        query: viewer,
      },
    },
  })
</script>

<style scoped>
  .default-nav {
    background-color: #fff;
    border-bottom: 1px solid #dbe0f0;
  }

  .el-col-logo {
    flex: 0 0 auto;
  }

  .el-col-nav {
    flex: 1 1 auto;
    text-align: right;
  }

  .nav-item, .nav-items li {
    line-height: 60px;
    display: inline-block;
  }
</style>
