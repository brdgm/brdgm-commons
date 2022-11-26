import { expect } from 'chai'
import createRouter from '@/util/router/createRouter'
import { defineComponent } from 'vue'

describe('util/router/createRouter', () => {
  it('createRouter', () => {
    const router = createRouter([
      {
        path: '/',
        name: 'AppHome',
        component: defineComponent({})
      }
    ], 'dummy-local-storage-key', 'AppHome')

    expect(router.getRoutes().length).to.eq(1)
  })
})
