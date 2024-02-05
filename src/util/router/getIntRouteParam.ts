import { RouteLocation } from 'vue-router'

export default function getIntRouteParam(route : RouteLocation, param : string) {
  const value = parseInt(route.params[param] as string)
  if (isNaN(value)) {
    return 0
  }
  return value
}
