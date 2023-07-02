import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

/**
 * Create a vue router with web hash history.
 * It automatically stores the last visited route in local storage, and routes back to the
 * last visit route when reopening the app.
 * @param routes Routes
 * @param localStorageKey Key to store the route name in
 * @param homeRouteName Name of the home route
 * @returns Router
 */
export default function(routes: Readonly<RouteRecordRaw[]>,
    localStorageKey : string, 
    homeRouteName : string) : Router {

  if (!routes.find(item => item.name==homeRouteName)) {
    throw new Error(`Home route not found: ${homeRouteName}`)
  }

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  // store last used route path in local storage
  router.afterEach(to => {
    localStorage.setItem(localStorageKey, to.fullPath)
  })

  // redirect to lase used route path
  let isFirstTransition = true
  router.beforeEach((to, _from, next) => {
    const lastRouteFullPath = localStorage.getItem(localStorageKey)
    if (to.name === homeRouteName && lastRouteFullPath && isFirstTransition) next(lastRouteFullPath)
    else next()
    isFirstTransition = false
  })

  return router
}
