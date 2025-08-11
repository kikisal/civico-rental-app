import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    VALIDATE_EMAIL: "Un e-mail de validation a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte aux lettres et valider votre compte en cliquant sur le lien dans l'e-mail. Il expirera au bout d'un jour. Si vous n'avez pas reçu d'e-mail de validation, cliquez sur renvoyer.",
    RESEND: 'Renvoyer',
    VALIDATION_EMAIL_SENT: 'E-mail de validation envoyé.',
    VALIDATION_EMAIL_ERROR: "Une erreur s'est produite lors de l'envoi de l'e-mail de validation.",
  },
  en: {
    VALIDATE_EMAIL: "A validation email has been sent to your email address. Please check your mailbox and validate your account by clicking the link in the email. It will be expire after one day. If you didn't receive the validation email click on resend.",
    RESEND: 'Resend',
    VALIDATION_EMAIL_SENT: 'Validation email sent.',
    VALIDATION_EMAIL_ERROR: 'An error occurred while sending validation email.',
  },
  it: {
    VALIDATE_EMAIL: "È stata inviata un'email di convalida al tuo indirizzo email. Controlla la tua casella di posta e convalida il tuo account cliccando sul link nell'email. Scadrà dopo un giorno. Se non hai ricevuto l'email di convalida, clicca su rinvia.",
    RESEND: 'Rinvia',
    VALIDATION_EMAIL_SENT: 'Email di convalida inviata.',
    VALIDATION_EMAIL_ERROR: "Si è verificato un errore durante l'invio dell'email di convalida.",
  },

  es: {
    VALIDATE_EMAIL: "Se ha enviado un correo de validación a su dirección de correo. Por favor revise su bandeja de entrada y valide su cuenta haciendo clic en el enlace del correo. Expira después de un día. Si no recibió el correo de validación, haga clic en reenviar.",
    RESEND: 'Reenviar',
    VALIDATION_EMAIL_SENT: 'Correo de validación enviado.',
    VALIDATION_EMAIL_ERROR: "Ocurrió un error al enviar el correo de validación.",
  },

  de: {
    VALIDATE_EMAIL: "Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet. Bitte prüfen Sie Ihren Posteingang und bestätigen Sie Ihr Konto, indem Sie auf den Link in der E-Mail klicken. Sie läuft nach einem Tag ab. Wenn Sie die Bestätigungs-E-Mail nicht erhalten haben, klicken Sie auf 'Erneut senden'.",
    RESEND: 'Erneut senden',
    VALIDATION_EMAIL_SENT: 'Bestätigungs-E-Mail gesendet.',
    VALIDATION_EMAIL_ERROR: "Beim Senden der Bestätigungs-E-Mail ist ein Fehler aufgetreten.",
  },
})

langHelper.setLanguage(strings)
export { strings }
