import { expect } from 'chai'
import randomEnum from '@/util/randomEnum'

describe('randomEnum', () => {
  it('int enum', () => {
    const value = randomEnum(IntEnum)

    expect([1,2,3].includes(value)).to.true
  })

  it('string enum', () => {
    const value = randomEnum(StringEnum)

    expect(['one','two','three'].includes(value)).to.true
  })
})

enum IntEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3
}

enum StringEnum {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three'
}
