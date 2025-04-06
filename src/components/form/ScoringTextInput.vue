<template>
  <input type="text" v-model="stringValue" @change="inputChange" @focus="inputSelectAll" @keydown="suppressInvalidKeys"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ScoringTextInput',
  emits: {
    'update:modelValue': (value?: number) => {
      return value == undefined || typeof value == 'number'
    }
  },
  props: {
    modelValue: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const stringValue = ref(undefined as string|undefined)
    if (props.modelValue) {
      stringValue.value = props.modelValue.toString()
    }
    return { stringValue }
  },
  methods: {
    inputChange() : void {
      const value = evaluateNumberOrSum(this.stringValue)
      this.stringValue = value?.toString()
      this.$emit('update:modelValue', value)
    },
    inputSelectAll(event: FocusEvent) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    suppressInvalidKeys(event: KeyboardEvent) : void {
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Enter', ' ']
      const isNumberKey = event.key >= '0' && event.key <= '9'
      const isPlusKey = event.key == '+'
      if (!isNumberKey && !isPlusKey && !allowedKeys.includes(event.key)) {
        event.preventDefault()
      }
    }
  }
})

const digitsPlusWhitespaceRegex = /^(\d|\+|\s)*$/;

function evaluateNumberOrSum(stringValue : string|undefined) : number|undefined {
  if (stringValue != undefined && stringValue.trim() != '' && digitsPlusWhitespaceRegex.test(stringValue)) {
    return stringValue.split('+')
        .map(value => value.trim())
        .map(value => value == '' ? 0 : parseInt(value))
        .reduce((acc, value) => acc + value, 0)
  }
  return undefined
}
</script>
