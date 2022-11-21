import getPrioritizedEnumValues from '@/util/enum/getPrioritizedEnumValues'
import { expect } from 'chai'

describe('util/getPrioritizedEnumValues', () => {
  it('StringEnum-one', () => {
    expect(getPrioritizedEnumValues(StringEnum,StringEnum.ONE)).to.eql([StringEnum.ONE,StringEnum.TWO,StringEnum.THREE])
  })

  it('StringEnum-three', () => {
    expect(getPrioritizedEnumValues(StringEnum,StringEnum.THREE)).to.eql([StringEnum.THREE,StringEnum.ONE,StringEnum.TWO])
  })

  it('IntEnum-1', () => {
    expect(getPrioritizedEnumValues(IntEnum,IntEnum.ONE)).to.eql([1,2,3])
  })

  it('IntEnum-3', () => {
    expect(getPrioritizedEnumValues(IntEnum,IntEnum.THREE)).to.eql([3,1,2])
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
