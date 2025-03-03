<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'
import PageNotes from './PageNotes.vue'

const open = defineModel<boolean>()
</script>
<template>
  <Transition>
    <div class="page-notes-sidebar" :class="{ open }" v-if="open">
      <div class="page-notes-sidebar__toolbar">
        <span></span>
        <IconButton
          name="x-circle"
          size="sm"
          @click="open = false"
        ></IconButton>
      </div>
      <div class="page-notes-sidebar__content">
        <PageNotes></PageNotes>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.page-notes-sidebar {
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
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1 1 auto;
    display: flex;
    display: flex;
    flex-direction: column;
  }
  &__toolbar {
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
