import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    TITLE: "Conditions d'utilisation",
    TOS: `
Bienvenue chez ${env.WEBSITE_NAME} ! En accédant à notre site Web et en utilisant nos services, vous acceptez de vous conformer et d'être lié par les conditions d'utilisation suivantes. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.

1. Acceptation des conditions

En accédant ou en utilisant nos services, vous confirmez avoir lu, compris et accepté ces conditions d'utilisation et notre politique de confidentialité.

2. Utilisation de nos services

Vous acceptez d'utiliser nos services uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits, ne restreint ni n'empêche quiconque d'utiliser nos services. Cela inclut le respect de toutes les lois et réglementations applicables.

3. Réservations et paiements

Lorsque vous effectuez une réservation avec ${env.WEBSITE_NAME}, vous acceptez de fournir des informations exactes et complètes. Tous les paiements doivent être effectués via notre système de paiement sécurisé. Une fois le paiement effectué, vous recevrez une confirmation de votre réservation.

4. Politique d'annulation

Les annulations effectuées 24 heures avant la date de location peuvent donner droit à un remboursement complet. Les annulations effectuées moins de 24 heures avant la date de location peuvent entraîner des frais d'annulation. Veuillez vous référer à notre politique d'annulation pour des informations détaillées.

5. Conditions de location

Toutes les locations sont soumises à nos conditions de location, qui incluent, sans s'y limiter, les restrictions d'âge et les obligations d'assurance. Vous êtes responsable de vous assurer que vous remplissez toutes les conditions avant d'effectuer une réservation.

6. Limitation de responsabilité

${env.WEBSITE_NAME} ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de votre utilisation de nos services. En aucun cas, notre responsabilité totale ne dépassera le montant que vous avez payé pour les services.

7. Modifications des conditions

Nous nous réservons le droit de modifier ces conditions de service à tout moment. Toute modification entrera en vigueur immédiatement après sa publication sur notre site Web. Votre utilisation continue de nos services après toute modification constitue votre acceptation des nouvelles conditions.

8. Loi applicable

Ces conditions de service seront régies et interprétées conformément aux lois. Tout litige découlant de ces conditions sera résolu devant les tribunaux.

9. Coordonnées

Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse ${env.CONTACT_EMAIL}. Nous sommes là pour vous aider pour toute demande relative à nos services.

10. Reconnaissance

En utilisant nos services, vous reconnaissez avoir lu et compris ces conditions d'utilisation et acceptez d'être lié par elles.    
    `,
  },
  en: {
    TITLE: 'Terms of Service',
    TOS: `
Welcome to ${env.WEBSITE_NAME}! By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our services.


1. Acceptance of Terms

By accessing or using our services, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.


2. Use of Our Services

You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of our services. This includes compliance with all applicable laws and regulations.


3. Reservations and Payments

When you make a reservation with ${env.WEBSITE_NAME}, you agree to provide accurate and complete information. All payments must be made through our secure payment system. Once payment is completed, you will receive a confirmation of your reservation.


4. Cancellation Policy

Cancellations made 24 hours before the rental date may be eligible for a full refund. Cancellations made less than 24 hours prior to the rental date may incur a cancellation fee. Please refer to our cancellation policy for detailed information.


5. Rental Conditions

All rentals are subject to our rental conditions, which include but are not limited to age restrictions and insurance obligations. You are responsible for ensuring that you meet all requirements before making a reservation.


6. Limitation of Liability

${env.WEBSITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services. In no event shall our total liability exceed the amount paid by you for the services.


7. Modifications to Terms

We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services following any changes constitutes your acceptance of the new terms.


8. Governing Law

These Terms of Service shall be governed by and construed in accordance with the laws. Any disputes arising out of these terms shall be resolved in the courts.


9. Contact Information

If you have any questions regarding these Terms of Service, please contact us at ${env.CONTACT_EMAIL}. We are here to help you with any inquiries related to our services.


10. Acknowledgment

By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
    `,
  },
  it: {
  TITLE: 'Termini di servizio',
  TOS: `
Benvenuto su ${env.WEBSITE_NAME}! Accedendo al nostro sito web e utilizzando i nostri servizi, accetti di rispettare e di essere vincolato dai seguenti Termini di servizio. Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.

1. Accettazione dei termini

Accedendo o utilizzando i nostri servizi, confermi di aver letto, compreso e accettato questi Termini di servizio e la nostra Informativa sulla privacy.

2. Utilizzo dei nostri servizi

Accetti di utilizzare i nostri servizi solo per scopi leciti e in modo da non violare i diritti di terzi, né limitare o impedire l’uso dei nostri servizi da parte di altri utenti. Ciò include il rispetto di tutte le leggi e regolamenti applicabili.

3. Prenotazioni e pagamenti

Quando effettui una prenotazione su ${env.WEBSITE_NAME}, accetti di fornire informazioni accurate e complete. Tutti i pagamenti devono essere effettuati tramite il nostro sistema di pagamento sicuro. Una volta completato il pagamento, riceverai la conferma della prenotazione.

4. Politica di cancellazione

Le cancellazioni effettuate almeno 24 ore prima della data di noleggio possono essere idonee a un rimborso completo. Le cancellazioni effettuate meno di 24 ore prima della data di noleggio possono comportare una penale. Consulta la nostra politica di cancellazione per maggiori dettagli.

5. Condizioni di noleggio

Tutti i noleggi sono soggetti alle nostre condizioni di noleggio, che includono ma non si limitano a restrizioni di età e obblighi assicurativi. Sei responsabile di garantire il rispetto di tutti i requisiti prima di effettuare una prenotazione.

6. Limitazione di responsabilità

${env.WEBSITE_NAME} non sarà responsabile per danni indiretti, incidentali o consequenziali derivanti dall’uso dei nostri servizi. In nessun caso la nostra responsabilità totale supererà l’importo pagato da te per i servizi.

7. Modifiche ai termini

Ci riserviamo il diritto di modificare questi Termini di servizio in qualsiasi momento. Qualsiasi modifica sarà efficace immediatamente dopo la pubblicazione sul nostro sito web. L’uso continuato dei nostri servizi dopo le modifiche costituisce accettazione dei nuovi termini.

8. Legge applicabile

Questi Termini di servizio sono regolati e interpretati secondo la legge. Qualsiasi controversia derivante da questi termini sarà risolta presso i tribunali competenti.

9. Informazioni di contatto

Per qualsiasi domanda riguardo questi Termini di servizio, contattaci all’indirizzo ${env.CONTACT_EMAIL}. Siamo a disposizione per qualsiasi richiesta relativa ai nostri servizi.

10. Riconoscimento

Utilizzando i nostri servizi, riconosci di aver letto e compreso questi Termini di servizio e di accettarli.
  `,
},

