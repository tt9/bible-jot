// MyComponent.test.js
import { render } from '@testing-library/vue'
import VerseText from './VerseText.vue'

describe('VerseText', () => {
  it('should render BibleVerse text', () => {
    const component = render(VerseText, {
      props: {
        /* ... */
        verse: {
          verseNumber: 13,
          version: 'test',
          bookName: 'genesis',
          bookKey: 'GEN',
          chapter: 50,
          text: 'hello world',
        },
      },
    })

    expect(component.getByText('hello world').className).toContain('bible-text')
    component.getByText('13', { exact: false })
  })
})
