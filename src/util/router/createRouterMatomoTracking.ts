import { RouteRecordRaw, Router } from 'vue-router'
import createRouter from './createRouter'

declare let _paq: any  // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Create a vue router with web hash history.
 * It automatically stores the last visited route in local storage, and routes back to the
 * last visit route when reopening the app.
 * Additionally, it triggers page view tracking for Matomo (if variable _paq is present).
 * @param routes Routes
 * @param localStorageKey Key to store the route name in
 * @param appDeployName URL name of the deployed app
 * @param appVersion App version
 * @param homeRouteName Name of the home route
 * @returns Router
 */
export default function createRouterMatomoTracking(routes: Readonly<RouteRecordRaw[]>,
    localStorageKey : string,
    appDeployName : string,
    appVersion : string,
    homeRouteName : string) : Router {

  const router = createRouter(routes, localStorageKey, homeRouteName)
  router.afterEach(to => {
    if (_paq) {
      // track page view with matomo
      _paq.push(['deleteCustomDimension', 1])
      _paq.push(['setCustomDimension', 1, appDeployName])  // app
      _paq.push(['setCustomDimension', 2, `${appDeployName} ${appVersion}`])  // appVersion
      _paq.push(['setCustomUrl', `/${appDeployName}${to.fullPath}`])
      _paq.push(['trackPageView'])
    }
  })
  return router
}
