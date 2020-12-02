<template>
  <Login />
</template>

<script lang="ts">
import Vue from 'vue'

import Login from '../screens/register/Login.vue'

export default Vue.extend({
  layout: 'auth',
  middleware: 'guest',
  components: {
    Login,
  },
})
</script>

<style scoped></style>
