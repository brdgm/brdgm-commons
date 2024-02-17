import { expect } from 'chai'
import { defineComponent } from 'vue'
import createRouterMatomoTracking from '@/util/router/createRouterMatomoTracking'

describe('util/router/createRouter', () => {
  it('createRouter', () => {
    const router = createRouterMatomoTracking([
      {
        path: '/',
        name: 'AppHome',
        component: defineComponent({})
      }
    ], 'dummy-local-storage-key', 'dummy-app-deploy-name', 'AppHome')

    expect(router.getRoutes().length).to.eq(1)
  })
})
