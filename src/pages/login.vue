<template>
  <Form :form="form" class="login-form" @submit.prevent="handleSubmit">
    <FormItem
      :validate-status="emailError() ? 'error' : ''"
      :help="emailError() || ''"
    >
      <Input
        v-decorator="[
          'email',
          {
            rules: [{ required: true, message: $t('This field is required') }],
          },
        ]"
        size="large"
        autoFocus
        :placeholder="$t('Email')"
      >
        <Icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
      </Input>
    </FormItem>
    <FormItem
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <Input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: $t('This field is required') }],
          },
        ]"
        size="large"
        type="password"
        :placeholder="$t('Password')"
      >
        <Icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </Input>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        html-type="submit"
        size="large"
        block
        :loading="loading"
        :disabled="loading || !isMounted || hasErrors(form.getFieldsError())"
      >
        {{ $t('Sign in') }}
      </Button>
      {{ $t('Or') }}
      <Link to="/register">{{ $t('Sign up') }}</Link>

      <Alert v-if="error" :message="error" type="error" show-icon />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Alert, Button, Form, Input, Icon } from 'ant-design-vue'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import Cookies from 'js-cookie'
import gql from 'graphql-tag'

import Link from '../components/Link.vue'

export default (Vue as ExtendedVue).extend({
  layout: 'form',
  middleware: 'guest',
  components: {
    Alert,
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    Icon,
    Link,
  },
  data() {
    return {
      loading: false,
      error: null,
      isMounted: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
      this.isMounted = true
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' })
  },
  methods: {
    emailError(): boolean | object[] {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('email') && getFieldError('email')
    },
    passwordError(): boolean | object[] {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit(): void {
      this.form.validateFields(
        async (err: Error[], values: Record<string, string>) => {
          if (!err) {
            this.loading = true
            this.error = null

            try {
              const result = await this.$apollo.mutate({
                mutation: gql`
                  mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                      accessToken: token
                    }
                  }
                `,
                variables: {
                  email: values.email,
                  password: values.password,
                },
              })
              const { accessToken } = result.data.login

              Cookies.set('accessToken', accessToken, {
                expires: 365,
              })
              this.$store.commit('SET_ACCESS_TOKEN', accessToken)

              this.$router.push('/' + (this.$route.params.locale || ''))
            } catch ({ graphQLErrors = [], message }) {
              this.error = graphQLErrors[0]?.message || message
            }

            this.loading = false
          }
        }
      )
    },
    hasErrors(fieldsError: Record<string, any>) {
      return Object.keys(fieldsError).some((field) => fieldsError[field])
    },
  },
})

interface ExtendedVue
  extends VueConstructor<
    Vue & {
      form: WrappedFormUtils
    }
  > {}
</script>

<style scoped></style>
