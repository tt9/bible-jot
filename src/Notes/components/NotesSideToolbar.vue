<script lang="ts" setup>
import SideToolbar from '../../components/molecules/SideToolbar.vue'
import SideToolbarItem from '../../components/molecules/SideToolbarItem.vue'

const open = defineModel<boolean>()
</script>
<template>
  <SideToolbar v-model="open">
    <SideToolbarItem iconName="check">Test</SideToolbarItem>
  </SideToolbar>
</template>
<style lang="scss" scoped></style>
