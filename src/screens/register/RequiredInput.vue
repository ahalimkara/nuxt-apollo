<template>
  <FormItem
    :validate-status="inputError() ? 'error' : ''"
    :help="inputError() || ''"
  >
    <Input
      v-decorator="[
        name,
        {
          rules: [{ required: true, message: $t(errorMessage), ...decorator }],
        },
      ]"
      v-focus="autoFocus"
      size="large"
      :type="inputType"
      :placeholder="$t(label)"
    >
      <Icon slot="prefix" :type="iconType" class="icon" />
    </Input>
  </FormItem>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form, Icon, Input } from 'ant-design-vue'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'

export default Vue.extend({
  components: {
    FormItem: Form.Item,
    Input,
    Icon,
  },
  directives: {
    focus: {
      inserted(el, binding) {
        if (binding.value) {
          el.querySelector('input')?.focus()
        }
      },
    },
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    iconType: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: 'This field is required',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    decorator: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    inputError(): boolean | object[] {
      const { getFieldError, isFieldTouched } = this.$props
        .form as WrappedFormUtils
      return isFieldTouched(this.$props.name) && getFieldError(this.$props.name)
    },
  },
})
</script>

<style scoped>
.icon {
  color: rgba(0, 0, 0, 0.25);
}
</style>
