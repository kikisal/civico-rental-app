import express, {Request, Response} from 'express'
import routeNames from '../config/getTranslations.config'

const routes = express.Router();
// WARNING WEB DEVS ----> hard coded stuff in here DONT FREAK OUT <-----
const translations = {
    '6882286314a2b6d1703c5bcf': {
        'en': `The Civico 46 Rooms - Green room in Santa Maria di Licodia offers 40 m² of space and can accommodate up to 3 people. During your stay, you will have a bedroom with a double bed and, if booked for 3 people, an additional folding bed. The accommodation also features a private bathroom. Among the available amenities are Wi-Fi suitable for video calls, air conditioning, TV, video on demand, and a baby cot. The room ensures practical comfort with all the essential features for your stay.
You can use the shared open terrace and the bicycle storage at this property in Santa Maria di Licodia.

The historic property dates back to 1600 as a residence for Benedictine monks and covers an area of 1200 sqm. In the nineteenth century, it was converted into a private residence by a Sicilian nobleman. The property has 3 rooms: the Red and Green rooms share a terrace covered with natural fabrics, ideal for relaxing, while the Yellow room has a private entrance and separate access.

Street parking is available. Pets are allowed only in the Red and Green rooms. Events are not permitted. The owners live on site but not in the guest accommodation. Services such as airport and station shuttle, car rental, and cleaning are available for an extra fee. Two bicycles are included. Public transport connects various points in eastern Sicily. Please respect quiet hours from 2:00 pm to 4:00 pm and after 10:30 pm.
- Bikes provided Payment 10,00 € per day
- Train station shuttle Payment 50,00 € per ride`,
        'fr': `Le Civico 46 Rooms – chambre Verte à Santa Maria di Licodia offre 40 m² et peut accueillir jusqu’à 3 personnes. Pendant votre séjour, vous disposerez d’une chambre avec un lit double et, si vous êtes 3 personnes, d’un lit pliant supplémentaire. L’hébergement comprend également une salle de bain privée. Parmi les équipements disponibles : Wifi adapté aux visioconférences, climatisation, télévision, vidéo à la demande et lit bébé. La chambre garantit un confort pratique avec toutes les fonctionnalités essentielles pour votre séjour.
Vous pouvez utiliser la terrasse ouverte partagée ainsi que le local à vélos de la propriété à Santa Maria di Licodia.

Le bâtiment historique date de 1600 lorsqu’il servait de résidence aux moines bénédictins et couvre une surface de 1200 m². Au XIXᵉ siècle, il a été transformé en résidence privée par un noble sicilien. La propriété comprend 3 chambres : les chambres Rouge et Verte partagent une terrasse couverte de tissus naturels, idéale pour se détendre, tandis que la chambre Jaune dispose d’une entrée privée et d’un accès séparé.

Le stationnement dans la rue est disponible. Les animaux sont autorisés seulement dans les chambres Rouge et Verte. Les événements ne sont pas permis. Les propriétaires vivent sur place, mais pas dans les logements. Des services tels que navette aéroport ou gare, location de voiture et ménage sont disponibles moyennant un supplément. Deux vélos sont inclus. Les transports publics relient plusieurs points de l’est de la Sicile. Merci de respecter le silence de 14h00 à 16h00 et après 22h30.
- Vélos fournis : 10,00 € par jour
- Navette gare : 50,00 € par trajet`,
        'it': `Il Civico 46 Rooms – stanza Verde a Santa Maria di Licodia offre 40 m² e può ospitare fino a 3 persone. Durante il soggiorno avrete una camera con letto matrimoniale e, se siete in 3, un letto pieghevole aggiuntivo. L’alloggio dispone anche di bagno privato. Tra i comfort privati: Wi‑Fi adatto per videochiamate, aria condizionata, TV, video on demand e culla. La camera garantisce comfort pratico con tutte le funzionalità essenziali per il soggiorno.
Potete utilizzare la terrazza aperta in comune e il deposito biciclette presso la struttura a Santa Maria di Licodia.

L’immobile ha origini storiche risalenti al 1600 come residenza per monaci benedettini e copre una superficie di 1200 m². Nel XIX secolo fu trasformato in residenza privata da un nobile siciliano. La struttura ha 3 camere: la Verde e la Rossa condividono una terrazza coperta da tessuti naturali, ideale per rilassarsi, mentre la Gialla ha ingresso privato e accesso separato.

È disponibile parcheggio su strada. Gli animali sono ammessi solo nelle camere Rossa e Verde. Non sono consentiti eventi. I proprietari vivono in loco, ma non negli alloggi. Servizi come navetta aeroporto/stazione, autonoleggio e pulizie sono disponibili a pagamento extra. Due biciclette incluse. I trasporti pubblici collegano vari punti della Sicilia orientale. Si prega di rispettare le ore di silenzio dalle 14:00 alle 16:00 e dopo le 22:30.
- Biciclette fornite: 10,00 € al giorno
- Navetta stazione: 50,00 € a corsa`,
        'de': `The Civico 46 Rooms – Grünes Zimmer in Santa Maria di Licodia bietet 40 m² Platz und kann bis zu 3 Personen aufnehmen. Während Ihres Aufenthalts steht Ihnen ein Schlafzimmer mit einem Doppelbett und bei Buchung für 3 Personen ein zusätzliches Klappbett zur Verfügung. Die Unterkunft verfügt außerdem über ein eigenes Bad. Zu den privaten Annehmlichkeiten zählen WLAN für Videokonferenzen, Klimaanlage, TV, Video-on-Demand und ein Babybett. Das Zimmer bietet praktischen Komfort mit allen notwendigen Ausstattungen für Ihren Aufenthalt.
Sie können die gemeinsam genutzte offene Terrasse und die Fahrradbügel des Hauses in Santa Maria di Licodia nutzen.

Das historische Anwesen stammt aus dem Jahr 1600 und diente als Wohnsitz für Benediktinermönche. Es erstreckt sich über 1.200 m². Im 19. Jahrhundert wurde es von einem sizilianischen Adligen in eine private Residenz umgewandelt. Die Unterkunft umfasst 3 Zimmer: das Rote und das Grüne Zimmer teilen sich eine Terrasse mit Naturstoffüberdachung – ideal zum Entspannen – während das Gelbe Zimmer einen privaten Eingang und separaten Zugang besitzt.

Parkplatz entlang der Straße ist verfügbar. Haustiere sind nur im Roten und Grünen Zimmer erlaubt. Veranstaltungen sind nicht gestattet. Die Eigentümer wohnen vor Ort, jedoch nicht in der Gästeräumlichkeit. Zusatzleistungen wie Flughafen- oder Bahnhofsshuttle, Autovermietung und Reinigung sind gegen Aufpreis verfügbar. Zwei Fahrräder sind inklusive. Öffentliche Verkehrsmittel verbinden verschiedene Orte im Osten Siziliens. Bitte beachten Sie die Ruhezeiten von 14:00 bis 16:00 Uhr und nach 22:30 Uhr.
- Fahrräder zur Verfügung: 10,00 € pro Tag
- Bahnhofsshuttle: 50,00 € pro Fahrt`,
        'es': `The Civico 46 Rooms – habitación Verde en Santa Maria di Licodia ofrece 40 m² y puede alojar hasta 3 personas. Durante su estancia dispondrán de una habitación con cama doble y, si son 3 personas, una cama plegable adicional. El alojamiento incluye baño privado. Entre las comodidades privadas: Wi‑Fi apta para videollamadas, aire acondicionado, TV, vídeo bajo demanda y cuna. La habitación asegura comodidad práctica con todas las prestaciones esenciales para su estancia.
Pueden utilizar la terraza abierta compartida y el almacén de bicicletas en esta propiedad en Santa Maria di Licodia.

La propiedad histórica data de 1600 como residencia de monjes benedictinos y ocupa una superficie de 1200 m². En el siglo XIX fue convertida en residencia privada por un noble siciliano. La propiedad tiene 3 habitaciones: las habitaciones Roja y Verde comparten una terraza cubierta con tejidos naturales, ideal para relajarse, mientras que la habitación Amarilla tiene entrada privada y acceso separado.

El estacionamiento en la calle está disponible. Las mascotas solo están permitidas en las habitaciones Roja y Verde. No se permiten eventos. Los propietarios viven en el lugar, pero no en el alojamiento. Servicios como traslados al aeropuerto o la estación, alquiler de coches y limpieza están disponibles por un cargo adicional. Dos bicicletas están incluidas. El transporte público conecta varios puntos del este de Sicilia. Por favor, respeten las horas de silencio de 14:00 a 16:00 y después de las 22:30.
- Bicicletas incluidas: 10,00 € por día
- Traslado estación de tren: 50,00 € por viaje`
    },
    '68822aa914a2b6d1703c5d71': {
        'en': `Room Civico 46 Rooms - Red in Santa Maria di Licodia provides 40 sqm of space for up to 4 guests. You have 1 bedroom and 1 bathroom during your stay. Your private amenities include WiFi suitable for video calls, air conditioning, TV, video on demand, and a baby bed. The room offers practical comfort with essential features for your accommodation needs.
You can use the shared open terrace and the bicycle storage at this property in Santa Maria di Licodia.

The historic property dates back to 1600 as a residence for Benedictine monks and covers an area of 1200 sqm. In the nineteenth century, it was converted into a private residence by a Sicilian nobleman. The property has 3 rooms: the Red and Green rooms share a terrace covered with natural fabrics, ideal for relaxing, while the Yellow room has a private entrance and separate access.

Street parking is available. Pets are allowed only in the Red and Green rooms. Events are not permitted. The owners live on site but not in the guest accommodation. Services such as airport and station shuttle, car rental, and cleaning are available for an extra fee. Two bicycles are included. Public transport connects various points in eastern Sicily. Please respect quiet hours from 2:00 pm to 4:00 pm and after 10:30 pm.
- Bikes provided Payment 10,00 € per day
- Train station shuttle Payment 50,00 € per ride`,
        'fr': `La chambre Rouge de Civico 46 Rooms à Santa Maria di Licodia offre 40 m² pouvant accueillir jusqu’à 4 personnes. Vous disposez d’une chambre et d’une salle de bain pendant votre séjour. Vos équipements privés incluent Wifi adapté aux visioconférences, climatisation, télévision, vidéo à la demande et lit bébé. La chambre offre un confort pratique avec les fonctionnalités essentielles.
Vous pouvez utiliser la terrasse ouverte partagée et le local à vélos de la propriété à Santa Maria di Licodia.

Le bâtiment historique date de 1600 en tant que résidence pour moines bénédictins et couvre 1200 m². Au XIXᵉ siècle, il a été transformé en résidence privée par un noble sicilien. La propriété comprend 3 chambres : les chambres Rouge et Verte partagent une terrasse couverte de tissus naturels, tandis que la chambre Jaune bénéficie d’une entrée privée et d’un accès séparé.

Le stationnement dans la rue est disponible. Les animaux sont autorisés seulement dans les chambres Rouge et Verte. Les événements ne sont pas permis. Les propriétaires vivent sur place, mais pas dans les logements. Services tels que navette aéroport/station, location de voiture et ménage disponibles moyennant un supplément. Deux vélos inclus. Les transports publics desservent l’est de la Sicile. Merci de respecter le silence de 14h00 à 16h00 et après 22h30.
- Vélos fournis : 10,00 € par jour
- Navette gare : 50,00 € par trajet`,
        'it': `La stanza Rossa di Civico 46 Rooms a Santa Maria di Licodia offre 40 m² e può ospitare fino a 4 persone. Avrete una camera da letto e un bagno durante il soggiorno. I comfort privati includono Wi‑Fi per videoconferenze, aria condizionata, TV, video on demand e culla. La stanza offre comfort pratico con le funzionalità essenziali.
Potete usufruire della terrazza aperta condivisa e del deposito biciclette della struttura.

L’immobile risale al 1600 come residenza dei monaci benedettini e copre 1200 m². Nel XIX secolo è stato trasformato in residenza privata da un nobile siciliano. La struttura dispone di 3 camere: la Rossa e la Verde condividono una terrazza coperta di tessuti naturali, mentre la Gialla ha ingresso privato e accesso separato.

Parcheggio su strada disponibile. Animali ammessi solo nelle stanze Rossa e Verde. Eventi non permessi. I proprietari vivono in loco ma non negli alloggi. Servizi extra come navetta aeroporto/stazione, autonoleggio e pulizie disponibili a pagamento. Due biciclette incluse. I trasporti pubblici collegano l’est della Sicilia. Si prega di rispettare il silenzio dalle 14:00 alle 16:00 e dopo le 22:30.
- Biciclette fornite: 10,00 € al giorno
- Navetta stazione: 50,00 € a corsa`,
        'de': `Das Civico 46 Rooms – Rotes Zimmer in Santa Maria di Licodia bietet 40 m² und Platz für bis zu 4 Gäste. Sie haben ein Schlafzimmer und ein Badezimmer während Ihres Aufenthalts. Zu den privaten Annehmlichkeiten zählen WLAN für Videokonferenzen, Klimaanlage, TV, Video-on-Demand und ein Babybett. Das Zimmer bietet praktischen Komfort mit allen notwendigen Ausstattungen.
Sie dürfen die offene gemeinsame Terrasse und den Fahrradabstellraum der Unterkunft nutzen.

Das historische Anwesen stammt aus dem Jahr 1600 als Wohnsitz von Benediktinermönchen und umfasst 1.200 m². Im 19. Jahrhundert wurde es von einem sizilianischen Adligen in eine private Residenz umgewandelt. Die Unterkunft beherbergt 3 Zimmer: das Rote und das Grüne Zimmer teilen eine Terrasse mit Naturstoffüberdachung, während das Gelbe Zimmer einen privaten Eingang und separaten Zugang hat.

Straßenparkplätze sind vorhanden. Haustiere nur in den Roten und Grünen Zimmern erlaubt. Veranstaltungen sind untersagt. Die Eigentümer wohnen vor Ort, jedoch nicht in den Gästezimmern. Flughafen‑ bzw. Bahnhofsshuttle, Mietwagen und Reinigung sind gegen Aufpreis verfügbar. Zwei Fahrräder inklusive. Öffentliche Verkehrsmittel verbinden verschiedene Orte im Osten Siziliens. Bitte beachten Sie die Ruhezeiten von 14:00 bis 16:00 Uhr und nach 22:30 Uhr.
- Fahrräder zur Verfügung: 10,00 € pro Tag
- Bahnhofsshuttle: 50,00 € pro Fahrt`,
        'es': `La habitación Roja de Civico 46 Rooms en Santa Maria di Licodia ofrece 40 m² y puede alojar hasta 4 personas. Dispone de una habitación y un baño durante su estancia. Sus comodidades privadas incluyen Wi‑Fi apta para videollamadas, aire acondicionado, TV, vídeo bajo demanda y cuna. La habitación ofrece comodidad práctica con las prestaciones esenciales.
Pueden usar la terraza abierta compartida y el almacén de bicicletas de la propiedad.

La propiedad histórica data de 1600 como residencia de monjes benedictinos y ocupa 1200 m². En el siglo XIX fue convertida en residencia privada por un noble siciliano. Hay 3 habitaciones: las Roja y Verde comparten terraza con tejidos naturales, y la Amarilla tiene entrada privada y acceso separado.

Estacionamiento en la calle disponible. Las mascotas solo se permiten en las habitaciones Roja y Verde. No se permiten eventos. Los propietarios viven en el lugar, pero no en el alojamiento. Servicios como traslados aeropuerto/estación, alquiler de coche y limpieza disponibles por un cargo adicional. Dos bicicletas incluidas. El transporte público conecta el este de Sicilia. Por favor respeten el silencio de 14:00 a 16:00 y después de las 22:30.
- Bicicletas incluidas: 10,00 € por día
- Traslado estación de tren: 50,00 € por viaje`
    },
    '68822bc014a2b6d1703c5e0e': {
        'en': `The Civico 46 Rooms - Yellow in Santa Maria di Licodia offers 40 sqm of space and can accommodate up to 3 people. During your stay, you will have a bedroom with a double bed and, if booked for 3 guests, an additional folding bed. The accommodation also includes a private bathroom. Among the private amenities are Wi-Fi suitable for video calls, air conditioning, TV, video on demand, and a baby cot. The room ensures convenience and has all the essential features to meet your accommodation needs.
You can use the shared open terrace and the bicycle storage at this property in Santa Maria di Licodia.

The historic property dates back to 1600 as a residence for Benedictine monks and covers an area of 1200 sqm. In the nineteenth century, it was converted into a private residence by a Sicilian nobleman. The property has 3 rooms: the Red and Green rooms share a terrace covered with natural fabrics, ideal for relaxing, while the Yellow room has a private entrance and separate access.

Street parking is available. Pets are allowed only in the Red and Green rooms. Events are not permitted. The owners live on site but not in the guest accommodation. Services such as airport and station shuttle, car rental, and cleaning are available for an extra fee. Two bicycles are included. Public transport connects various points in eastern Sicily. Please respect quiet hours from 2:00 pm to 4:00 pm and after 10:30 pm.
- Bikes provided Payment 10,00 € per day
- Train station shuttle Payment 50,00 € per ride`,
        'fr': `La chambre Jaune de Civico 46 Rooms à Santa Maria di Licodia offre 40 m² et peut accueillir jusqu’à 3 personnes. Pendant votre séjour, vous aurez une chambre avec lit double et, si vous êtes 3, un lit pliant supplémentaire. L’hébergement comprend une salle de bain privée. Parmi les équipements : Wifi compatible visioconférences, climatisation, télévision, vidéo à la demande et lit bébé. La chambre garantit confort pratique avec toutes les fonctionnalités nécessaires.
Vous pouvez utiliser la terrasse ouverte partagée et le local à vélos à Santa Maria di Licodia.

Le bâtiment historique date de 1600 comme résidence des moines bénédictins et couvre 1200 m². Au XIXᵉ siècle, il a été converti en résidence privée par un noble sicilien. La propriété comprend 3 chambres : les chambres Rouge et Verte partagent une terrasse couverte en tissus naturels, tandis que la chambre Jaune bénéficie d’un accès séparé et d’une entrée privée.

Le stationnement dans la rue est disponible. Les animaux sont autorisés uniquement dans les chambres Rouge et Verte. Événements non autorisés. Les propriétaires vivent sur place, mais pas dans les logements. Services navette gare/aéroport, location de voiture, ménage disponibles moyennant suppléments. Deux vélos inclus. Transports publics desservent l’ouest de la Sicile. Merci de respecter le silence de 14h00 à 16h00 et après 22h30.
- Vélos fournis : 10,00 € par jour
- Navette gare : 50,00 € par trajet`,
        'it': `La stanza Gialla di Civico 46 Rooms a Santa Maria di Licodia offre 40 m² e può ospitare fino a 3 persone. Durante il soggiorno avrete una camera con letto matrimoniale e, se in 3, un letto pieghevole aggiuntivo. L’alloggio comprende anche un bagno privato. Tra i comfort privati: Wi‑Fi adatto per videochiamate, aria condizionata, TV, video on demand e culla. La camera assicura comfort pratico con le funzionalità essenziali.
Potete usare la terrazza aperta condivisa e il deposito biciclette della struttura.

La proprietà storica risale al 1600 come residenza per monaci benedettini e si estende su 1200 m². Nel XIX secolo fu trasformata in residenza privata da un nobile siciliano. Ci sono 3 camere: la Rossa e la Verde condividono una terrazza coperta in tessuti naturali, mentre la Gialla ha ingresso privato e accesso separato.

Parcheggio su strada disponibile. Animali ammessi solo nelle stanze Rossa e Verde. Eventi non consentiti. I proprietari vivono in loco ma non nei locali per gli ospiti. Servizi come navetta aeroporto/stazione, noleggio auto e pulizie disponibili a pagamento extra. Due biciclette incluse. I trasporti pubblici collegano l’est dell’isola. Si prega di rispettare il silenzio dalle 14:00 alle 16:00 e dopo le 22:30.
- Biciclette fornite: 10,00 € al giorno
- Navetta stazione: 50,00 € a corsa`,
        'de': `Das Civico 46 Rooms – Gelbes Zimmer in Santa Maria di Licodia bietet 40 m² Platz und kann bis zu 3 Personen aufnehmen. Während Ihres Aufenthalts steht Ihnen ein Schlafzimmer mit Doppelbett zur Verfügung und bei Buchung für 3 Personen zusätzlich ein Klappbett. Die Unterkunft verfügt über ein eigenes Badezimmer. Zu den privaten Annehmlichkeiten zählen WLAN für Videokonferenzen, Klimaanlage, TV, Video-on-Demand und ein Babybett. Das Zimmer gewährleistet praktischen Komfort mit allen wesentlichen Ausstattungen.
Sie können die offene Gemeinschaftsterrasse und den Fahrrad-Stellraum der Unterkunft nutzen.

Das historische Anwesen stammt aus dem Jahr 1600 als Wohnsitz der Benediktinermönche und umfasst 1.200 m². Im 19. Jahrhundert wurde es durch einen sizilianischen Adligen in eine private Residenz umgewandelt. Die Unterkunft verfügt über 3 Zimmer: das Rote und das Grüne teilen eine überdachte Terrasse mit Naturstoffen, während das Gelbe Zimmer einen eigenen Eingang und separaten Zugang hat.

Straßenparkplätze verfügbar. Haustiere nur im Roten und Grünen Zimmer erlaubt. Keine Veranstaltungen. Eigentümer wohnen vor Ort, aber nicht in den Gästezimmern. Flughafen‑/Bahnhofsshuttle, Mietwagen und Reinigung gegen Aufpreis buchbar. Zwei Fahrräder inklusive. Öffentliche Verkehrsmittel verbinden Ost‑Sizilien. Bitte beachten Sie die Ruhezeiten von 14:00 bis 16:00 Uhr und nach 22:30 Uhr.
- Fahrräder: 10,00 € pro Tag
- Bahnhofsshuttle: 50,00 € pro Fahrt`,
        'es': `La habitación Amarilla de Civico 46 Rooms en Santa Maria di Licodia ofrece 40 m² y puede alojar hasta 3 personas. Durante su estancia tendrá un dormitorio con cama doble y, si son 3 personas, una cama plegable adicional. El alojamiento incluye baño privado. Entre los servicios privados: Wi‑Fi para videollamadas, aire acondicionado, TV, vídeo bajo demanda y cuna. La habitación ofrece comodidad práctica con todas las prestaciones esenciales.
Pueden utilizar la terraza abierta compartida y el almacén de bicicletas en la propiedad.

La propiedad histórica data de 1600 como residencia de monjes benedictinos y ocupa 1200 m². En el siglo XIX fue convertida en residencia privada por un noble siciliano. Hay 3 habitaciones: las Roja y Verde comparten terraza con tejidos naturales, mientras que la Amarilla tiene entrada privada y acceso separado.

Estacionamiento en la calle disponible. Mascotas solo permitidas en las habitaciones Roja y Verde. No se permiten eventos. Los propietarios viven en el lugar, pero no en el alojamiento. Servicios como traslados aeropuerto/estación, alquiler de coche y limpieza disponibles por un coste adicional. Dos bicicletas incluidas. El transporte público conecta el este de Sicilia. Por favor respeten las horas de silencio de 14:00 a 16:00 y después de las 22:30.
- Bicicletas incluidas: 10,00 € por día
- Traslado estación de tren: 50,00 € por viaje`
    }
}

routes.route(routeNames.getTranslations).get(async (req: Request, res: Response) => {
    res.json(translations);
})

export default routes
