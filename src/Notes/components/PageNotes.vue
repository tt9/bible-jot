<script lang="ts" setup>
import InfoBubble from '../../components/atoms/InfoBubble.vue'
import { PopoverMenuAnchorPoint } from '../../components/molecules/Popover'
import { useNotebook } from '../useNotebook'

const { activePage } = useNotebook()
</script>

<template>
  <div class="page-notes p-4">
    <p class="page-notes__title">
      Notes:
      <InfoBubble :anchor-point="PopoverMenuAnchorPoint.TOP_LEFT"
        >This is an area where you can take general notes for your study. A
        great area to capture applications, takeaways and main
        points.</InfoBubble
      >
    </p>
    <textarea
      class="page-notes__editor"
      v-model="activePage.pageNotes.notes"
    ></textarea>
  </div>
</template>
<style lang="scss">
.page-notes {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  &__title {
    font-size: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  &__editor {
    width: 100%;
    flex: 1 1 auto;
  }
}
</style>
