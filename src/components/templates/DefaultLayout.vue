<script setup lang="ts">
import BottomMenu from '../molecules/BottomMenu.vue'
</script>

<template>
  <div class="app-surface">
    <slot name="default"></slot>
    <BottomMenu></BottomMenu>
  </div>
</template>

<style lang="scss" scoped></style>
