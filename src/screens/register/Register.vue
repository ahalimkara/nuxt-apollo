<template>
  <Form :form="form" class="register-form" @submit.prevent="handleSubmit">
    <Input
      :form="form"
      name="name"
      label="Name"
      icon-type="user"
      :auto-focus="true"
    />
    <Input
      :form="form"
      name="email"
      label="Email"
      :decorator="{ type: 'email' }"
      error-message="Please input a valid email"
      icon-type="mail"
    />
    <Input
      :form="form"
      name="password"
      label="Password"
      input-type="password"
      :decorator="{ min: 6 }"
      icon-type="lock"
    />
    <FormItem>
      <Button
        type="primary"
        html-type="submit"
        size="large"
        block
        :loading="loading"
        :disabled="loading || !isMounted || hasErrors(form.getFieldsError())"
      >
        {{ $t('Sign up') }}
      </Button>
      {{ $t('Or') }}
      <Link to="/login">{{ $t('Sign in') }}</Link>

      <Alert v-if="error" :message="error" type="error" show-icon />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Alert, Button, Form } from 'ant-design-vue'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'

import Link from '../../components/Link.vue'
import { doLogin } from '../../middleware/auth'
import Input from './RequiredInput.vue'
import register from './register.gql'

export default (Vue as ExtendedVue).extend({
  components: {
    Alert,
    Button,
    Form,
    FormItem: Form.Item,
    Input,
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
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit(): void {
      this.form.validateFields(
        async (err: Error[], values: Record<string, string>) => {
          if (!err) {
            this.loading = true
            this.error = null

            try {
              const result = await this.$apollo.mutate({
                mutation: register,
                variables: {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                },
              })
              const { accessToken } = result.data.register

              doLogin({
                store: this.$store,
                apolloClient: this.$apollo.getClient(),
                accessToken,
              })

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
