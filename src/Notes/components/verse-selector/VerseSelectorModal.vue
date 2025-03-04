<script lang="ts" setup>
/**
 * TODO: I think the logic for this component can be
 * refactored to be cleaner and make more logical sense
 * for someone reading it. Current time constraints prefer working
 * over perfect.
 *
 * NOTE: only ever create one instance of this, as it is
 * tightly coupled to the useNotebookComposable with the purpose
 * of being the one "VerseSelectionModal" to be called on by
 * any nested children components as needed
 *
 * In the future we can abstract a modal controller pattern if needed.
 */
import { onMounted, ref } from 'vue'
import Modal from '../../../components/molecules/Modal.vue'
import { useNotebook } from '../../useNotebook'
import VerseSelector from './VerseSelector.vue'

const {
  registerVerseSelectorModal,
  notebook,
  emitVerseSelectionCanceled,
  emitVersesSelected,
} = useNotebook()

const showModal = ref<boolean>(false)

const handleVersesSelected = (verses: string[]) => {
  emitVersesSelected(verses)
}

const closeModalAndPopWindowState = () => {
  window.history.back()
  emitVerseSelectionCanceled()
}

const closeModal = () => {
  emitVerseSelectionCanceled()
}

onMounted(() => {
  registerVerseSelectorModal({
    showModalRef: showModal,
  })
})
</script>
<template>
  <Modal v-model="showModal" width="600px" @modal:close="closeModal()">
    <div class="modal-content-wrap">
      <VerseSelector
        :reset-state="showModal"
        :version="notebook?.version || ''"
        @select:verses="handleVersesSelected"
        @click:back="closeModalAndPopWindowState()"
      ></VerseSelector>
    </div>
  </Modal>
</template>
