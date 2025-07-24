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

  de: {
    UNAUTHORIZED: 'Unbefugter Zugriff',
  },

  es: {
    UNAUTHORIZED: 'Acceso no autorizado',
  },
})

langHelper.setLanguage(strings)
export { strings }
