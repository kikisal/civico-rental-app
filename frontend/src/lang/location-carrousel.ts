import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Choisir cette destination',
    AVALIABLE_LOCATION: 'lieu disponible',
    AVALIABLE_LOCATIONS: 'lieux disponibles',
  },
  en: {
    SELECT_LOCATION: 'Select Destination',
    AVALIABLE_LOCATION: 'available location',
    AVALIABLE_LOCATIONS: 'available locations',
  },
  it: {
    SELECT_LOCATION: 'Seleziona destinazione',
    AVALIABLE_LOCATION: 'località disponibile',
    AVALIABLE_LOCATIONS: 'località disponibili',
  },
  de: {
    SELECT_LOCATION: 'Reiseziel auswählen',
    AVALIABLE_LOCATION: 'verfügbare Location',
    AVALIABLE_LOCATIONS: 'verfügbare Locations',
  },
  es: {
    SELECT_LOCATION: 'Seleccionar destino',
    AVALIABLE_LOCATION: 'ubicación disponible',
    AVALIABLE_LOCATIONS: 'ubicaciones disponibles',
  }
})

langHelper.setLanguage(strings)
export { strings }
