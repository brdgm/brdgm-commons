import { expect } from 'chai'
import randomEnumDifferentValue from '@/util/random/randomEnumDifferentValue'

describe('util/random/randomEnumDifferentValue.spec', () => {
  it('int enum', () => {
    const value = randomEnumDifferentValue(IntEnum, IntEnum.TWO)

    expect([1,2].includes(value)).to.true
    expect(value).to.not.eq(IntEnum.TWO)
  })

  it('string enum', () => {
    const value = randomEnumDifferentValue(StringEnum, StringEnum.THREE)

    expect(['one','two','three'].includes(value)).to.true
    expect(value).to.not.eq(StringEnum.THREE)
  })

  it('single value int enum', () => {
    expect(() => randomEnumDifferentValue(SingleValueIntEnum, SingleValueIntEnum.ONE)).to.throw(Error)
  })

  it('single value string enum', () => {
    expect(() => randomEnumDifferentValue(SingleValueStringEnum, SingleValueStringEnum.ONE)).to.throw(Error)
  })
})

enum IntEnum {
  ONE = 1,
  TWO = 2
}

enum StringEnum {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three'
}

enum SingleValueIntEnum {
  ONE = 1
}

enum SingleValueStringEnum {
  ONE = 'one'
}
