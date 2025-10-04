import { RouteLocation } from 'vue-router'

export default function getIntRouteParam(route : RouteLocation, param : string) {
  const value = Number.parseInt(route.params[param] as string)
  if (Number.isNaN(value)) {
    return 0
  }
  return value
}
