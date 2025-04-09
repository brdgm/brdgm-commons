import toNumber from '@/util/form/toNumber'
import { expect } from 'chai'

describe('toNumber', () => {
  it('should return the same number when a valid number is passed', () => {
    expect(toNumber(42)).to.equal(42)
    expect(toNumber(-3.14)).to.equal(-3.14)
  })

  it('should return 0 when a string is passed', () => {
    expect(toNumber('123')).to.equal(0)
    expect(toNumber('abc')).to.equal(0)
  })

  it('should return 0 when undefined is passed', () => {
    expect(toNumber()).to.equal(0)
  })

  it('should return 0 when null is passed', () => {
    expect(toNumber(null)).to.equal(0)
  })

  it('should return 0 when an object is passed', () => {
    expect(toNumber({})).to.equal(0)
    expect(toNumber({ key: 'value' })).to.equal(0)
  })

  it('should return 0 when an array is passed', () => {
    expect(toNumber([])).to.equal(0)
    expect(toNumber([1, 2, 3])).to.equal(0)
  })

  it('should return 0 when a boolean is passed', () => {
    expect(toNumber(true)).to.equal(0)
    expect(toNumber(false)).to.equal(0)
  })
})