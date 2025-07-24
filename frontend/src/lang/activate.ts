import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    ACTIVATE_HEADING: 'Activation du compte',
    TOKEN_EXPIRED: "Votre lien d'activation du compte a expiré.",
    ACTIVATE: 'Activer',
  },
  en: {
    ACTIVATE_HEADING: 'Account Activation',
    TOKEN_EXPIRED: 'Your account activation link expired.',
    ACTIVATE: 'Activate',
  },

  de: {
    ACTIVATE_HEADING: 'Kontoaktivierung',
    TOKEN_EXPIRED: 'Ihr Kontoaktivierungslink ist abgelaufen.',
    ACTIVATE: 'Aktivieren',
  },

  es: {
    ACTIVATE_HEADING: 'Activación de cuenta',
    TOKEN_EXPIRED: 'El enlace de activación de su cuenta ha expirado.',
    ACTIVATE: 'Activar',
  },

  it: {
    ACTIVATE_HEADING: 'Attivazione account',
    TOKEN_EXPIRED: 'Il link per l’attivazione del tuo account è scaduto.',
    ACTIVATE: 'Attiva',
  }
})

langHelper.setLanguage(strings)
export { strings }
