<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'

const open = defineModel<boolean>()
</script>
<template>
  <div class="notes-tool-panel" :class="{ open }">
    <div class="notes-tool-panel--toolbar">
      <span></span>
      <IconButton name="x-circle" size="sm" @click="open = false"></IconButton>
    </div>
    <div class="notes-tool-panel--content">Content</div>
  </div>
</template>
<style lang="scss" scoped>
.notes-tool-panel {
  min-width: 325px;
  width: 325px;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  transform: translate(325px, 0px);
  box-shadow: -2px 0 4px 2px rgba(0, 0, 0, 0.16);
  z-index: 2;
  transition: transform 275ms cubic-bezier(0.4, 0, 0.2, 1);
}

.notes-tool-panel.open {
  transform: translate(0, 0);
}

.notes-tool-panel--toolbar {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

// @media all and (min-width: 1440px) {
//   .notes-tool-panel {
//     right: 0;
//     top: 48px;
//     z-index: 0;
//     transform: translate(0, 0);
//   }
// }
</style>
