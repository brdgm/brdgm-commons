<template>
  <h1>brdgm-commons</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
