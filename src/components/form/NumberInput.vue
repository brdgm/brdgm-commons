<template>
  <input type="text" v-model="stringValue" inputmode="numeric"
      @input="onInput" @change="onChange" @focus="inputSelectAll" @keydown="suppressInvalidKeys"
      :class="{glow1: glow==1, glow2: glow==2}"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

/**
 * Technically this is a text input, but it provides advanced features to enter number values:
 * - It allows to enter a sum of numbers, e.g. "1 + 2 - 3"
 * - It allows to define min/max values and cap entered values to these limits
 * - It shows a glow effect if number outside the range is entered and corrected automatically
 */
export default defineComponent({
  name: 'NumberInput',
  emits: {
    'update:modelValue': (value?: number) => {
      return value == undefined || typeof value == 'number'
    }
  },
  props: {
    modelValue: {
      type: Number,
      required: false
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 9999
    }
  },
  setup(props) {
    const stringValue = ref(undefined as string|undefined)
    if (props.modelValue) {
      stringValue.value = props.modelValue.toString()
    }
    const glow = ref(0)
    return { stringValue, glow }
  },
  methods: {
    /**
     * Input value is checked on each keystroke, but the value is only emitted
     * if it is a plain simple integer and within the allowed ranges.
     */
    onInput() : void {
      const enteredValue = this.stringValue?.trim() ?? ''
      if (digitsOnlyRegex.test(enteredValue)) {
        const intValue = parseInt(enteredValue)
        if (intValue >= this.min && intValue <= this.max) {
          this.$emit('update:modelValue', parseInt(enteredValue))
        }
      }
      else if (enteredValue.length == 0) {
        this.$emit('update:modelValue', undefined)
      }
    },
    /**
     * When the field loses focus, the complete string is evaluated, converting expressions
     * into a single number and enforcing min/max values.
     */
    onChange() : void {
      let value = evaluateNumberOrSum(this.stringValue)
      if (value) {
        if (value > this.max) {
          value = this.max
          this.triggerValidationGlow()
        }
        else if (value < this.min) {
          value = this.min
          this.triggerValidationGlow()
        }
      }
      this.stringValue = value?.toString()
      this.$emit('update:modelValue', value)
    },
    inputSelectAll(event: FocusEvent) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    suppressInvalidKeys(event: KeyboardEvent) : void {
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Enter', ' ', '-', '+']
      const isNumberKey = event.key >= '0' && event.key <= '9'
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault()
      }
    },
    triggerValidationGlow() : void {
      // we have to trigger two different CSS classes to restart the glow animation each time
      if (this.glow < 2) {
        this.glow++
      }
      else {
        this.glow = 1
      }
    }
  }
})

const digitsOperatorsWhitespaceRegex = /^([\d+\-\s])*$/
const digitsOnlyRegex = /^-?\d+$/

function evaluateNumberOrSum(stringValue: string | undefined): number | undefined {
  if (stringValue != undefined && stringValue.trim() != '' && digitsOperatorsWhitespaceRegex.test(stringValue)) {
    try {
      // Remove all whitespace from the string
      let sanitizedString = stringValue.replace(/\s+/g, '')

      // Remove trailing "+" or "-"
      if (sanitizedString.endsWith('+') || sanitizedString.endsWith('-')) {
        sanitizedString = sanitizedString.slice(0, -1)
      }

      // If the sanitized string is empty after removing trailing operators, return undefined
      if (sanitizedString === '') {
        return undefined
      }

      // Evaluate the expression safely
      return sanitizedString
        .split(/(?=[+-])/) // Split by operators while preserving them
        .map(value => parseInt(value, 10)) // Convert each part to a number
        .reduce((acc, value) => acc + value, 0) // Sum up all parts
    }
    catch {
      return undefined
    }
  }
  return undefined
}
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #999;
  padding: 2px;
}
.glow1 {
  animation-name: glow1;
  animation-duration: 0.3s;
  will-change: box-shadow;
}
.glow2 {
  animation-name: glow2;
  animation-duration: 0.3s;
  will-change: box-shadow;
}
@keyframes glow1 {
  0% { box-shadow: 0 0 0 red; }
  50% { box-shadow: 0 0 10px red; }
  100% { box-shadow: 0 0 0 red; }
}
@keyframes glow2 {
  0% { box-shadow: 0 0 0 red; }
  50% { box-shadow: 0 0 10px red; }
  100% { box-shadow: 0 0 0 red; }
}
</style>
