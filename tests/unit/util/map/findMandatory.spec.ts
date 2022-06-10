import findMandatoryMap from '@/util/map/findMandatory'
import { expect } from 'chai'

describe('util/map/findMandatory', () => {
  it('findMandatoryMap_Exist', () => {
    const map = new Map<number,string>()
    map.set(1,'one')
    map.set(2,'two')
    map.set(3,'three')
    
    const result = findMandatoryMap(map, 3)

    expect(result).to.eql('three')
  })

  it('findMandatoryMap_NotExist', () => {
    const map = new Map<number,string>()
    
    expect(findMandatoryMap.bind(undefined, map, 3)).to.throw('No item with key: 3')
  })
})
