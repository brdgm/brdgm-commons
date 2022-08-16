import { LocaleMessages, VueMessageType } from "vue-i18n"

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
 export default function(): any {  // eslint-disable-line
  const locales = require.context('@/locales', true, /[a-z]{2}\.json$/)
  const messages: LocaleMessages<VueMessageType,string,string> = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([a-z]{2})\./)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}
