import AppInput from './AppInput.vue'
import { render } from '@testing-library/vue'

describe('AppInput', () => {
  it('should render with defaults', async () => {
    const wrapper = render(AppInput, {
      props: {
        modelValue: 'hello world',
        label: 'hello',
        id: 'test-1',
      },
    })

    const inputElement = wrapper.baseElement.querySelector('input')
    const labelElement = wrapper.baseElement.querySelector('label')
    expect(labelElement?.textContent).toBe('hello')
    expect(inputElement?.value).toBe('hello world')
  })
})
