import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_COUNTRY: 'Modification du pays',
    COUNTRY_UPDATED: 'Pays modifié avec succès.',
  },
  en: {
    UPDATE_COUNTRY: 'Country update',
    COUNTRY_UPDATED: 'Country updated successfully.',
  },
  it: {
    UPDATE_COUNTRY: 'Aggiornamento paese',
    COUNTRY_UPDATED: 'Paese aggiornato con successo.',
  },

  es: {
    UPDATE_COUNTRY: 'Actualización del país',
    COUNTRY_UPDATED: 'País actualizado con éxito.',
  },

  de: {
    UPDATE_COUNTRY: 'Länderdaten aktualisieren',
    COUNTRY_UPDATED: 'Land erfolgreich aktualisiert.',
  },
})

langHelper.setLanguage(strings)
export { strings }
