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

  it('D6-multi', () => {
    for (let currentValue=1; currentValue<6; currentValue++) {
      const currentValues = []
      for (let i=1; i<=currentValue; i++) {
        currentValues.push(i)
      }
      const value = rollDiceDifferentValue(6, ...currentValues)

      expect(value).greaterThan(currentValue)
      expect(value).lessThanOrEqual(6)
    }
  })

  it('D1', () => {
    expect(() => rollDiceDifferentValue(1, 1)).to.throw(Error)
  })

  it('D0', () => {
    expect(() => rollDiceDifferentValue(0, 0)).to.throw(Error)
  })

  it('multi-too-much-current-values', () => {
    expect(() => rollDiceDifferentValue(3, 1, 2, 3)).to.throw(Error)
  })
})
