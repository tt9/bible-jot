<script lang="ts" setup>
import { computed } from 'vue'
import markdownit from 'markdown-it'
const md = markdownit({
  breaks: true,
})

interface NotesTextProps {
  content: string
}
const props = defineProps<NotesTextProps>()
const formattedContent = computed(() => {
  return md.render(props.content)
})
</script>
<template>
  <div
    class="notes-text-block markdown-format"
    :innerHTML="formattedContent"
  ></div>
</template>

<style lang="scss" scoped>
.notes-text-block {
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 4px 2px rgba(0, 0, 0, 0.16);
  background: #fafafa;
  position: relative;
  max-height: 200px;
  overflow-y: auto;
}

.notes-text-block {
  &.p {
    margin: 0;
  }
}
</style>

<style lang="scss">
.markdown-format {
  p {
    margin: 0;
    margin-block-start: 0.25rem;
    margin-block-end: 0.25rem;
  }
  ul,
  ol {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
    padding-inline-start: 1.25rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
  }
}
</style>