de: {
  TITLE: 'Nutzungsbedingungen',
  TOS: `
Willkommen bei ${env.WEBSITE_NAME}! Durch den Zugriff auf unsere Website und die Nutzung unserer Dienste stimmen Sie zu, die folgenden Nutzungsbedingungen einzuhalten. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.

1. Annahme der Bedingungen

Durch den Zugriff auf oder die Nutzung unserer Dienste bestätigen Sie, dass Sie diese Nutzungsbedingungen und unsere Datenschutzrichtlinie gelesen, verstanden und akzeptiert haben.

2. Nutzung unserer Dienste

Sie verpflichten sich, unsere Dienste nur für rechtmäßige Zwecke und auf eine Weise zu verwenden, die die Rechte anderer nicht verletzt oder deren Nutzung unserer Dienste nicht einschränkt oder verhindert. Dies schließt die Einhaltung aller geltenden Gesetze und Vorschriften ein.

3. Reservierungen und Zahlungen

Wenn Sie eine Reservierung bei ${env.WEBSITE_NAME} vornehmen, erklären Sie sich damit einverstanden, genaue und vollständige Angaben zu machen. Alle Zahlungen müssen über unser sicheres Zahlungssystem erfolgen. Nach Abschluss der Zahlung erhalten Sie eine Reservierungsbestätigung.

4. Stornierungsbedingungen

Stornierungen, die 24 Stunden vor dem Mietdatum vorgenommen werden, können für eine vollständige Rückerstattung berechtigt sein. Stornierungen, die weniger als 24 Stunden vor dem Mietdatum erfolgen, können eine Stornierungsgebühr verursachen. Bitte beachten Sie unsere Stornierungsbedingungen für detaillierte Informationen.

5. Mietbedingungen

Alle Vermietungen unterliegen unseren Mietbedingungen, einschließlich, aber nicht beschränkt auf Altersbeschränkungen und Versicherungspflichten. Sie sind dafür verantwortlich, sicherzustellen, dass Sie alle Anforderungen vor der Reservierung erfüllen.

6. Haftungsbeschränkung

${env.WEBSITE_NAME} haftet nicht für indirekte, beiläufige oder Folgeschäden, die aus der Nutzung unserer Dienste entstehen. Unsere Gesamthaftung übersteigt in keinem Fall den von Ihnen für die Dienste gezahlten Betrag.

7. Änderungen der Bedingungen

Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen treten sofort nach der Veröffentlichung auf unserer Website in Kraft. Die fortgesetzte Nutzung unserer Dienste nach Änderungen stellt Ihre Zustimmung zu den neuen Bedingungen dar.

8. Anwendbares Recht

Diese Nutzungsbedingungen unterliegen den Gesetzen und werden gemäß diesen ausgelegt. Streitigkeiten aus diesen Bedingungen werden vor den zuständigen Gerichten beigelegt.

9. Kontaktinformationen

Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter ${env.CONTACT_EMAIL}. Wir helfen Ihnen gerne bei allen Anliegen bezüglich unserer Dienste.

10. Anerkennung

Durch die Nutzung unserer Dienste bestätigen Sie, dass Sie diese Nutzungsbedingungen gelesen, verstanden haben und sich daran binden.
  `,
},

