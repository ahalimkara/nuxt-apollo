<template>
  <el-card class="register-card">
    <div slot="header">
      {{ $t('Sign in') }}
    </div>
    <div>
      <el-alert
        class="error"
        v-for="(error, key) in errors"
        :title="error"
        :key="key"
        type="error" />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="login-form">

        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            :placeholder="$t('Email')" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            :placeholder="$t('Password')"
            auto-complete="off" />
        </el-form-item>

        <el-button
          type="primary"
          class="submit-button"
          @click="submit()"
          :loading="loading>0">
          {{ $t('Login') }}
        </el-button>

        <div class="clearfix">
          {{ $t('Or') }}
          <app-link to="/register">
            <el-button type="text">{{ $t('register now!') }}</el-button>
          </app-link>
          <app-link
            to="/password/reset"
            class="forgot-btn">
            <el-button type="text">{{ $t('Forgot password') }}</el-button>
          </app-link>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import Cookies from 'js-cookie'
  import login from '../graphql/mutation/login.gql'
  import AppLink from '../components/app-link'

  export default {
    layout: 'card',
    middleware: 'guest',
    components: {
      AppLink,
    },
    data() {
      return {
        loading: 0,
        errors: [],
        loginForm: {
          email: '',
          password: '',
        },
        rules: {
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
        this.$refs['loginForm'].validate(async valid => {
          if (valid) {
            this.loading++

            try {
              const result = await this.$apollo.mutate({
                mutation: login,
                variables: { payload: { email: this.loginForm.email, password: this.loginForm.password } },
              })

              Cookies.set('accessToken', result.data.login.accessToken, { expires: 365 })
              this.$store.commit('SET_ACCESS_TOKEN', result.data.login.accessToken)
              // https://github.com/apollographql/apollo-client/issues/2919
              await this.$apollo.provider.defaultClient.resetStore()
              this.$router.push('/' + (this.$route.params.locale || ''))

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

  .forgot-btn {
    float: right;
  }

  .error {
    margin-bottom: 10px;
  }
</style>
