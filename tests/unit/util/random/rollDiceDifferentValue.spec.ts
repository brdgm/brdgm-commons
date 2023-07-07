import { expect } from 'chai'
import rollDiceDifferentValue from '@/util/random/rollDiceDifferentValue'

describe('util/random/rollDice', () => {
  it('D6', () => {
    for (let currentValue=1; currentValue<=6; currentValue++) {
      const value = rollDiceDifferentValue(6, currentValue)

      expect(value).greaterThanOrEqual(1)
      expect(value).lessThanOrEqual(6)
      expect(value).to.not.eq(currentValue)
    }
  })

  it('D1', () => {
    expect(() => rollDiceDifferentValue(1, 1)).to.throw(Error)
  })

  it('D0', () => {
    expect(() => rollDiceDifferentValue(0, 0)).to.throw(Error)
  })
})
