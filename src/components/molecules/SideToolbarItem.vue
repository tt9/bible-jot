<script lang="ts" setup>
import AppIcon from '../atoms/AppIcon.vue'

interface SideToolbarItemProps {
  iconName?: string
}

const props = defineProps<SideToolbarItemProps>()
</script>
<template>
  <div class="side-toolbar-item">
    <AppIcon :name="props.iconName" v-if="props.iconName"></AppIcon>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.side-toolbar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
