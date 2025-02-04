import { NotesPageServiceSymbol } from '../NotesPageSymbol'
import NotesItem from './NotesItem.vue'
import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { defineComponent, provide } from 'vue'

const TestComponent = defineComponent({
  props: ['note', 'notebook', 'notebookPage'],
  setup() {
    provide(NotesPageServiceSymbol, vi.fn())
  },
  template: `
    <NotesItem
      :note="note"
      :notebook="notebook"
      :notebookPage="notebookPage"
    ></NotesItem>
  `,
  components: {
    NotesItem,
  },
})

describe('NotesItem', () => {
  it('should render without crashing', () => {
    const wrapper = render(TestComponent, {
      props: {
        note: {
          id: '1',
          order: 1,
          verseAddress: 'GEN:1:1',
          notes: 'Sample note',
          notebookId: '1',
        },
        notebook: {
          id: '1',
          name: 'sample notebook',
          pages: [],
          globalNotes: [],
          version: 'ukjv',
        },
        notebookPage: {
          id: '1',
          name: 'sample page',
          verseNotes: [
            {
              id: '1',
              order: 1,
              verseAddress: 'GEN:1:1',
              notes: 'Sample note',
              notebookId: '1',
            },
          ],
          pageNotes: [],
          notebookId: '1',
        },
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
