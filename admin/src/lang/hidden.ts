import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        HIDDEN: 'Cachée',
        HIDDEN_INFO: 'Cette propriété est cachée.',
    },
    en: {
        HIDDEN: 'Hidden',
        HIDDEN_INFO: 'This property is hidden.',
    },
    it: {
        HIDDEN: 'Nascosto',
        HIDDEN_INFO: 'Questa proprietà è nascosta.',
    },

    es: {
        HIDDEN: 'Oculto',
        HIDDEN_INFO: 'Esta propiedad está oculta.',
    },

    de: {
        HIDDEN: 'Versteckt',
        HIDDEN_INFO: 'Diese Immobilie ist versteckt.',
    },
})

langHelper.setLanguage(strings)
export { strings }
