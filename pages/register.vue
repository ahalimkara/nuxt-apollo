<template>
  <el-card class="register-card">
    <div slot="header">
      <span>Sign up</span>
    </div>
    <div>
      <el-alert
        class="error"
        v-for="(error, key) in errors"
        :title="error"
        :key="key"
        type="error" />
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        class="login-form">
        <el-form-item prop="name">
          <el-input
            v-model="registerForm.name"
            placeholder="Name" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="E-mail" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="Password"
            auto-complete="off" />
        </el-form-item>
        <el-button
          type="primary"
          class="submit-button"
          @click="submit()"
          :loading="loading>0">Submit
        </el-button>
        <div class="clearfix">
          Already have an account?
          <nuxt-link :to="'/login'">
            <el-button type="text">Login</el-button>
          </nuxt-link>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import Cookies from 'js-cookie'
  import register from '../graphql/mutation/register.gql'
  import login from '../graphql/mutation/login.gql'

  export default {
    layout: 'card',
    middleware: 'guest',
    data() {
      return {
        loading: 0,
        errors: [],
        registerForm: {
          name: '',
          email: '',
          password: '',
        },
        rules: {
          name: [
            { required: true, message: 'This field is required', trigger: 'submit' },
          ],
          email: [
            { required: true, message: 'This field is required', trigger: 'submit' },
          ],
          password: [
            { required: true, message: 'This field is required', trigger: 'submit' },
          ],
        },
      }
    },
    methods: {
      submit() {
        this.$refs['registerForm'].validate(async valid => {
          if (valid) {
            this.loading++

            try {
              const { name, email, password } = this.registerForm
              await this.$apollo.mutate({
                mutation: register,
                variables: { name, payload: { email: { email, password } } },
              })
              const result = await this.$apollo.mutate({
                mutation: login,
                variables: { payload: { email, password } },
              })

              Cookies.set('accessToken', result.data.login.accessToken, { expires: 365 })
              this.$store.commit('SET_ACCESS_TOKEN', result.data.login.accessToken)
              // https://github.com/apollographql/apollo-client/issues/2919
              await this.$apollo.provider.defaultClient.resetStore()
              this.$router.push('/')

            } catch (error) {
              this.loading--
              this.errors.push(error.message)
              console.log(JSON.stringify(error))
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style scoped>
  .register-card {
    max-width: 340px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .submit-button {
    width: 100%;
  }

  .error {
    margin-bottom: 10px;
  }
</style>
