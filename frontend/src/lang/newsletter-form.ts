import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TITLE: 'Abonnez-vous',
    SUB_TITLE: 'Abonnez-vous à notre liste de diffusion pour recevoir les dernières mises à jour !',
    SUBSCRIBE: "S'abonner",
    SUCCESS: 'Inscription réussie !',
  },
  en: {
    TITLE: 'Subscribe',
    SUB_TITLE: 'Subscribe to our mailing list for the latest updates!',
    SUBSCRIBE: 'Subscribe',
    SUCCESS: 'Subscription successful!',
  },
  it: {
    TITLE: 'Iscriviti',
    SUB_TITLE: 'Iscriviti alla nostra mailing list per le ultime novità!',
    SUBSCRIBE: 'Iscriviti',
    SUCCESS: 'Iscrizione avvenuta con successo!',
  },
  de: {
    TITLE: 'Abonnieren',
    SUB_TITLE: 'Abonniere unsere Mailingliste für die neuesten Updates!',
    SUBSCRIBE: 'Abonnieren',
    SUCCESS: 'Abonnement erfolgreich!',
  },
  es: {
    TITLE: 'Suscribirse',
    SUB_TITLE: '¡Suscríbete a nuestra lista de correo para las últimas novedades!',
    SUBSCRIBE: 'Suscribirse',
    SUCCESS: '¡Suscripción exitosa!',
  }
})

langHelper.setLanguage(strings)
export { strings }
