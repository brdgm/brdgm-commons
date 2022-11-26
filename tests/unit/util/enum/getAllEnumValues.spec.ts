import { expect } from 'chai'
import getAllEnumValues from '@/util/enum/getAllEnumValues'

describe('util/enum/getAllEnumValues', () => {
  it('int enum', () => {
    expect(getAllEnumValues(IntEnum)).to.eql([1,2,3])
  })

  it('string enum', () => {
    expect(getAllEnumValues(StringEnum)).to.eql(['one','two','three'])
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
