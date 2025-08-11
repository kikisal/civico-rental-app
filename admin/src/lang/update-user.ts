import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_USER_HEADING: "Modification de l'utilisateur",
  },
  en: {
    UPDATE_USER_HEADING: 'User update',
  },
  it: {
    UPDATE_USER_HEADING: 'Aggiornamento utente',
  },
  es: {
    UPDATE_USER_HEADING: 'Actualización de usuario',
  },
  de: {
    UPDATE_USER_HEADING: 'Benutzeraktualisierung',
  },
})

langHelper.setLanguage(strings)
export { strings }
