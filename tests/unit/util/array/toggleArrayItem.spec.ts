import { expect } from 'chai'
import toggleArrayItem from '@/util/array/toggleArrayItem'

describe('util/array/toggleArrayItem', () => {
  it('toggleExist', () => {
    const array = [SampleEnum.ONE,SampleEnum.TWO]
    toggleArrayItem(array, SampleEnum.TWO)

    expect(array).to.eql([SampleEnum.ONE])
  })

  it('toggleNotExist', () => {
    const array : SampleEnum[] = []
    toggleArrayItem(array, SampleEnum.TWO)

    expect(array).to.eql([SampleEnum.TWO])
  })
})

enum SampleEnum {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three'
}
