import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const COPYRIGHT_PART1 = `Copyright © ${new Date().getFullYear()} ${env.WEBSITE_NAME}`

const strings = new LocalizedStrings({
  fr: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Tous droits réservés.',

    CORPORATE: 'À Propos',
    ABOUT: 'À propos de Nous',
    TOS: "Conditions d'utilisation",
    RENT: 'Louer une Propriété',
    AGENCIES: 'Agences',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: `Paiement 100% sécurisé avec ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Politique de Confidentialité',
    COOKIE_POLICY: 'Politique de cookies',
  },
  en: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. All rights reserved.',

    CORPORATE: 'Corporate',
    ABOUT: 'About Us',
    TOS: 'Terms of Service',
    RENT: 'Rent a Property',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: `100% secure payment with ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Privacy Policy',
    COOKIE_POLICY: 'Cookie Policy',
  },
  it: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Tutti i diritti riservati.',

    CORPORATE: 'Corporate',
    ABOUT: 'Chi siamo',
    TOS: 'Termini di servizio',
    RENT: 'Affitta una proprietà',
    AGENCIES: 'Agenzie',
    LOCATIONS: 'Destinazioni',
    SUPPORT: 'Supporto',
    CONTACT: 'Contatti',
    SECURE_PAYMENT: `Pagamento 100% sicuro con ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Politica sulla privacy',
    COOKIE_POLICY: 'Politica sui cookie',
  },

  de: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Alle Rechte vorbehalten.',

    CORPORATE: 'Unternehmen',
    ABOUT: 'Über uns',
    TOS: 'Nutzungsbedingungen',
    RENT: 'Immobilie mieten',
    AGENCIES: 'Agenturen',
    LOCATIONS: 'Reiseziele',
    SUPPORT: 'Support',
    CONTACT: 'Kontakt',
    SECURE_PAYMENT: `100% sichere Zahlung mit ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Datenschutzbestimmungen',
    COOKIE_POLICY: 'Cookie-Richtlinie',
  },

  es: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Todos los derechos reservados.',

    CORPORATE: 'Corporativo',
    ABOUT: 'Sobre nosotros',
    TOS: 'Términos de servicio',
    RENT: 'Alquilar una propiedad',
    AGENCIES: 'Agencias',
    LOCATIONS: 'Destinos',
    SUPPORT: 'Soporte',
    CONTACT: 'Contacto',
    SECURE_PAYMENT: `Pago 100% seguro con ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Política de privacidad',
    COOKIE_POLICY: 'Política de cookies',
  }
})

langHelper.setLanguage(strings)
export { strings }
