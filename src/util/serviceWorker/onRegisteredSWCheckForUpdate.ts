import { setIntervalAsync } from 'set-interval-async'

/**
 * Check for new app version, see https://vite-pwa-org.netlify.app/guide/periodic-sw-updates.html
 * @param checkForNewVersionsIntervalSeconds Interval to check for new application versions
 */
export default function onRegisteredSWCheckForUpdate(swScriptUrl : string, registration : ServiceWorkerRegistration|undefined,
    checkForNewVersionsIntervalSeconds: number) {
  const checkForNewVersionsIntervalMilliseconds = checkForNewVersionsIntervalSeconds * 1000
  registration && setIntervalAsync(async () => {
    if (!(!registration.installing && navigator)) {
      return
    }
    if (('connection' in navigator) && !navigator.onLine) {
      return
    }
    const resp = await fetch(swScriptUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      }
    })
    if (resp?.status === 200) {
      await registration.update()
    }
  }, checkForNewVersionsIntervalMilliseconds)
}
