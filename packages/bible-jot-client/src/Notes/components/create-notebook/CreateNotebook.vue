<script lang="ts" setup>
import { reactive, ref, version, watch } from 'vue'
import AppButton from '../../../components/atoms/AppButton.vue'
import AppInput from '../../../components/atoms/AppInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getErrorMessages } from '../../../forms/error'
import AppSelect from '../../../components/atoms/AppSelect.vue'

interface CreateNotebookEmit {
  (e: 'create:notebook', data: any): void
}

const emit = defineEmits<CreateNotebookEmit>()

const isFormValid = ref<boolean>(false)

const formState = reactive({
  notebookName: '',
  version: 'kjv',
})

const formRules = {
  notebookName: {
    required,
  },
  version: {
    required,
  },
}

const vuelidate = useVuelidate(formRules, formState)
watch(formState, async () => {
  isFormValid.value = await vuelidate.value.$validate()
})

const handleFormSubmit = async () => {
  const isValid = await vuelidate.value.$validate()
  if (!isValid || !isFormValid.value) return

  emit('create:notebook', formState)
}
</script>
<template>
  <div>
    <p class="create-notebook--title title-lg mb-3">Create Notebook</p>
    <form @submit.prevent="handleFormSubmit">
      <div class="mb-3">
        <AppInput
          label="Notebook Name"
          v-model="formState.notebookName"
          :errors="getErrorMessages(vuelidate, 'notebookName')"
        ></AppInput>
      </div>

      <div class="mb-3">
        <AppSelect v-model="formState.version" label="Default Version">
          <option value="kjv">KJV</option>
          <option value="mkjv">MKJV</option>
          <option value="litv">LITV</option>
        </AppSelect>
      </div>

      <AppButton
        type="submit"
        value="create"
        class="btn btn-primary"
        :disabled="!isFormValid"
      >
        Create</AppButton
      >
    </form>
  </div>
</template>
