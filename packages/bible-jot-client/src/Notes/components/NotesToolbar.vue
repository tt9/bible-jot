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
    <div class="container notes-container">
      <p class="notes-toolbar--title">{{ props.title }}</p>
      <IconButton
        name="menu"
        size="sm"
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

  &--title {
    font-size: var(--font-size-3);
    margin: 0;
    font-weight: bold;
  }
}
.notes-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0.5rem;
}
</style>
