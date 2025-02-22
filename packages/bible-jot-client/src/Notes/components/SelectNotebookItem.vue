<script lang="ts" setup>
import { ref, watch } from 'vue'
import AppIcon from '../../components/atoms/AppIcon.vue'
import PopoverMenu from '../../components/molecules/PopoverMenu.vue'
import type { Notebook } from '../Notebook'

interface SelectNotebookItemProps {
  notebook: Partial<Notebook>
}

const props = defineProps<SelectNotebookItemProps>()

const showPopoverMenu = ref<boolean>(false)

watch(showPopoverMenu, () => {
  console.log(`showPopoverMenu: ${showPopoverMenu.value}`)
})
</script>
<template>
  <div class="select-notebook--item">
    <PopoverMenu v-model="showPopoverMenu"></PopoverMenu>
    <div class="select-notebook--item--header">
      <RouterLink :to="'/notes/' + notebook.id" :key="notebook.id">
        <span class="select-notebook--item--title">{{
          props.notebook.name
        }}</span>
      </RouterLink>
      <div @click="showPopoverMenu = true">
        <AppIcon name="info"> </AppIcon>
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
