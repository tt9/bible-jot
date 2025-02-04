<script lang="ts" setup>
interface AppInputProps {
  label?: string
  id?: string
}
const props = withDefaults(defineProps<AppInputProps>(), {})
const model = defineModel()
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
