<template>
  <Header :title="t('gameTitle')" @set-locale="setLocale($event.language)"/>

  <div id="content-container" class="container-fluid mt-5 mb-5">
    <router-view :key="$route.fullPath"/>
  </div>

  <Footer :build-number="buildNumber" :credits-label="t('footer.credits')" credits-modal-id="creditsModal" zoom-enabled @zoomFontSize="zoomFontSize"/>

  <div class="modal" id="creditsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('footer.credits')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h4>{{appTitle}}</h4>
          <dl>
            <dt>Application Development</dt>
            <dd>Stefan Seifert</dd>
            <dt>Version</dt>
            <dd>{{buildNumber}}</dd>
            <dt>Source Code (Apache-2.0 License)</dt>
            <dd><a href="https://github.com/brdgm/brdgm-commons" target="_blank" rel="noopener">https://github.com/brdgm/brdgm-commons</a></dd>
          </dl>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

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
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })

    return { t, locale }
  },
  methods: {
    setLocale(lang: string) {
      this.locale = lang;
    },
    zoomFontSize(payload: { baseFontSize: number }) {
      this.baseFontSize = payload.baseFontSize
    }
  },
  data() {
    return {
      buildNumber: process.env.VUE_APP_BUILD_NUMBER || '',
      appTitle: process.env.VUE_APP_TITLE,
      baseFontSize: 1
    }
  },
})
</script>

<style lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
#content-container {
  font-size: calc(v-bind(baseFontSize) * $font-size-base);
  h1 { font-size: calc(v-bind(baseFontSize) * $h1-font-size); }
  h2 { font-size: calc(v-bind(baseFontSize) * $h2-font-size); }
  h3 { font-size: calc(v-bind(baseFontSize) * $h3-font-size); }
  h4 { font-size: calc(v-bind(baseFontSize) * $h4-font-size); }
  h5 { font-size: calc(v-bind(baseFontSize) * $h5-font-size); }
  h6 { font-size: calc(v-bind(baseFontSize) * $h6-font-size); }
}
</style>
