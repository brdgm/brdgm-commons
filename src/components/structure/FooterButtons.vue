<template>
  <div class="end-game-buttons">
    <router-link v-if="backButtonRouteTo && backLabel" :to="backButtonRouteTo" class="btn btn-secondary btn-sm me-2">{{backLabel}}</router-link>
    <button v-if="endGameLabel" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#endGameModal">{{endGameLabel}}</button>
  </div>

  <div v-if="endGameLabel" class="modal" id="endGameModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{endGameLabel}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{endGameConfirmMessage}}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" @click="endGame" data-bs-dismiss="modal">{{endGameLabel}}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{cancelLabel}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterButtons',
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
  z-index: 5000;
}
</style>