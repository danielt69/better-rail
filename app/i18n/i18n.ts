import * as Localization from "expo-localization"
import { he as heDate, ar as arDate } from "date-fns/locale"
import i18n from "i18n-js"
import he from "./he.json"
import arIL from "./ar-IL.json"

const availableTranslations = { he, ar: arIL, "ar-IL": arIL }

i18n.fallbacks = true
i18n.translations = availableTranslations

const userLocale = Localization.locale

if (availableTranslations[userLocale]) {
  i18n.locale = userLocale
} else {
  // Fallback to default language
  // TODO: Change to english
  i18n.locale = "he"
}

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof he
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]

export let dateLocale = heDate
if (userLocale.startsWith("ar")) dateLocale = arDate
