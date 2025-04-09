import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ScoringTextInput from '@/components/form/ScoringTextInput.vue'

describe('ScoringTextInput.vue', () => {
  it('renders correctly with initial modelValue', () => {
    const wrapper = mount(ScoringTextInput, {
      props: { modelValue: 10 }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('10')
  })

  it('emits the correct value when input changes', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    await input.setValue('5+10-1')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([14])
  })

  it('emits the max value when input value is > max', async () => {
    const wrapper = mount(ScoringTextInput, {
      props: { modelValue: 10, max: 20 }
    })
    const input = wrapper.find('input')

    await input.setValue('25')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([20])
  })

  it('emits the min value when input value is < min', async () => {
    const wrapper = mount(ScoringTextInput, {
      props: { modelValue: -10, min: -20 }
    })
    const input = wrapper.find('input')

    await input.setValue('-25')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([-20])
  })

  it('emits undefined for invalid input', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    await input.setValue('invalid')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([undefined])
  })

  it('suppresses invalid keys', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true })
    await input.element.dispatchEvent(event)

    expect(event.defaultPrevented).to.true
  })

  it('allows valid keys', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    const event = new KeyboardEvent('keydown', { key: '5', cancelable: true })
    await input.element.dispatchEvent(event)

    expect(event.defaultPrevented).to.false
  })

  it('selects all text on focus', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    await input.setValue('123')
    await input.trigger('focus')

    expect(input.element.selectionStart).toBe(0)
    expect(input.element.selectionEnd).toBe(3)
  })

  it('handles empty input gracefully', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    await input.setValue('')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([undefined])
  })

  it('handles input with extra spaces', async () => {
    const wrapper = mount(ScoringTextInput)
    const input = wrapper.find('input')

    await input.setValue('  5  +  10 - 2  ')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([13])
  })
})
