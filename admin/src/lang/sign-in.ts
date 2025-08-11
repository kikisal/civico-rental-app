import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_IN_HEADING: 'Connexion',
    SIGN_IN: 'Se connecter',
    ERROR_IN_SIGN_IN: 'E-mail ou mot de passe incorrect.',
    IS_BLACKLISTED: 'Votre compte est suspendu.',
    RESET_PASSWORD: 'Mot de passe oublié ?',
    STAY_CONNECTED: 'Rester connecté',
  },
  en: {
    SIGN_IN_HEADING: 'Sign in',
    SIGN_IN: 'Sign in',
    ERROR_IN_SIGN_IN: 'Incorrect email or password.',
    IS_BLACKLISTED: 'Your account is suspended.',
    RESET_PASSWORD: 'Forgot password?',
    STAY_CONNECTED: 'Stay connected',
  },
  it: {
    SIGN_IN_HEADING: 'Accedi',
    SIGN_IN: 'Accedi',
    ERROR_IN_SIGN_IN: 'Email o password errati.',
    IS_BLACKLISTED: 'Il tuo account è sospeso.',
    RESET_PASSWORD: 'Hai dimenticato la password?',
    STAY_CONNECTED: 'Rimani connesso',
  },

  es: {
    SIGN_IN_HEADING: 'Iniciar sesión',
    SIGN_IN: 'Iniciar sesión',
    ERROR_IN_SIGN_IN: 'Correo electrónico o contraseña incorrectos.',
    IS_BLACKLISTED: 'Tu cuenta está suspendida.',
    RESET_PASSWORD: '¿Olvidaste tu contraseña?',
    STAY_CONNECTED: 'Mantener sesión iniciada',
  },

  de: {
    SIGN_IN_HEADING: 'Anmelden',
    SIGN_IN: 'Anmelden',
    ERROR_IN_SIGN_IN: 'Falsche E-Mail oder Passwort.',
    IS_BLACKLISTED: 'Ihr Konto ist gesperrt.',
    RESET_PASSWORD: 'Passwort vergessen?',
    STAY_CONNECTED: 'Eingeloggt bleiben',
  },
})

langHelper.setLanguage(strings)
export { strings }
