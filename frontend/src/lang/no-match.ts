import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NO_MATCH: 'Rien à voir ici !',
  },
  en: {
    NO_MATCH: 'Nothing to see here!',
  },
  it: {
    NO_MATCH: 'Non c’è nulla da vedere qui!',
  },
  de: {
    NO_MATCH: 'Hier gibt es nichts zu sehen!',
  },
  es: {
    NO_MATCH: '¡No hay nada que ver aquí!',
  }
})

langHelper.setLanguage(strings)
export { strings }
