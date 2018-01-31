<template>
  <ul class="nav-items">
    <li>
      <app-link to="/login">
        {{ $t('Sign in') }}
      </app-link>
    </li>
    <li>
      <app-link to="/register">
        <el-button type="primary">{{ $t('Sign up') }}</el-button>
      </app-link>
    </li>
  </ul>
</template>

<script>
  import AppLink from '../../components/app-link'

  export default {
    components: {
      AppLink,
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
