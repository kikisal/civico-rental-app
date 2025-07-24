import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Choisir cette destination',
  },
  en: {
    SELECT_LOCATION: 'Select Destination',
  },
  it: {
    SELECT_LOCATION: 'Seleziona destinazione',
  },
  de: {
    SELECT_LOCATION: 'Reiseziel auswählen',
  },
  es: {
    SELECT_LOCATION: 'Seleccionar destino',
  }
})

langHelper.setLanguage(strings)
export { strings }
