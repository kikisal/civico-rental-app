import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    LOCATION: 'Lieu',
  },
  en: {
    LOCATION: 'location',
  },
  it: {
    LOCATION: 'posizione',
  },

  es: {
    LOCATION: 'ubicación',
  },

  de: {
    LOCATION: 'Standort',
  },

})

langHelper.setLanguage(strings)
export { strings }
