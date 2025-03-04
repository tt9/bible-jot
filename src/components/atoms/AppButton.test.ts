import { render } from '@testing-library/vue'
import AppButton from './AppButton.vue'

describe('AppButton', () => {
  it('should render with defaults', () => {
    const wrapper = render(AppButton, {
      slots: {
        default: 'hello world',
      },
      props: {
        disabled: false,
      },
    })

    const buttonWrapper = wrapper.getByText('hello world')

    expect(buttonWrapper.classList).toContain('app-button')
    expect(buttonWrapper.classList).toContain('app-button--primary')
    expect(buttonWrapper.classList).toContain('app-button--fill')
    expect(buttonWrapper.classList).toContain('app-button--rounded')

    expect(buttonWrapper.getAttributeNames()).not.toContain('disabled')
  })

  it('should render with disabled', () => {
    const wrapper = render(AppButton, {
      slots: {
        default: 'hello world',
      },
      props: {
        disabled: true,
      },
    })

    const buttonWrapper = wrapper.getByText('hello world')

    expect(buttonWrapper.classList).toContain('app-button')
    expect(buttonWrapper.classList).toContain('app-button--primary')
    expect(buttonWrapper.classList).toContain('app-button--fill')
    expect(buttonWrapper.classList).toContain('app-button--rounded')

    expect(buttonWrapper.getAttributeNames()).toContain('disabled')
  })

  it('style classes should reflect props', () => {
    const wrapper = render(AppButton, {
      slots: {
        default: 'hello world',
      },
      props: {
        disabled: false,
        variant: 'outline',
        size: 'sm',
        color: 'secondary',
        shape: 'square',
      },
    })

    const buttonWrapper = wrapper.getByText('hello world')

    expect(buttonWrapper.classList).toContain('app-button')
    expect(buttonWrapper.classList).toContain('app-button--secondary')
    expect(buttonWrapper.classList).toContain('app-button--outline')
    expect(buttonWrapper.classList).toContain('app-button--square')
  })
})
