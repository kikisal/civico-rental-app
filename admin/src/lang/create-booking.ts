import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_BOOKING_HEADING: 'Nouvelle réservation',
  },
  en: {
    NEW_BOOKING_HEADING: 'New booking',
  },
  it: {
    NEW_BOOKING_HEADING: 'Nuova prenotazione',
  },
  es: {
    NEW_BOOKING_HEADING: 'Nueva reserva',
  },
  de: {
    NEW_BOOKING_HEADING: 'Neue Buchung',
  },
})

langHelper.setLanguage(strings)
export { strings }
