import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    EMPTY_LIST: 'Aucune agence.',
    VIEW_AGENCY: 'Voir le profil de cette agence',
    DELETE_AGENCY: 'Êtes-vous sûr de vouloir supprimer cette agence et toutes ses données ?',
  },
  en: {
    EMPTY_LIST: 'No agencies.',
    VIEW_AGENCY: 'View agency profile',
    DELETE_AGENCY: 'Are you sure you want to delete this agency and all its data?',
  },
  it: {
    EMPTY_LIST: 'Nessuna agenzia.',
    VIEW_AGENCY: 'Vedi profilo agenzia',
    DELETE_AGENCY: 'Sei sicuro di voler eliminare questa agenzia e tutti i suoi dati?',
  },

  es: {
    EMPTY_LIST: 'No hay agencias.',
    VIEW_AGENCY: 'Ver perfil de la agencia',
    DELETE_AGENCY: '¿Está seguro de que desea eliminar esta agencia y todos sus datos?',
  },

  de: {
    EMPTY_LIST: 'Keine Agenturen.',
    VIEW_AGENCY: 'Agenturprofil anzeigen',
    DELETE_AGENCY: 'Sind Sie sicher, dass Sie diese Agentur und alle ihre Daten löschen möchten?',
  }
})

langHelper.setLanguage(strings)
export { strings }
