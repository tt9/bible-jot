<script lang="ts" setup>
import type { Notebook } from '../Notebook'

interface SelectNotebookItemProps {
  notebook: Partial<Notebook>
}

const props = defineProps<SelectNotebookItemProps>()
</script>
<template>
  <RouterLink
    :to="'/notes/' + notebook.id"
    :key="notebook.id"
    class="select-notebook--item"
  >
    <p class="select-notebook--item--title">{{ props.notebook.name }}</p>
    <p>
      Last Updated: {{ props.notebook.updatedAt || props.notebook.createdAt }}
    </p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.select-notebook {
  &--item {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-align: center;

    &--title {
      font-weight: bold;
      font-size: var(--font-size-3);
      margin-block-start: 0;
      margin-block-end: 0.25rem;
    }
  }
}
</style>
