import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_IN: 'Se connecter',
    HOME: 'Accueil',
    BOOKINGS: 'Réservations',
    ABOUT: 'À propos',
    TOS: "Conditions d'utilisation",
    CONTACT: 'Contact',
    LANGUAGE: 'Langue',
    SETTINGS: 'Paramètres',
    SIGN_OUT: 'Déconnexion',
    AGENCIES: 'Agences',
    LOCATIONS: 'Destinations',
    PRIVACY_POLICY: 'Politique de Confidentialité',
    COOKIE_POLICY: 'Politique de cookies',
  },
  en: {
    SIGN_IN: 'Sign in',
    HOME: 'Home',
    BOOKINGS: 'Bookings',
    ABOUT: 'About',
    TOS: 'Terms of Service',
    CONTACT: 'Contact',
    LANGUAGE: 'Language',
    SETTINGS: 'Settings',
    SIGN_OUT: 'Sign out',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Destinations',
    PRIVACY_POLICY: 'Privacy Policy',
    COOKIE_POLICY: 'Cookie Policy',
  },
  it: {
    SIGN_IN: 'Accedi',
    HOME: 'Home',
    BOOKINGS: 'Prenotazioni',
    ABOUT: 'Chi siamo',
    TOS: 'Termini di servizio',
    CONTACT: 'Contatti',
    LANGUAGE: 'Lingua',
    SETTINGS: 'Impostazioni',
    SIGN_OUT: 'Esci',
    AGENCIES: 'Agenzie',
    LOCATIONS: 'Destinazioni',
    PRIVACY_POLICY: 'Politica sulla privacy',
    COOKIE_POLICY: 'Politica sui cookie',
  },

  de: {
    SIGN_IN: 'Anmelden',
    HOME: 'Startseite',
    BOOKINGS: 'Buchungen',
    ABOUT: 'Über uns',
    TOS: 'Nutzungsbedingungen',
    CONTACT: 'Kontakt',
    LANGUAGE: 'Sprache',
    SETTINGS: 'Einstellungen',
    SIGN_OUT: 'Abmelden',
    AGENCIES: 'Agenturen',
    LOCATIONS: 'Reiseziele',
    PRIVACY_POLICY: 'Datenschutzbestimmungen',
    COOKIE_POLICY: 'Cookie-Richtlinie',
  },

  es: {
    SIGN_IN: 'Iniciar sesión',
    HOME: 'Inicio',
    BOOKINGS: 'Reservas',
    ABOUT: 'Sobre nosotros',
    TOS: 'Términos de servicio',
    CONTACT: 'Contacto',
    LANGUAGE: 'Idioma',
    SETTINGS: 'Configuración',
    SIGN_OUT: 'Cerrar sesión',
    AGENCIES: 'Agencias',
    LOCATIONS: 'Destinos',
    PRIVACY_POLICY: 'Política de privacidad',
    COOKIE_POLICY: 'Política de cookies',
  },

})

langHelper.setLanguage(strings)
export { strings }
