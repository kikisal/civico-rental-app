import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Ouvrir sur la carte',
    AVALIABLE_LOCATION: 'lieu disponible',
    AVALIABLE_LOCATIONS: 'lieux disponibles',
  },
  en: {
    SELECT_LOCATION: 'Open on map',
    AVALIABLE_LOCATION: 'available location',
    AVALIABLE_LOCATIONS: 'available locations',
  },
  it: {
    SELECT_LOCATION: 'Apri sulla mappa',
    AVALIABLE_LOCATION: 'località disponibile',
    AVALIABLE_LOCATIONS: 'località disponibili',
  },
  de: {
    SELECT_LOCATION: 'Auf der Karte öffnen',
    AVALIABLE_LOCATION: 'verfügbare Location',
    AVALIABLE_LOCATIONS: 'verfügbare Locations',
  },
  es: {
    SELECT_LOCATION: 'Abrir en el mapa',
    AVALIABLE_LOCATION: 'ubicación disponible',
    AVALIABLE_LOCATIONS: 'ubicaciones disponibles',
  }
})

langHelper.setLanguage(strings)
export { strings }
