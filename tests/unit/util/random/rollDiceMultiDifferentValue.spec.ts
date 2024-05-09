import { expect } from 'chai'
import rollDiceMultiDifferentValue from '@/util/random/rollDiceMultiDifferentValue'

describe('util/random/rollDiceMultiDifferentValue', () => {
  it('D6', () => {
    const values = rollDiceMultiDifferentValue(6, 3)

    expect(values.length).to.eq(3)
    values.forEach((value,index) => {
      expect([1,2,3,4,5,6].includes(value)).to.true
      expect(values.toSpliced(index, 1).includes(value)).to.false
    })
  })
})
