import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_COUNTRY_HEADING: 'Nouveau pays',
    COUNTRY_NAME: 'Pays',
    INVALID_COUNTRY: 'Ce pays existe déjà.',
    COUNTRY_CREATED: 'Pays créé avec succès.',
  },
  en: {
    NEW_COUNTRY_HEADING: 'New country',
    COUNTRY_NAME: 'Country',
    INVALID_COUNTRY: 'This country already exists.',
    COUNTRY_CREATED: 'Country created successfully.',
  },
  
  it: {
    NEW_COUNTRY_HEADING: 'Nuovo paese',
    COUNTRY_NAME: 'Paese',
    INVALID_COUNTRY: 'Questo paese esiste già.',
    COUNTRY_CREATED: 'Paese creato con successo.',
  },

  es: {
    NEW_COUNTRY_HEADING: 'Nuevo país',
    COUNTRY_NAME: 'País',
    INVALID_COUNTRY: 'Este país ya existe.',
    COUNTRY_CREATED: 'País creado con éxito.',
  },

  de: {
    NEW_COUNTRY_HEADING: 'Neues Land',
    COUNTRY_NAME: 'Land',
    INVALID_COUNTRY: 'Dieses Land existiert bereits.',
    COUNTRY_CREATED: 'Land erfolgreich erstellt.',
  },
})

langHelper.setLanguage(strings)
export { strings }
