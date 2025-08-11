import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UNAUTHORIZED: 'Accès non autorisé',
  },
  en: {
    UNAUTHORIZED: 'Unauthorized access',
  },
  it: {
    UNAUTHORIZED: 'Accesso non autorizzato',
  },

  es: {
    UNAUTHORIZED: 'Acceso no autorizado',
  },

  de: {
    UNAUTHORIZED: 'Unbefugter Zugriff',
  },

})

langHelper.setLanguage(strings)
export { strings }
