import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TOTAL: 'Total :',
  },
  
  en: {
    TOTAL: 'Total:',
  },

  de: {
    TOTAL: 'Gesamt:',
  },

  es: {
    TOTAL: 'Total:',
  },

  it: {
    TOTAL: 'Totale:',
  }
})

langHelper.setLanguage(strings)
export { strings }
