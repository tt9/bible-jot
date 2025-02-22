<script lang="ts" setup>
interface AppSelectProps {
  label?: string
  id?: string
  errors?: string[]
}

const props = defineProps<AppSelectProps>()
const model = defineModel()
</script>
<template>
  <div class="app-select">
    <label class="app-select--label" v-if="props.label" :for="props.id || ''">
      {{ props.label }}
    </label>
    <select v-model="model" :id="props.id || ''" class="app-select--select">
      <slot></slot>
    </select>
    <div
      v-if="props.errors && props.errors.length > 0"
      class="app-select--error"
    >
      {{ props.errors[0] }}
    </div>
  </div>
</template>

<style lang="scss">
.app-select {
  width: 100%;
  position: relative;
  &--label {
    display: block;
    margin: 0.25rem 0;
    font-size: var(--font-size-1);
  }
  &--select {
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    width: 100%;
    border: 1px solid var(--color-gray-dark);
    border-radius: 0.25rem;
  }

  &--error {
    color: var(--color-error);
    font-size: var(--font-size-1);
    font-weight: bold;
  }
}
</style>
