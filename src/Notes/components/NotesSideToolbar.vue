<script lang="ts" setup>
import { ref } from 'vue'
import SideToolbar from '../../components/molecules/SideToolbar.vue'
import SideToolbarItem from '../../components/molecules/SideToolbarItem.vue'
import RenameNotebookModal from './RenameNotebookModal.vue'

const open = defineModel<boolean>()

const renameNotebookOpen = ref<boolean>(false)
</script>
<template>
  <SideToolbar v-model="open">
    <!-- <SideToolbarItem iconName="save">Export</SideToolbarItem> -->
    <SideToolbarItem iconName="edit-3" @click="renameNotebookOpen = true"
      >Rename</SideToolbarItem
    >
  </SideToolbar>
  <RenameNotebookModal v-model="renameNotebookOpen"></RenameNotebookModal>
</template>
<style lang="scss" scoped></style>
