import { Modal, Tab } from 'bootstrap'

/**
 * Show Bootstrap modal with given ID.
 * Throws error if no HTML element with the given ID was found.
 * @param modalId HTML element ID of modal dialog
 */
export default function showModal(modalId : string) : void {
  showModalInternal(modalId, false)
}

/**
 * Show Bootstrap modal with given ID.
 * @param modalId HTML element ID of modal dialog
 * @return true if HTML element was found
 */
export function showModalIfExist(modalId : string) : boolean {
  return showModalInternal(modalId, true)
}

/**
 * Show Bootstrap modal with given ID, and preselect the tab with the given ID.
 * Throws error if no HTML element with the given ID was found.
 * @param modalId HTML element ID of modal dialog
 * @param tabId HTML element ID of tab to preselect
 */
export function showModalPreselectTab(modalId: string, tabId: string) : void {
  showModal(modalId)
  const tabElement = document.querySelector(`#${tabId}`)
  if (tabElement) {
    new Tab(tabElement).show()
  }
  else {
    throw new Error(`Tab '#${tabId}' not found.`)
  }
}

function showModalInternal(modalId : string, ignoreError? : boolean) : boolean {
  const modalElement = document.querySelector(`#${modalId}`)
  if (modalElement) {
    new Modal(modalElement).show()
    return true
  }
  else if (ignoreError) {
    return false
  }
  else {
    throw new Error(`Modal '#${modalId}' not found.`)
  }
}
