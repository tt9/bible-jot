<script lang="ts" setup>
interface NoTextSelectionProps {
  allowSelection?: boolean
}

const props = withDefaults(defineProps<NoTextSelectionProps>(), {
  allowSelection: false,
})
</script>
<template>
  <div :class="{ 'no-text-selection': !props.allowSelection }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.no-text-selection {
  user-select: none;
}
</style>
