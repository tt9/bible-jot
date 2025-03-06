<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'

interface NotesLayoutProps {
  title: string
}

interface NotesLayoutEmits {
  (e: 'menu:click'): void
}

const props = defineProps<NotesLayoutProps>()
const emit = defineEmits<NotesLayoutEmits>()
</script>

<template>
  <div class="notes-toolbar">
    <div class="notes-toolbar__container">
      <p class="notes-toolbar__title" :title="props.title">{{ props.title }}</p>
      <IconButton
        name="menu"
        size="sm"
        class="notes-toolbar__menu-button"
        @click="emit('menu:click')"
      ></IconButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notes-toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
  background-color: white;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0.5rem;
  }

  &__title {
    font-size: var(--font-size-2);
    margin: 0;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__menu-button {
    margin-left: auto;
  }
}
</style>
