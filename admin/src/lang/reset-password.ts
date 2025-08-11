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
    RESET_PASSWORD: 'Inserisci il tuo indirizzo email per ricevere un messaggio con il link per reimpostare la password.',
    EMAIL_ERROR: 'Indirizzo email non registrato',
    RESET: 'Reimposta',
    EMAIL_SENT: 'Email per il reset della password inviata.',
  },

  es: {
    RESET_PASSWORD_HEADING: 'Restablecer contraseña',
    RESET_PASSWORD: 'Por favor, introduce tu dirección de correo electrónico para enviarte un email para restablecer tu contraseña.',
    EMAIL_ERROR: 'Dirección de correo no registrada',
    RESET: 'Restablecer',
    EMAIL_SENT: 'Correo de restablecimiento de contraseña enviado.',
  },

  de: {
    RESET_PASSWORD_HEADING: 'Passwort zurücksetzen',
    RESET_PASSWORD: 'Bitte geben Sie Ihre E-Mail-Adresse ein, damit wir Ihnen eine E-Mail zum Zurücksetzen Ihres Passworts senden können.',
    EMAIL_ERROR: 'E-Mail-Adresse nicht registriert',
    RESET: 'Zurücksetzen',
    EMAIL_SENT: 'E-Mail zum Zurücksetzen des Passworts gesendet.',
  },
})

langHelper.setLanguage(strings)
export { strings }
