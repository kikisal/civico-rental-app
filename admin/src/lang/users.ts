import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_USER: 'Nouvel utilisateur',
  },
  en: {
    NEW_USER: 'New user',
  },
  it: {
    NEW_USER: 'Nuovo utente',
  },
  es: {
    NEW_USER: 'Nuevo usuario',
  },
  de: {
    NEW_USER: 'Neuer Benutzer',
  },
})

langHelper.setLanguage(strings)
export { strings }
