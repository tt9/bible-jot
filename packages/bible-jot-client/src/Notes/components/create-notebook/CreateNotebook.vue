<script lang="ts" setup>
import AppInput from '../../../components/atoms/AppInput.vue'

interface CreateNotebookEmit {
  (e: 'create:notebook', data: any): void
}

const emit = defineEmits<CreateNotebookEmit>()

const handleFormSubmit = () => {
  emit('create:notebook', {})
}
</script>
<template>
  <div>
    <p class="create-notebook--title title">Create Notebook</p>

    <form @submit.prevent="handleFormSubmit">
      <AppInput label="Notebook Name"></AppInput>
      <input type="submit" value="create" />
    </form>
  </div>
</template>
