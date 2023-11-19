import { registerSW } from 'virtual:pwa-register'
import { showModalIfExist } from '../modal/showModal'
import { setIntervalAsync } from 'set-interval-async'

/**
 * Registers a service worker with default options for automatic updating the app.
 */
export default function registerSWWithOptions(options : ServiceWorkerOptions): (reloadPage?: boolean) => Promise<void> {
  const checkForNewVersionsIntervalMilliseconds = (options.checkUpdateIntervalSeconds ?? 8 * 60 * 60) * 1000
  const modalServiceWorkerUpdateRefreshId = options.modalServiceWorkerUpdateRefreshId ?? 'serviceWorkerUpdatedRefresh'

  return registerSW({
    // check for new app version, see https://vite-pwa-org.netlify.app/guide/periodic-sw-updates.html
    onRegisteredSW(swScriptUrl : string, registration? : ServiceWorkerRegistration) {
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
    },
    onNeedRefresh() {
      showModalIfExist(modalServiceWorkerUpdateRefreshId)
    }
  })
}

/**
 * Options for registering service worker.
 */
export interface ServiceWorkerOptions {

  /**
   * Default: 8 hours.
   */
  checkUpdateIntervalSeconds?: number,

  /**
   * ID for modal to be displayed when a new version of the app is available.
   * Default: 'serviceWorkerUpdatedRefresh'
   */
  modalServiceWorkerUpdateRefreshId?: string

}
