<template>
  <h1>brdgm-commons Form Test</h1>
  <table>
    <tbody>
      <tr>
        <th scope="col">
        </th>
        <th v-for="i of playerCount" :key="i" scope="col">
          Player {{i}}
        </th>
      </tr>
      <tr>
        <th scope="row">
          Amount #1 (-10 .. 10)
        </th>
        <td v-for="i of playerCount" :key="i">
          <ScoringTextInput v-model="amount.amount1[i-1]" :min="-10" :max="10"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          Amount #2 (0 .. 9999)
        </th>
        <td v-for="i of playerCount" :key="i">
          <ScoringTextInput v-model="amount.amount2[i-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          Amount #3 (-999 .. 999)
        </th>
        <td v-for="i of playerCount" :key="i">
          <ScoringTextInput v-model="amount.amount3[i-1]" :min="-999" :max="999"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          Total
        </th>
        <td v-for="i of playerCount" :key="i">
          <b>{{total[i-1]}}</b>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ScoringTextInput from '@/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'FormTest',
  components: {
    ScoringTextInput,
  },
  setup() {
    const { t } = useI18n()

    const amount = ref({
      amount1: [],
      amount2: [],
      amount3: [],
    })

    const playerCount = 2

    return { t, amount, playerCount }
  },
  computed: {
    total() : number[] {
      const result = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = this.toNumber(this.amount.amount1[i])
          + this.toNumber(this.amount.amount2[i])
          + this.toNumber(this.amount.amount3[i])
      }
      return result
    },
  },
  methods: {
    toNumber(value? : number) {
      if (typeof value == 'string') {
        return 0
      }
      else {
        return value ?? 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
th, td {
  text-align: center;
  padding: 0.5rem;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
