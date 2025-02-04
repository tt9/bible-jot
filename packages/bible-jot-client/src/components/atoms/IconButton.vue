<script lang="ts" setup>
import AppButton from './AppButton.vue'
import AppIcon from './AppIcon.vue'
import type { ButtonColor, ButtonVariant } from './Button'

interface IconButtonProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
  color?: ButtonColor
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  name: 'plus-circle',
  variant: 'transparent',
  color: 'primary',
})
</script>

<template>
  <AppButton :variant="props.variant" :size="props.size" :color="props.color">
    <div class="icon-button--content">
      <AppIcon :name="props.name"></AppIcon>
      <slot></slot>
    </div>
  </AppButton>
</template>

<style lang="scss" scoped>
.icon-button--content {
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: bold;
  gap: 0.25rem;
}
</style>
