import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TOTAL: 'Total :',
    DELETE_BOOKING: 'Êtes-vous sûr de vouloir supprimer cette réservation ?',
  },
  en: {
    TOTAL: 'Total:',
    DELETE_BOOKING: 'Are you sure you want to delete this booking?',
  },
  it: {
    TOTAL: 'Totale:',
    DELETE_BOOKING: 'Sei sicuro di voler eliminare questa prenotazione?',
  },

  es: {
    TOTAL: 'Total:',
    DELETE_BOOKING: '¿Está seguro de que desea eliminar esta reserva?',
  },

  de: {
    TOTAL: 'Gesamt:',
    DELETE_BOOKING: 'Sind Sie sicher, dass Sie diese Buchung löschen möchten?',
  },

})

langHelper.setLanguage(strings)
export { strings }
