import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    EMPTY_LIST: 'Pas de notifications',
    VIEW: 'Consulter',
    MARK_AS_READ: 'Marquer comme lu',
    MARK_AS_UNREAD: 'Marquer comme non lu',
    MARK_ALL_AS_READ: 'Tout marquer comme lu',
    MARK_ALL_AS_UNREAD: 'Tout marquer comme non lu',
    DELETE_ALL: 'Tout supprimer',
    DELETE_NOTIFICATION: 'Êtes-vous sûr de vouloir supprimer cette notification ?',
    DELETE_NOTIFICATIONS: 'Êtes-vous sûr de vouloir supprimer ces notifications ?',
  },
  en: {
    EMPTY_LIST: 'No notifications',
    VIEW: 'View',
    MARK_AS_READ: 'Mark as read',
    MARK_AS_UNREAD: 'Mark as unread',
    MARK_ALL_AS_READ: 'Mark all as read',
    MARK_ALL_AS_UNREAD: 'Mark all as unread',
    DELETE_ALL: 'Delete all',
    DELETE_NOTIFICATION: 'Are you sure you want to delete this notification?',
    DELETE_NOTIFICATIONS: 'Are you sure you want to delete these notifications?',
  },
  it: {
    EMPTY_LIST: 'Nessuna notifica',
    VIEW: 'Visualizza',
    MARK_AS_READ: 'Segna come letta',
    MARK_AS_UNREAD: 'Segna come non letta',
    MARK_ALL_AS_READ: 'Segna tutte come lette',
    MARK_ALL_AS_UNREAD: 'Segna tutte come non lette',
    DELETE_ALL: 'Elimina tutte',
    DELETE_NOTIFICATION: 'Sei sicuro di voler eliminare questa notifica?',
    DELETE_NOTIFICATIONS: 'Sei sicuro di voler eliminare queste notifiche?',
  },
  de: {
    EMPTY_LIST: 'Keine Benachrichtigungen',
    VIEW: 'Anzeigen',
    MARK_AS_READ: 'Als gelesen markieren',
    MARK_AS_UNREAD: 'Als ungelesen markieren',
    MARK_ALL_AS_READ: 'Alle als gelesen markieren',
    MARK_ALL_AS_UNREAD: 'Alle als ungelesen markieren',
    DELETE_ALL: 'Alle löschen',
    DELETE_NOTIFICATION: 'Möchten Sie diese Benachrichtigung wirklich löschen?',
    DELETE_NOTIFICATIONS: 'Möchten Sie diese Benachrichtigungen wirklich löschen?',
  },
  es: {
    EMPTY_LIST: 'Sin notificaciones',
    VIEW: 'Ver',
    MARK_AS_READ: 'Marcar como leída',
    MARK_AS_UNREAD: 'Marcar como no leída',
    MARK_ALL_AS_READ: 'Marcar todas como leídas',
    MARK_ALL_AS_UNREAD: 'Marcar todas como no leídas',
    DELETE_ALL: 'Eliminar todas',
    DELETE_NOTIFICATION: '¿Estás seguro de que deseas eliminar esta notificación?',
    DELETE_NOTIFICATIONS: '¿Estás seguro de que deseas eliminar estas notificaciones?',
  }
})

langHelper.setLanguage(strings)
export { strings }
