import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_LOCATION: 'Modification du lieu',
    LOCATION_UPDATED: 'Lieu modifié avec succès.',
  },
  en: {
    UPDATE_LOCATION: 'Location update',
    LOCATION_UPDATED: 'Location updated successfully.',
  },
  it: {
    UPDATE_LOCATION: 'Aggiornamento località',
    LOCATION_UPDATED: 'Località aggiornata con successo.',
  },
  es: {
    UPDATE_LOCATION: 'Actualización de ubicación',
    LOCATION_UPDATED: 'Ubicación actualizada con éxito.',
  },
  de: {
    UPDATE_LOCATION: 'Standortaktualisierung',
    LOCATION_UPDATED: 'Standort erfolgreich aktualisiert.',
  },
})

langHelper.setLanguage(strings)
export { strings }
