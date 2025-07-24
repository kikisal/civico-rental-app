import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    PROPERTY: 'Propriété',
    AGENCY: 'Agence',
    PRICE: 'Prix',
    STATUS: 'Statut',
    EMPTY_LIST: 'Pas de réservations.',
    VIEW: 'Voir cette réservation',
    DAYS: 'Jours',
    COST: 'Total',
    CANCEL: 'Annuler cette réservation',
    CANCEL_BOOKING: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
    CANCEL_BOOKING_REQUEST_SENT: "Votre requête d'annulation a bien été prise en compte. Nous vous contacterons pour finaliser la procédure d'annulation.",
  },
  
  en: {
    PROPERTY: 'Property',
    AGENCY: 'Agency',
    PRICE: 'Price',
    STATUS: 'Status',
    EMPTY_LIST: 'No bookings.',
    VIEW: 'View this booking',
    DAYS: 'Days',
    COST: 'COST',
    CANCEL: 'Cancel this booking',
    CANCEL_BOOKING: 'Are you sure you want to cancel this booking?',
    CANCEL_BOOKING_REQUEST_SENT: 'Your cancel request has been submited. We will contact you to finalize the cancellation procedure.',
  },

  de: {
    PROPERTY: 'Immobilie',
    AGENCY: 'Agentur',
    PRICE: 'Preis',
    STATUS: 'Status',
    EMPTY_LIST: 'Keine Buchungen vorhanden.',
    VIEW: 'Diese Buchung ansehen',
    DAYS: 'Tage',
    COST: 'KOSTEN',
    CANCEL: 'Diese Buchung stornieren',
    CANCEL_BOOKING: 'Sind Sie sicher, dass Sie diese Buchung stornieren möchten?',
    CANCEL_BOOKING_REQUEST_SENT: 'Ihre Stornierungsanfrage wurde gesendet. Wir werden Sie kontaktieren, um das Verfahren abzuschließen.',
  },

  es: {
    PROPERTY: 'Propiedad',
    AGENCY: 'Agencia',
    PRICE: 'Precio',
    STATUS: 'Estado',
    EMPTY_LIST: 'No hay reservas.',
    VIEW: 'Ver esta reserva',
    DAYS: 'Días',
    COST: 'COSTO',
    CANCEL: 'Cancelar esta reserva',
    CANCEL_BOOKING: '¿Está seguro de que desea cancelar esta reserva?',
    CANCEL_BOOKING_REQUEST_SENT: 'Su solicitud de cancelación ha sido enviada. Nos pondremos en contacto con usted para finalizar el procedimiento.',
  },

  it: {
    PROPERTY: 'Proprietà',
    AGENCY: 'Agenzia',
    PRICE: 'Prezzo',
    STATUS: 'Stato',
    EMPTY_LIST: 'Nessuna prenotazione.',
    VIEW: 'Visualizza questa prenotazione',
    DAYS: 'Giorni',
    COST: 'COSTO',
    CANCEL: 'Annulla questa prenotazione',
    CANCEL_BOOKING: 'Sei sicuro di voler annullare questa prenotazione?',
    CANCEL_BOOKING_REQUEST_SENT: 'La tua richiesta di annullamento è stata inviata. Ti contatteremo per completare la procedura di cancellazione.',
  }
})

langHelper.setLanguage(strings)
export { strings }
