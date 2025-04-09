<template>
  <input type="text" v-model="stringValue" @change="inputChange" @focus="inputSelectAll" @keydown="suppressInvalidKeys"
      :class="{glow1: glow==1, glow2: glow==2}"/>
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
    },
    max: {
      type: Number,
      required: false,
      default: 9999
    },
    min: {
      type: Number,
      required: false,
      default: 0
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
    inputChange() : void {
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
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Enter', ' ']
      const isNumberKey = event.key >= '0' && event.key <= '9'
      const isPlusKey = event.key == '+'
      if (!isNumberKey && !isPlusKey && !allowedKeys.includes(event.key)) {
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

<style lang="scss" scoped>
.glow1 {
  animation-name: glow1;
  animation-duration: 0.25s;
}
.glow2 {
  animation-name: glow2;
  animation-duration: 0.25s;
}
@keyframes glow1 {
  0% { box-shadow:0 0 0 red;}
  50% { box-shadow:0 0 15px red; }
  100% { box-shadow:0 0 0 red; }
}
@keyframes glow2 {
  0% { box-shadow:0 0 0 red;}
  50% { box-shadow:0 0 15px red; }
  100% { box-shadow:0 0 0 red; }
}
</style>
