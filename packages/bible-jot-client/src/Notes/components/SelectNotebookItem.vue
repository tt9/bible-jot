<script lang="ts" setup>
import PopoverMenu from '../../components/molecules/PopoverMenu.vue'
import PopoverMenuItem from '../../components/molecules/PopoverMenuItem.vue'
import type { Notebook } from '../Notebook'

interface SelectNotebookItemProps {
  notebook: Partial<Notebook>
}

const props = defineProps<SelectNotebookItemProps>()

const handleClick = () => {}
</script>
<template>
  <div class="select-notebook--item">
    <div class="select-notebook--item--header">
      <RouterLink :to="'/notes/' + notebook.id" :key="notebook.id">
        <span class="select-notebook--item--title">{{
          props.notebook.name
        }}</span>
      </RouterLink>
      <div class="select-notebook--item--more">
        <PopoverMenu>
          <PopoverMenuItem @click="handleClick" icon-name="trash">
            Delete
          </PopoverMenuItem>
        </PopoverMenu>
      </div>
    </div>
    <p>
      Last Updated: {{ props.notebook.updatedAt || props.notebook.createdAt }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.select-notebook {
  &--item {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-align: left;

    &--more {
      cursor: pointer;
    }
    &--header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    &--title {
      font-weight: bold;
      font-size: var(--font-size-3);
      margin-block-start: 0;
      margin-block-end: 0.25rem;
    }
  }
}
</style>
