import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Ouvrir sur la carte'
  },
  en: {
    SELECT_LOCATION: 'Open on map',
  },
  it: {
    SELECT_LOCATION: 'Apri sulla mappa',
  },
  de: {
    SELECT_LOCATION: 'Auf der Karte öffnen',
  },
  es: {
    SELECT_LOCATION: 'Abrir en el mapa',
  }
})

langHelper.setLanguage(strings)
export { strings }
