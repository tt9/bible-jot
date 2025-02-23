<script lang="ts" setup>
import AppIcon from '../atoms/AppIcon.vue'

interface PopoverMenuItemProps {
  iconName?: string
}

const props = defineProps<PopoverMenuItemProps>()
</script>
<template>
  <div class="popover-menu-item" role="menuitem">
    <AppIcon v-if="props.iconName" :name="props.iconName"></AppIcon>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.popover-menu-item {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
