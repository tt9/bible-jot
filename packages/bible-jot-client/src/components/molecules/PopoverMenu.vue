<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '../atoms/IconButton.vue'
import Popover from './Popover.vue'

const showPopover = ref<boolean>(false)
</script>
<template>
  <div>
    <IconButton
      size="sm"
      name="more-vertical"
      @click="showPopover = true"
    ></IconButton>
    <Popover v-model="showPopover">
      <div class="popover-menu-content" role="menu">
        <slot></slot>
      </div>
    </Popover>
  </div>
</template>
<style lang="scss">
.popover-menu-content {
  background: white;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.16);
  border-radius: 0.25rem;
}
</style>
