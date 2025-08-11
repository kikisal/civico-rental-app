import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    MONTHLY: 'Mensuel',
    WEEKLY: 'Hebdomadaire',
    DAILY: 'Journalier',
    YEARLY: 'Annuel',
    MONTH: 'mois',
    WEEK: 'semaine',
    DAY: 'jour',
    YEAR: 'an',
  },
  en: {
    MONTHLY: 'Monthly',
    WEEKLY: 'Weekly',
    DAILY: 'Daily',
    YEARLY: 'Yearly',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    YEAR: 'year',
  },
  it: {
    MONTHLY: 'Mensile',
    WEEKLY: 'Settimanale',
    DAILY: 'Giornaliero',
    YEARLY: 'Annuale',
    MONTH: 'mese',
    WEEK: 'settimana',
    DAY: 'giorno',
    YEAR: 'anno',
  },

  es: {
    MONTHLY: 'Mensual',
    WEEKLY: 'Semanal',
    DAILY: 'Diario',
    YEARLY: 'Anual',
    MONTH: 'mes',
    WEEK: 'semana',
    DAY: 'día',
    YEAR: 'año',
  },

  de: {
    MONTHLY: 'Monatlich',
    WEEKLY: 'Wöchentlich',
    DAILY: 'Täglich',
    YEARLY: 'Jährlich',
    MONTH: 'Monat',
    WEEK: 'Woche',
    DAY: 'Tag',
    YEAR: 'Jahr',
  },
})

langHelper.setLanguage(strings)
export { strings }
