<script lang="ts" setup>
import { watch } from 'vue'

interface AppInputProps {
  label?: string
  id?: string
  errors?: string[]
}
const props = withDefaults(defineProps<AppInputProps>(), {})
const model = defineModel()

watch(
  () => props.errors,
  () => {
    console.log(props.errors)
  },
)
</script>
<template>
  <div class="app-input">
    <label class="app-input--label" :for="props.id || ''">{{
      props.label
    }}</label>
    <input
      role="textbox"
      class="app-input--input"
      :id="props.id || ''"
      v-model="model"
    />
    <div
      v-if="props.errors && props.errors.length > 0"
      class="app-input--error"
    >
      {{ props.errors[0] }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-input {
  width: 100%;
  position: relative;
  .app-input--label {
    display: block;
    margin: 0.25rem 0;
  }
  .app-input--input {
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    width: 100%;
    border: 1px solid var(--color-gray-dark);
    border-radius: 0.25rem;
  }
}
</style>
