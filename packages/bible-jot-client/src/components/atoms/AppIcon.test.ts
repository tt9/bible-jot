import AppIcon from './AppIcon.vue'
import { render } from '@testing-library/vue'

describe('AppIcon', () => {
  it('should have the correct url', () => {
    const wrapper = render(AppIcon, {
      props: {
        name: 'plus-circle',
      },
    })

    expect(wrapper.getByRole('img').getAttribute('src')).toBe(
      '/icons/plus-circle.svg',
    )
  })
})
