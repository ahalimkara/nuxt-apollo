<template>
  <Register />
</template>

<script lang="ts">
import Vue from 'vue'

import Register from '../screens/register/Register.vue'

export default Vue.extend({
  layout: 'auth',
  middleware: 'guest',
  components: {
    Register,
  },
})
</script>

<style scoped></style>
