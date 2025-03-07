<script lang="ts" setup>
import SideToolbar from '../../components/molecules/SideToolbar.vue'
import SideToolbarItem from '../../components/molecules/SideToolbarItem.vue'

const open = defineModel<boolean>()
</script>
<template>
  <SideToolbar v-model="open">
    <SideToolbarItem iconName="save">Export</SideToolbarItem>
    <SideToolbarItem iconName="edit-3">Rename</SideToolbarItem>
  </SideToolbar>
</template>
<style lang="scss" scoped></style>
