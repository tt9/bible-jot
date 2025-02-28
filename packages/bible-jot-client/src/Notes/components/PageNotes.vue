<script lang="ts" setup>
import { useNotebook } from '../useNotebook'

const { activePage } = useNotebook()
</script>

<template>
  <div class="p-4">
    <p>Page Notes:</p>
    <textarea
      class="page-notes__editor"
      v-model="activePage.pageNotes.notes"
    ></textarea>
  </div>
</template>
<style lang="scss"></style>
