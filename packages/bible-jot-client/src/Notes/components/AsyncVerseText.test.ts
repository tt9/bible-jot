import AsyncVerseText from './AsyncVerseText.vue'
import { render } from '@testing-library/vue'
import { beforeAll, vi } from 'vitest'

describe('AsyncVerseText', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls the bible service to render the text', async () => {
    vi.mock('../../bible/BibleService', () => {
      return {
        getVerse: () => {
          return {
            version: 'test',
            bookName: 'genesis',
            bookKey: 'GEN',
            chapter: 50,
            verseNumber: 3,
            text: 'hello world',
          }
        },
      }
    })

    const wrapper = render(AsyncVerseText, {
      props: {
        /* ... */
        version: 'kjv',
        verseAddress: 'GEN:1:1',
      },
    })

    await vi.runAllTimersAsync()
    wrapper.getAllByText('hello world', { exact: false })
  })
})
