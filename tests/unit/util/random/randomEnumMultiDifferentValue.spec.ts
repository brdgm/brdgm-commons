import { expect } from 'chai'
import randomEnumMultiDifferentValue from '@/util/random/randomEnumMultiDifferentValue'

describe('util/random/randomEnumMultiDifferentValue', () => {
  it('int enum', () => {
    const values = randomEnumMultiDifferentValue(IntEnum, 2)

    expect(values.length).to.eq(2)
    for (const [index, value] of values.entries()) {
      expect([1,2,3,4].includes(value)).to.true
      expect(values.toSpliced(index, 1).includes(value)).to.false
    }
  })

  it('string enum', () => {
    const values = randomEnumMultiDifferentValue(StringEnum, 3)

    expect(values.length).to.eq(3)
    for (const [index, value] of values.entries()) {
      expect(['one','two','three','four'].includes(value)).to.true
      expect(values.toSpliced(index, 1).includes(value)).to.false
    }
  })
})

enum IntEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

enum StringEnum {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four'
}
