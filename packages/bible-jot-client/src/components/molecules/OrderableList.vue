<script setup lang="ts">
import { computed } from 'vue'

import IconButton from '../atoms/IconButton.vue'

interface OrderableListProps {
  items: any[]
  compare?: (a: any, b: any) => number
  showControls?: boolean
}

interface OrderableListEmits {
  (e: 'order:up', item: any, allItems: any[]): void
  (e: 'order:down', item: any, allItems: any[]): void
}

const props = withDefaults(defineProps<OrderableListProps>(), {
  showControls: true,
})

const emit = defineEmits<OrderableListEmits>()

const orderedItems = computed(() => {
  if (!props.compare) {
    return props.items
  }
  return props.items.sort(props.compare)
})
</script>

<template>
  <div class="orderable-list">
    <div class="orderable-list-item" v-for="item in orderedItems">
      <div class="orderable-list-item-content">
        <slot name="item" v-bind:item="item"></slot>
      </div>
      <div class="orderable-list-controls" v-if="showControls">
        <IconButton
          name="chevron-up"
          size="sm"
          @click="emit('order:up', item, props.items)"
        ></IconButton>
        <IconButton
          name="chevron-down"
          size="sm"
          @click="emit('order:down', item, props.items)"
        ></IconButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.orderable-list-item {
  display: flex;

  .orderable-list-item-content {
    flex: 1;
  }

  .orderable-list-controls {
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
  }
}
</style>
