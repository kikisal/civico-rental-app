import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  it: {
    CONGRATULATIONS: 'Congratulazioni!',
    SUCCESS: 'Il pagamento è stato effettuato con successo.',
    SUCCESS_PAY_LATER: 'La prenotazione è stata effettuata con successo. Ti abbiamo inviato una email di conferma.',
    ERROR: 'Qualcosa è andato storto! Riprova più tardi.',
    STATUS_TITLE: `La sua prenotazione è in fase di elaborazione`,
    STATUS_MESSAGE: 'Abbiamo notificato il proprietario. Un agente la contatterà tramite WhatsApp, telefono o e-mail non appena il suo ordine sarà preso in carico.',
  },
  en: {
    CONGRATULATIONS: 'Congratulations!',
    SUCCESS: 'Payment has been successfully completed.',
    SUCCESS_PAY_LATER: 'Your booking has been successfully made. We have sent you a confirmation email.',
    ERROR: 'Something went wrong! Please try again later.',
    STATUS_TITLE: 'Your booking is being processed',
    STATUS_MESSAGE: 'We have notified the owner. An agent will contact you via WhatsApp, phone, or email as soon as your order is being processed.',
  },
  es: {
      CONGRATULATIONS: '¡Felicidades!',
      SUCCESS: 'El pago se ha completado con éxito.',
      SUCCESS_PAY_LATER: 'Su reserva se ha realizado con éxito. Le hemos enviado un correo electrónico de confirmación.',
      ERROR: '¡Algo salió mal! Por favor, inténtelo de nuevo más tarde.',
      STATUS_TITLE: 'Su reserva está siendo procesada',
      STATUS_MESSAGE: 'Hemos notificado al propietario. Un agente se pondrá en contacto con usted por WhatsApp, teléfono o correo electrónico tan pronto como su pedido esté en proceso.',
  },
  de: {
      CONGRATULATIONS: 'Herzlichen Glückwunsch!',
      SUCCESS: 'Die Zahlung wurde erfolgreich abgeschlossen.',
      SUCCESS_PAY_LATER: 'Ihre Buchung wurde erfolgreich durchgeführt. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.',
      ERROR: 'Etwas ist schiefgelaufen! Bitte versuchen Sie es später erneut.',
      STATUS_TITLE: 'Ihre Buchung wird bearbeitet',
      STATUS_MESSAGE: 'Wir haben den Eigentümer benachrichtigt. Ein Mitarbeiter wird Sie per WhatsApp, Telefon oder E-Mail kontaktieren, sobald Ihre Bestellung bearbeitet wird.',
  },
  fr: {
      CONGRATULATIONS: 'Félicitations !',
      SUCCESS: 'Le paiement a été effectué avec succès.',
      SUCCESS_PAY_LATER: 'Votre réservation a été effectuée avec succès. Nous vous avons envoyé un e-mail de confirmation.',
      ERROR: 'Une erreur est survenue ! Veuillez réessayer plus tard.',
      STATUS_TITLE: 'Votre réservation est en cours de traitement',
      STATUS_MESSAGE: 'Nous avons informé le propriétaire. Un agent vous contactera par WhatsApp, téléphone ou e-mail dès que votre commande sera en cours de traitement.',
  }
})

langHelper.setLanguage(strings)
export { strings }
