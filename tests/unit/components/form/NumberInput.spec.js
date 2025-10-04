import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import NumberInput from '@/components/form/NumberInput.vue'

describe('NumberInput.vue', () => {
  it('renders correctly with initial modelValue', () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: 10 }
    })
    const input = wrapper.find('input')
    expect(input.element.value).to.equal('10')
  })

  it('emits the correct value when input changes', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('5+10-1')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([14])
  })

  it('emits the max value when input value is > max', async () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: 10, max: 20 }
    })
    const input = wrapper.find('input')

    await input.setValue('25')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([20])
  })

  it('emits the min value when input value is < min', async () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: -10, min: -20 }
    })
    const input = wrapper.find('input')

    await input.setValue('-25')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([-20])
  })

  it('emits undefined for invalid input', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('invalid')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([undefined])
  })

  it('suppresses invalid keys', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true })
    await input.element.dispatchEvent(event)

    expect(event.defaultPrevented).to.true
  })

  it('allows valid keys', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    const event = new KeyboardEvent('keydown', { key: '5', cancelable: true })
    await input.element.dispatchEvent(event)

    expect(event.defaultPrevented).to.false
  })

  it('selects all text on focus', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('123')
    await input.trigger('focus')

    expect(input.element.selectionStart).to.equal(0)
    expect(input.element.selectionEnd).to.equal(3)
  })

  it('handles empty input gracefully', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([undefined])
  })

  it('handles input with extra spaces', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('  5  +  10 - 2  ')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([13])
  })

  it('+ at end of string', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('5+2+')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([7])
  })

  it('single -', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('-')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).to.be.ok
    expect(wrapper.emitted('update:modelValue')[0]).to.eql([undefined])
  })
})
