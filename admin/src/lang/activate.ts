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
  it: {
    ACTIVATE_HEADING: 'Attivazione Account',
    TOKEN_EXPIRED: 'Il link per l’attivazione del tuo account è scaduto.',
    ACTIVATE: 'Attiva',
  },

  es: {
    ACTIVATE_HEADING: 'Activación de Cuenta',
    TOKEN_EXPIRED: 'El enlace de activación de su cuenta ha caducado.',
    ACTIVATE: 'Activar',
  },

  de: {
    ACTIVATE_HEADING: 'Kontoaktivierung',
    TOKEN_EXPIRED: 'Ihr Link zur Kontoaktivierung ist abgelaufen.',
    ACTIVATE: 'Aktivieren',
  },

})

langHelper.setLanguage(strings)
export { strings }
