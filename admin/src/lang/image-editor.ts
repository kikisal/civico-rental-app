import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        ADD_IMAGE: 'Ajouter une image principale',
        ADD_IMAGES: 'Ajouter des images supplémentaires',
        UPDATE_IMAGE: "Modifier l'image principale",
        DELETE_IMAGE: 'Êtes-vous sûr de vouloir supprimer cette image ?',
    },
    en: {
        ADD_IMAGE: 'Add main image',
        ADD_IMAGES: 'Add additional images',
        UPDATE_IMAGE: 'Update main image',
        DELETE_IMAGE: 'Are you sure you want to delete this image?',
    },
    it: {
        ADD_IMAGE: 'Aggiungi immagine principale',
        ADD_IMAGES: 'Aggiungi immagini aggiuntive',
        UPDATE_IMAGE: 'Aggiorna immagine principale',
        DELETE_IMAGE: 'Sei sicuro di voler eliminare questa immagine?',
    },
    es: {
        ADD_IMAGE: 'Agregar imagen principal',
        ADD_IMAGES: 'Agregar imágenes adicionales',
        UPDATE_IMAGE: 'Actualizar imagen principal',
        DELETE_IMAGE: '¿Estás seguro de que deseas eliminar esta imagen?',
    },
    de: {
        ADD_IMAGE: 'Hauptbild hinzufügen',
        ADD_IMAGES: 'Zusätzliche Bilder hinzufügen',
        UPDATE_IMAGE: 'Hauptbild aktualisieren',
        DELETE_IMAGE: 'Möchten Sie dieses Bild wirklich löschen?',
    },
})

langHelper.setLanguage(strings)
export { strings }
