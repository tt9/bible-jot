<script lang="ts" setup>
import { computed } from 'vue'
import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from './Button'

interface AppButtonProps {
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  shape?: ButtonShape
}

// interface AppButtonEmits {
//     (e: 'click'): void
//     (e: 'submit'): void
//     (e: 'hover'): void
//     (e: 'focus'): void
// }

// const emits = defineEmits<AppButtonEmits>()

const props = withDefaults(defineProps<AppButtonProps>(), {
  type: 'button',
  disabled: false,
  variant: 'fill',
  size: 'md',
  color: 'primary',
  shape: 'rounded',
})

const className = computed(() => {
  return `app-button app-button--${props.variant} app-button--${props.size} app-button--${props.color} app-button--${props.shape} ${props.disabled ? 'app-button--disabled' : ''}`
})
</script>

<template>
  <button
    :type="props.type"
    :attrs="$attrs"
    :class="className"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  display: block;
  border: none;
  cursor: pointer;
}

.app-button--disabled {
  cursor: not-allowed;
}

.app-button--sm {
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-2);
}

.app-button--md {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-3);
}

.app-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-4);
}

.app-button--square {
  border-radius: 0;
}

.app-button--rounded {
  border-radius: 0.25rem;
}

.app-button--pill {
  border-radius: 9999px;
}

.app-button--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);

  &.app-button--outline {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  &.app-button--transparent {
    background-color: transparent;
    color: var(--color-primary);
  }

  &.app-button--disabled {
    cursor: not-allowed;
    background-color: var(--color-gray);
    color: var(--color-gray-contrast);
  }
}

.app-button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-contrast);
}

.app-button--gray {
  background-color: var(--color-gray);
  color: var(--color-secondary-contrast);

  &.app-button--outline {
    background-color: transparent;
    border: 2px solid var(--color-gray);
    color: var(--color-gray);
  }
}
</style>
