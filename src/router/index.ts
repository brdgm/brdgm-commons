import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import createRouter from '@/util/router/createRouter'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "route"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')
