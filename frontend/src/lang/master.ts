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
    VALIDATE_EMAIL: "Una email di verifica è stata inviata al tuo indirizzo email. Controlla la tua casella di posta e valida il tuo account cliccando sul link nell'email. Scadrà dopo un giorno. Se non hai ricevuto l'email di verifica, clicca su rinvia.",
    RESEND: 'Rinvia',
    VALIDATION_EMAIL_SENT: 'Email di verifica inviata.',
    VALIDATION_EMAIL_ERROR: "Si è verificato un errore durante l'invio dell'email di verifica.",
  },
  de: {
    VALIDATE_EMAIL: "Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihr Postfach und bestätigen Sie Ihr Konto, indem Sie auf den Link in der E-Mail klicken. Sie wird nach einem Tag ablaufen. Falls Sie die Bestätigungs-E-Mail nicht erhalten haben, klicken Sie auf 'Erneut senden'.",
    RESEND: 'Erneut senden',
    VALIDATION_EMAIL_SENT: 'Bestätigungs-E-Mail gesendet.',
    VALIDATION_EMAIL_ERROR: "Beim Senden der Bestätigungs-E-Mail ist ein Fehler aufgetreten.",
  },
  es: {
    VALIDATE_EMAIL: "Se ha enviado un correo electrónico de validación a tu dirección de correo. Por favor, revisa tu bandeja de entrada y valida tu cuenta haciendo clic en el enlace del correo. Expirará después de un día. Si no recibiste el correo de validación, haz clic en reenviar.",
    RESEND: 'Reenviar',
    VALIDATION_EMAIL_SENT: 'Correo de validación enviado.',
    VALIDATION_EMAIL_ERROR: "Ocurrió un error al enviar el correo de validación.",
  }
})

langHelper.setLanguage(strings)
export { strings }
