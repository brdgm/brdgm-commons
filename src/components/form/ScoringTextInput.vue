<template>
  <NumberInput :model-value="value" @update:model-value="updateModelValue"
      :min="min" :max="max" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NumberInput from './NumberInput.vue'

/**
 * Component is deprecated.
 * It is kept only for backward compatibility and redirects all functionality to NumberInput.
 */
export default defineComponent({
  name: 'ScoringTextInput',
  emits: {
    'update:modelValue': (value?: number) => {
      return value == undefined || typeof value == 'number'
    }
  },
  components: {
    NumberInput
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
    const value = ref(props.modelValue)
    return { value }
  },
  methods: {
    updateModelValue(newValue? : number) : void {
      this.value = newValue
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>
