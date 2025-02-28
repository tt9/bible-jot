<script lang="ts" setup>
import { ref } from 'vue'
import Popover from '../molecules/Popover.vue'
import AppIcon from './AppIcon.vue'
import { PopoverMenuAnchorPoint } from '../molecules/Popover'

const infoBubbleHostRef = ref<HTMLElement | null>(null)
const show = ref<boolean>(false)
</script>
<template>
  <div class="info-bubble" ref="infoBubbleHostRef">
    <AppIcon name="info" @click="show = !show"></AppIcon>
    <Popover
      v-if="infoBubbleHostRef"
      :hostElement="infoBubbleHostRef"
      :anchorPoint="PopoverMenuAnchorPoint.TOP_RIGHT"
      v-model="show"
    >
      <div class="info-bubble__content p-2">
        <slot></slot>
      </div>
    </Popover>
  </div>
</template>
<style lang="scss">
.info-bubble {
  position: relative;
  display: inline-block;
}
.info-bubble__content {
  background: white;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
  border-radius: 0.25rem;
  max-width: 300px;
}
</style>
