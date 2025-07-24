import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        SOLD_OUT: 'Rupture',
        SOLD_OUT_INFO: 'Cette propriété est en rupture.',
    },
    en: {
        SOLD_OUT: 'Sold out',
        SOLD_OUT_INFO: 'This property is sold out.',
    },
    it: {
        SOLD_OUT: 'Esaurito',
        SOLD_OUT_INFO: 'Questa proprietà è esaurita.',
    },
    de: {
        SOLD_OUT: 'Ausverkauft',
        SOLD_OUT_INFO: 'Diese Immobilie ist ausverkauft.',
    },
    es: {
        SOLD_OUT: 'Agotado',
        SOLD_OUT_INFO: 'Esta propiedad está agotada.',
    }
})

langHelper.setLanguage(strings)
export { strings }
