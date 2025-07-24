import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    RESET_PASSWORD_HEADING: 'Réinitialisation du mot de passe',
    RESET_PASSWORD: 'Veuillez saisir votre adresse e-mail afin de vous envoyer un e-mail pour réinitialiser votre mot de passe.',
    EMAIL_ERROR: 'Adresse e-mail non enregistrée',
    RESET: 'Réinitialiser',
    EMAIL_SENT: 'E-mail de réinitialisation du mot de passe envoyé.',
  },
  en: {
    RESET_PASSWORD_HEADING: 'Password Reset',
    RESET_PASSWORD: 'Please enter your email address so we can send you an email to reset your password.',
    EMAIL_ERROR: 'Email address not registered',
    RESET: 'Reset',
    EMAIL_SENT: 'Password reset email sent.',
  },
  it: {
    RESET_PASSWORD_HEADING: 'Reimposta password',
    RESET_PASSWORD: 'Inserisci il tuo indirizzo email e ti invieremo un’email per reimpostare la password.',
    EMAIL_ERROR: 'Indirizzo email non registrato',
    RESET: 'Reimposta',
    EMAIL_SENT: 'Email per reimpostare la password inviata.',
  },
  de: {
    RESET_PASSWORD_HEADING: 'Passwort zurücksetzen',
    RESET_PASSWORD: 'Bitte gib deine E-Mail-Adresse ein, damit wir dir eine E-Mail zum Zurücksetzen deines Passworts senden können.',
    EMAIL_ERROR: 'E-Mail-Adresse nicht registriert',
    RESET: 'Zurücksetzen',
    EMAIL_SENT: 'E-Mail zum Zurücksetzen des Passworts wurde gesendet.',
  },
  es: {
    RESET_PASSWORD_HEADING: 'Restablecer contraseña',
    RESET_PASSWORD: 'Por favor, introduce tu dirección de correo electrónico para enviarte un enlace de restablecimiento de contraseña.',
    EMAIL_ERROR: 'Dirección de correo no registrada',
    RESET: 'Restablecer',
    EMAIL_SENT: 'Correo de restablecimiento enviado.',
  }
})

langHelper.setLanguage(strings)
export { strings }
