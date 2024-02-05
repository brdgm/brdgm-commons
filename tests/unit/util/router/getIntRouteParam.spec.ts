import getIntRouteParam from '@/util/router/getIntRouteParam'
import { expect } from 'chai'
import mockRouteLocation from '../../helper/mockRouteLocation'

describe('util/router/getIntRouteParam', () => {
  it('intParam', () => {
    expect(getIntRouteParam(mockRouteLocation({params:{param1:'42',param2:'1'}}), 'param1')).to.eq(42)
  })

  it('stringParam', () => {
    expect(getIntRouteParam(mockRouteLocation({params:{param1:'whatsThis',param2:'1'}}), 'param1')).to.eq(0)
  })

  it('emptyParam', () => {
    expect(getIntRouteParam(mockRouteLocation({params:{param1:'',param2:'1'}}), 'param1')).to.eq(0)
  })

  it('noParam', () => {
    expect(getIntRouteParam(mockRouteLocation(), 'param1')).to.eq(0)
  })
})
