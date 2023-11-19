<template>
  <div class="modal" :id="id" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" :class="{
       'modal-dialog-centered': centered,
       'modal-dialog-scrollable': scrollable,
       'modal-sm': sizeSm,
       'modal-lg': sizeLg,
       'modal-xl': sizeXl,
       'modal-fullscreen': fullscreen,
       'modal-fullscreen-sm-down': fullscreenSmDown,
       'modal-fullscreen-md-down': fullscreenMdDown,
       'modal-fullscreen-lg-down': fullscreenLgDown,
       'modal-fullscreen-xl-down': fullscreenXlDown,
       'modal-fullscreen-xxl-down': fullscreenXxlDown
    }">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{title}}</h5>
            <button class="btn-close" data-bs-dismiss="modal" :aria-label="t(closeI18nKey)"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">{{t(closeI18nKey)}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ModalDialog',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    centered: {
      type: Boolean,
      required: false,
      default: true
    },
    scrollable: {
      type: Boolean,
      required: false
    },
    sizeSm: {
      type: Boolean,
      required: false
    },
    sizeLg: {
      type: Boolean,
      required: false
    },
    sizeXl: {
      type: Boolean,
      required: false
    },
    fullscreen: {
      type: Boolean,
      required: false
    },
    fullscreenSmDown: {
      type: Boolean,
      required: false
    },
    fullscreenMdDown: {
      type: Boolean,
      required: false
    },
    fullscreenLgDown: {
      type: Boolean,
      required: false
    },
    fullscreenXlDown: {
      type: Boolean,
      required: false
    },
    fullscreenXxlDown: {
      type: Boolean,
      required: false
    },
    closeI18nKey: {
      type: String,
      required: false,
      default: 'action.close'
    }
  }
})
</script>
