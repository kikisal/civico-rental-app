import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    CHANGE_PASSWORD_HEADING: 'Modification du mot de passe',
    CURRENT_PASSWORD: 'Mot de passe actuel',
    CURRENT_PASSWORD_ERROR: 'Mauvais mot de passe',
    NEW_PASSWORD: 'Nouveau mot de passe',
    NEW_PASSWORD_ERROR: 'Veuillez choisir un nouveau mot de passe',
    PASSWORD_UPDATE_ERROR: "Une erreur s'est produite lors de la modification du mot de passe.",
    PASSWORD_UPDATE: 'Le mot de passe a été mofifié avec succès.',
  },
  
  en: {
    CHANGE_PASSWORD_HEADING: 'Password Modification',
    CURRENT_PASSWORD: 'Current Password',
    CURRENT_PASSWORD_ERROR: 'Wrong password',
    NEW_PASSWORD: 'New Password',
    NEW_PASSWORD_ERROR: 'Please choose a new password',
    PASSWORD_UPDATE_ERROR: 'An error occurred while updating password.',
    PASSWORD_UPDATE: 'Password changed successfully.',
  },

  de: {
    CHANGE_PASSWORD_HEADING: 'Passwort ändern',
    CURRENT_PASSWORD: 'Aktuelles Passwort',
    CURRENT_PASSWORD_ERROR: 'Falsches Passwort',
    NEW_PASSWORD: 'Neues Passwort',
    NEW_PASSWORD_ERROR: 'Bitte wählen Sie ein neues Passwort',
    PASSWORD_UPDATE_ERROR: 'Beim Aktualisieren des Passworts ist ein Fehler aufgetreten.',
    PASSWORD_UPDATE: 'Passwort erfolgreich geändert.',
  },

  es: {
    CHANGE_PASSWORD_HEADING: 'Modificación de contraseña',
    CURRENT_PASSWORD: 'Contraseña actual',
    CURRENT_PASSWORD_ERROR: 'Contraseña incorrecta',
    NEW_PASSWORD: 'Nueva contraseña',
    NEW_PASSWORD_ERROR: 'Por favor, elija una nueva contraseña',
    PASSWORD_UPDATE_ERROR: 'Ocurrió un error al actualizar la contraseña.',
    PASSWORD_UPDATE: 'Contraseña cambiada con éxito.',
  },

  it: {
    CHANGE_PASSWORD_HEADING: 'Modifica password',
    CURRENT_PASSWORD: 'Password attuale',
    CURRENT_PASSWORD_ERROR: 'Password errata',
    NEW_PASSWORD: 'Nuova password',
    NEW_PASSWORD_ERROR: 'Per favore scegli una nuova password',
    PASSWORD_UPDATE_ERROR: "Si è verificato un errore durante l'aggiornamento della password.",
    PASSWORD_UPDATE: 'Password modificata con successo.',
  },
})

langHelper.setLanguage(strings)
export { strings }
