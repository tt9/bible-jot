<script lang="ts" setup>
import PopoverMenu from '../../components/molecules/PopoverMenu.vue'
import PopoverMenuItem from '../../components/molecules/PopoverMenuItem.vue'
import type { Notebook } from '../Notebook'

interface SelectNotebookItemProps {
  notebook: Partial<Notebook>
}

interface SelectNotebookItemEmits {
  (e: 'item:delete', id: string): void
}

const props = defineProps<SelectNotebookItemProps>()
const emit = defineEmits<SelectNotebookItemEmits>()

const handleDeleteItemClick = () => {
  let confirmed = confirm('Are you sure you want to delete this notebook?')
  if (!confirmed) return

  emit('item:delete', props.notebook.id || '')
}
</script>
<template>
  <div class="select-notebook-item">
    <div class="select-notebook-item__header">
      <RouterLink
        :to="{ name: 'edit-note', params: { id: notebook.id } }"
        :key="notebook.id"
        class="select-notebook-item__title-link"
      >
        <span class="select-notebook-item__title">{{
          props.notebook.name
        }}</span>
      </RouterLink>
      <div class="select-notebook-item__more">
        <PopoverMenu>
          <PopoverMenuItem
            @click="handleDeleteItemClick"
            icon-name="trash"
            class="select-notebook-item__more-item"
          >
            Delete
          </PopoverMenuItem>
        </PopoverMenu>
      </div>
    </div>
    <p class="select-notebook-item__last-updated">
      Last Updated: {{ props.notebook.updatedAt || props.notebook.createdAt }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.select-notebook-item {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-align: left;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__title-link {
    text-decoration: none;
    display: block;
    flex: 1;
    max-width: 100%;
  }

  &__title {
    font-weight: bold;
    font-size: var(--font-size-2);
    margin-block-start: 0;
    margin-block-end: 0.25rem;
    color: var(--color-gray-dark);
  }

  &__more {
    cursor: pointer;
  }

  &__more-item {
    padding: 0.25rem 0.5rem;
  }

  &__last-updated {
    font-size: var(--font-size-1);
    margin-block-start: 0;
    margin-block-end: 0.25rem;
  }
}
</style>
