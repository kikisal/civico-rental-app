import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    CONTACT_HEADING: 'Contact',
    SUBJECT: 'Objet',
    MESSAGE: 'Message',
    SEND: 'Envoyer',
    MESSAGE_SENT: 'Message envoyé',
  },
  en: {
    CONTACT_HEADING: 'Contact',
    SUBJECT: 'Subject',
    MESSAGE: 'Message',
    SEND: 'Send',
    MESSAGE_SENT: 'Message sent'
  },
  it: {
    CONTACT_HEADING: 'Contatto',
    SUBJECT: 'Oggetto',
    MESSAGE: 'Messaggio',
    SEND: 'Invia',
    MESSAGE_SENT: 'Messaggio inviato'
  },

  es: {
    CONTACT_HEADING: 'Contacto',
    SUBJECT: 'Asunto',
    MESSAGE: 'Mensaje',
    SEND: 'Enviar',
    MESSAGE_SENT: 'Mensaje enviado'
  },

  de: {
    CONTACT_HEADING: 'Kontakt',
    SUBJECT: 'Betreff',
    MESSAGE: 'Nachricht',
    SEND: 'Senden',
    MESSAGE_SENT: 'Nachricht gesendet'
  },
})

langHelper.setLanguage(strings)
export { strings }
