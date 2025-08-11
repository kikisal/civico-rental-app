import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION_HEADING: 'Nouveau lieu',
    LOCATION_NAME: 'Lieu',
    INVALID_LOCATION: 'Ce lieu existe déjà.',
    LOCATION_CREATED: 'Lieu créé avec succès.',
    COUNTRY: 'Pays',
    PARENT_LOCATION: 'Lieu Parent',
  },
  en: {
    NEW_LOCATION_HEADING: 'New location',
    LOCATION_NAME: 'Location',
    INVALID_LOCATION: 'This location already exists.',
    LOCATION_CREATED: 'Location created successfully.',
    COUNTRY: 'Country',
    PARENT_LOCATION: 'Parent Location',
  },
  it: {
    NEW_LOCATION_HEADING: 'Nuova località',
    LOCATION_NAME: 'Località',
    INVALID_LOCATION: 'Questa località esiste già.',
    LOCATION_CREATED: 'Località creata con successo.',
    COUNTRY: 'Paese',
    PARENT_LOCATION: 'Località superiore',
  },

  es: {
    NEW_LOCATION_HEADING: 'Nueva ubicación',
    LOCATION_NAME: 'Ubicación',
    INVALID_LOCATION: 'Esta ubicación ya existe.',
    LOCATION_CREATED: 'Ubicación creada con éxito.',
    COUNTRY: 'País',
    PARENT_LOCATION: 'Ubicación principal',
  },

  de: {
    NEW_LOCATION_HEADING: 'Neuer Ort',
    LOCATION_NAME: 'Ort',
    INVALID_LOCATION: 'Dieser Ort existiert bereits.',
    LOCATION_CREATED: 'Ort erfolgreich erstellt.',
    COUNTRY: 'Land',
    PARENT_LOCATION: 'Übergeordneter Ort',
  },
})

langHelper.setLanguage(strings)
export { strings }
