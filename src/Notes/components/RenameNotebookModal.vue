<script lang="ts" setup>
import { reactive } from 'vue'
import AppButton from '../../components/atoms/AppButton.vue'
import AppInput from '../../components/atoms/AppInput.vue'
import Modal from '../../components/molecules/Modal.vue'
import { useNotebook } from '../useNotebook'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getErrorMessages } from '../../forms/error'

const formState = reactive({
  notebookName: '',
})

const formRules = {
  notebookName: {
    required,
  },
}

const vuelidate = useVuelidate(formRules, formState)

const open = defineModel()
const { activeNotebook } = useNotebook()

const handleCancelClicked = async () => {
  open.value = false
}
const handleSaveClicked = async () => {
  const isFormValid = await vuelidate.value.$validate()
  if (!isFormValid) return

  activeNotebook.value.name = formState.notebookName
  open.value = false
}
</script>
<template>
  <Modal v-model="open">
    <div class="modal-content-wrap">
      <p class="modal-content-wrap__title mb-4">Rename Notebook</p>
      <form @submit.prevent="handleSaveClicked">
        <AppInput
          class="mb-4"
          label="Notebook Name"
          :errors="getErrorMessages(vuelidate, 'notebookName')"
          v-model="formState.notebookName"
        ></AppInput>
        <div class="modal-content-wrap__actions">
          <AppButton
            variant="outline"
            color="gray-dark"
            @click="handleCancelClicked"
            >Cancel</AppButton
          >
          <AppButton type="submit" color="primary" @click="handleSaveClicked"
            >Save</AppButton
          >
        </div>
      </form>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.modal-content-wrap {
  &__title {
    font-size: var(--font-size-3);
    font-weight: bold;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
