<script setup lang="ts">
import BottomMenu from '../molecules/BottomMenu.vue'
</script>

<template>
  <div class="app-surface">
    <div class="layout-content">
      <slot name="default"></slot>
    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<style lang="scss" scoped>
.app-surface {
  height: 100vh;
  height: 100dvh;
}
</style>