es: {
  TITLE: 'Términos de servicio',
  TOS: `
¡Bienvenido a ${env.WEBSITE_NAME}! Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptas cumplir y estar sujeto a los siguientes Términos de servicio. Si no estás de acuerdo con estos términos, por favor no uses nuestros servicios.

1. Aceptación de los términos

Al acceder o utilizar nuestros servicios, confirmas que has leído, entendido y aceptado estos Términos de servicio y nuestra Política de privacidad.

2. Uso de nuestros servicios

Aceptas usar nuestros servicios únicamente para fines legales y de una manera que no infrinja los derechos de terceros, ni restrinja o impida el uso de nuestros servicios por parte de otros. Esto incluye cumplir con todas las leyes y regulaciones aplicables.

3. Reservas y pagos

Cuando haces una reserva en ${env.WEBSITE_NAME}, aceptas proporcionar información precisa y completa. Todos los pagos deben realizarse a través de nuestro sistema seguro de pagos. Una vez completado el pago, recibirás una confirmación de tu reserva.

4. Política de cancelación

Las cancelaciones realizadas con 24 horas de antelación a la fecha de alquiler pueden ser elegibles para un reembolso completo. Las cancelaciones hechas con menos de 24 horas antes de la fecha de alquiler pueden incurrir en una tarifa de cancelación. Consulta nuestra política de cancelación para más detalles.

5. Condiciones de alquiler

Todos los alquileres están sujetos a nuestras condiciones de alquiler, que incluyen pero no se limitan a restricciones de edad y obligaciones de seguro. Eres responsable de asegurar que cumples con todos los requisitos antes de hacer una reserva.

6. Limitación de responsabilidad

${env.WEBSITE_NAME} no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. En ningún caso nuestra responsabilidad total excederá el monto pagado por ti por los servicios.

7. Modificaciones a los términos

Nos reservamos el derecho de modificar estos Términos de servicio en cualquier momento. Cualquier cambio será efectivo inmediatamente tras su publicación en nuestro sitio web. El uso continuo de nuestros servicios tras cualquier cambio constituye tu aceptación de los nuevos términos.

8. Ley aplicable

Estos Términos de servicio se regirán e interpretarán de acuerdo con las leyes. Cualquier disputa derivada de estos términos será resuelta en los tribunales competentes.

9. Información de contacto

Si tienes alguna pregunta sobre estos Términos de servicio, por favor contáctanos en ${env.CONTACT_EMAIL}. Estamos aquí para ayudarte con cualquier consulta relacionada con nuestros servicios.

10. Reconocimiento

Al usar nuestros servicios, reconoces que has leído y comprendido estos Términos de servicio y aceptas estar sujeto a ellos.
  `,
},

})

langHelper.setLanguage(strings)
export { strings }
