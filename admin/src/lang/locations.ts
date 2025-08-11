import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION: 'Nouveau lieu',
    DELETE_LOCATION: 'Êtes-vous sûr de vouloir supprimer ce lieu ?',
    CANNOT_DELETE_LOCATION: 'Ce lieu ne peut pas être supprimé car il est lié à des lieux ou propriétés.',
    EMPTY_LIST: 'Pas de lieux.',
    LOCATION: 'lieu',
    LOCATIONS: 'lieux',
  },
  en: {
    NEW_LOCATION: 'New location',
    DELETE_LOCATION: 'Are you sure you want to delete this location?',
    CANNOT_DELETE_LOCATION: 'This location cannot be deleted because it is related to locations or properties.',
    EMPTY_LIST: 'No locations.',
    LOCATION: 'location',
    LOCATIONS: 'locations',
  },
  it: {
    NEW_LOCATION: 'Nuova località',
    DELETE_LOCATION: 'Sei sicuro di voler eliminare questa località?',
    CANNOT_DELETE_LOCATION: 'Questa località non può essere eliminata perché è collegata ad altre località o proprietà.',
    EMPTY_LIST: 'Nessuna località.',
    LOCATION: 'località',
    LOCATIONS: 'località',
  },

  es: {
    NEW_LOCATION: 'Nueva ubicación',
    DELETE_LOCATION: '¿Estás seguro de que deseas eliminar esta ubicación?',
    CANNOT_DELETE_LOCATION: 'Esta ubicación no se puede eliminar porque está relacionada con otras ubicaciones o propiedades.',
    EMPTY_LIST: 'No hay ubicaciones.',
    LOCATION: 'ubicación',
    LOCATIONS: 'ubicaciones',
  },

  de: {
    NEW_LOCATION: 'Neuer Ort',
    DELETE_LOCATION: 'Möchten Sie diesen Ort wirklich löschen?',
    CANNOT_DELETE_LOCATION: 'Dieser Ort kann nicht gelöscht werden, da er mit anderen Orten oder Immobilien verknüpft ist.',
    EMPTY_LIST: 'Keine Orte.',
    LOCATION: 'Ort',
    LOCATIONS: 'Orte',
  },
})

langHelper.setLanguage(strings)
export { strings }
