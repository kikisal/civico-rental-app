import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    CONGRATULATIONS: 'Félicitation!',
    SUCCESS: 'Votre paiement a été effectué avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    SUCCESS_PAY_LATER: 'Votre réservation a été effectuée avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    ERROR: 'Something went wrong! Try again later',
    STATUS_TITLE: `${env.WEBSITE_NAME} Confirmation de réservation`,
    STATUS_MESSAGE: "Vérifiez votre boîte mail et suivez les étapes décrites dans l'e-mail de confirmation de la réservation pour réserver votre propriété. Vous trouverez l'adresse de la propriété et le lien Google Maps dans l'e-mail de confirmation.",
  },
  
  en: {
    CONGRATULATIONS: 'Congratulations!',
    SUCCESS: 'Your payment was successfully done. We sent you a confirmation email.',
    SUCCESS_PAY_LATER: 'Your booking was successfully done. We sent you a confirmation email.',
    ERROR: 'Something went wrong! Try again later',
    STATUS_TITLE: `${env.WEBSITE_NAME} Booking Confirmation`,
    STATUS_MESSAGE: 'Check your mailbox and follow the steps described in the booking confirmation email to book your property. You will find property address and Google Maps link in the confirmation email.',
  },

  de: {
    CONGRATULATIONS: 'Herzlichen Glückwunsch!',
    SUCCESS: 'Ihre Zahlung wurde erfolgreich durchgeführt. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.',
    SUCCESS_PAY_LATER: 'Ihre Buchung wurde erfolgreich durchgeführt. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.',
    ERROR: 'Etwas ist schiefgelaufen! Bitte versuchen Sie es später erneut.',
    STATUS_TITLE: `${env.WEBSITE_NAME} Buchungsbestätigung`,
    STATUS_MESSAGE: 'Überprüfen Sie Ihren Posteingang und folgen Sie den Schritten in der Buchungsbestätigungs-E-Mail, um Ihre Unterkunft zu buchen. Die Adresse und der Google Maps-Link finden Sie in der Bestätigungs-E-Mail.',
  },

  es: {
    CONGRATULATIONS: '¡Felicidades!',
    SUCCESS: 'Su pago se realizó con éxito. Le hemos enviado un correo electrónico de confirmación.',
    SUCCESS_PAY_LATER: 'Su reserva se realizó con éxito. Le hemos enviado un correo electrónico de confirmación.',
    ERROR: '¡Algo salió mal! Inténtelo de nuevo más tarde.',
    STATUS_TITLE: `Confirmación de reserva de ${env.WEBSITE_NAME}`,
    STATUS_MESSAGE: 'Revise su correo electrónico y siga los pasos indicados en el correo de confirmación para reservar su propiedad. Encontrará la dirección y el enlace de Google Maps en el correo de confirmación.',
  },

  it: {
    CONGRATULATIONS: 'Congratulazioni!',
    SUCCESS: 'Il pagamento è stato effettuato con successo. Ti abbiamo inviato una email di conferma.',
    SUCCESS_PAY_LATER: 'La prenotazione è stata effettuata con successo. Ti abbiamo inviato una email di conferma.',
    ERROR: 'Qualcosa è andato storto! Riprova più tardi.',
    STATUS_TITLE: `Conferma prenotazione ${env.WEBSITE_NAME}`,
    STATUS_MESSAGE: 'Controlla la tua casella di posta e segui i passaggi indicati nell’email di conferma della prenotazione per prenotare la tua proprietà. Troverai l’indirizzo e il link di Google Maps nell’email di conferma.',
  },
})

langHelper.setLanguage(strings)
export { strings }
