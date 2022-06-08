<template>
  <Header/>

  <div id="content-container" class="container-fluid mt-5 mb-5">
    <router-view :key="$route.fullPath"/>
  </div>

  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/structure/Header.vue'
import Footer from '@/components/structure/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })

    return { t }
  },
})
</script>
