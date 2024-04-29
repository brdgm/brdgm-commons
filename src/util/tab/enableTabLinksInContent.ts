import { Tab } from 'bootstrap'

/**
 * Enables the links inside tab panes to be able to switch to different tabs.
 * <p>Use a syntax like this to enable the tab links:</p>
 * <pre>
 * <a href='#tablink-xyz' data-custom-toggle='tab'>Link to tab xyz</a>
 * </pre>
 * @param element Parent element which contains both the tab links and tab panes
 */
export default function(parent : HTMLElement) : void {
  parent.querySelectorAll('a[data-custom-toggle="tab"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault()
      const target = anchor.getAttribute('href')
      if (target) {
        const tabElement = parent.querySelector(target)
        if (tabElement) {
          new Tab(tabElement).show()
        }
      }
    })
  })
}
