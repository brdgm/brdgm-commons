<template>
  <div class="end-game-buttons">
    <router-link v-if="backButtonRouteTo && backLabel" :to="backButtonRouteTo" class="btn btn-secondary btn-sm me-2">{{backLabel}}</router-link>
    <button v-if="endGameLabel" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#endGameModal">{{endGameLabel}}</button>
  </div>

  <ModalDialog v-if="endGameLabel" id="endGameModal" :title="endGameLabel">
    <template #body>
      <p>{{endGameConfirmMessage}}</p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="endGame" data-bs-dismiss="modal">{{endGameLabel}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{cancelLabel}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalDialog from './ModalDialog.vue'

export default defineComponent({
  name: 'FooterButtons',
  components: {
    ModalDialog
  },
  props: {
    backLabel: {
      type: String,
      required: false
    },
    backButtonRouteTo: {
      type: String,  /* router-link to */
      required: false
    },
    endGameLabel: {
      type: String,
      required: false
    },
    endGameConfirmMessage: {
      type: String,
      required: false
    },
    cancelLabel: {
      type: String,
      required: false
    }
  },
  emits: ['endGame'],
  methods: {
    endGame() {
      this.$emit('endGame')
    }
  }
})
</script>

<style lang="scss" scoped>
.end-game-buttons {
  position: fixed;
  right: 0;
  bottom: 0;
  /* Position over fixed footer (but not above Modal) */
  z-index: 1031;
}
</style>