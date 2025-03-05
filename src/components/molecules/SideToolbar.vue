<script lang="ts" setup>
import IconButton from '../atoms/IconButton.vue'
const open = defineModel<boolean>()
</script>
<template>
  <Transition>
    <div class="side-toolbar" :class="{ open }" v-if="open">
      <div class="side-toolbar__header">
        <slot name="header">
          <span></span>
          <IconButton
            name="x-circle"
            size="sm"
            @click="open = false"
          ></IconButton>
        </slot>
      </div>
      <div class="side-toolbar__content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.side-toolbar {
  min-width: 325px;
  width: 325px;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  box-shadow: -2px 0 4px 2px rgba(0, 0, 0, 0.16);
  z-index: 2;
  transition: transform 275ms cubic-bezier(0.4, 0, 0.2, 1);

  &__header {
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.v-enter-active,
.v-leave-active {
  transform: translate(0px, 0px);
}

.v-enter-from,
.v-leave-to {
  transform: translate(325px, 0px);
}
</style>
