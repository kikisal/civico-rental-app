import React from 'react'
import { UNSAFE_getTurboStreamSingleFetchDataStrategy, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import * as UserService from "@/services/UserService";

import '@/assets/css/about.css'
import Map from './Map'

const __strings = {
  it: {
    WHO_ARE_WE: "Chi Siamo",
    WHEARE_ARE_wE: "Dove Siamo",
    TEXT_1: `Civico 46 Rooms si trova a pochi metri dal centro cittadino in Via Regina Margherita 46, zona strategica per visitare le meraviglie della zona etnea, a 27 chilometri dalla funivia (Rifugio Sapienza), e dai Crateri Silvestri.
A 27 chilometri da Piazza Duomo di Catania, a 26 chilometri dall'Anfiteatro di Catania, a 28 chilometri dall'Aeroporto di Fontana Rossa di Catania, a 14 chilometri dal Parco di Etnaland, e a 40 minuti da Taormina.
Facile accesso alle reti autostradali, e ben collegato con mezzi pubblici.`,
    THE_BUILDING: "La Struttura",
    TEXT_2: `Ospitato in un edificio storico del 1800, Civico 46 nasce da una recente ristrutturazione che ha saputo unire
          il fascino dell’epoca con tocchi moderni e funzionali. Un luogo accogliente, intimo e ricco di carattere.`,
    ROOMS: "Le Camere",
    ROOMS_SUBTITLE: "Disponiamo di tre camere indipendenti di circa 40m², tutte dotate di",

    COFFE_MACHINE: "Macchine da caffe",
    BAR_FRIDGE: "Frigo bar",
    SMOKE_NOT_ALLOWED: "Camere non fumatore (tranne nel cortile)",
    BIKE_RENTING: "Possibilita di noleggio bici",
    MOTORBIKE_TOUR_SERVICE: "Organizzazioni escursioni motociclistiche fuoristrada nel Parco dei Nebrodi",

    PRIVATE_BATHROOM: "Bagno privato",
    FREE_WIFI: "Wi-Fi gratuito",
    AIR_CONDITIONING: "Aria condizionata",
    SMART_TV: "Smart TV",
    TEXT_3: `Due camere si affacciano su un cortile privato, a disposizione di tutti gli ospiti. La terza camera ha
            ingresso indipendente con accesso dalla strada, perfetta per chi cerca maggiore privacy.`,
    EXTRA_SERVICES: "Servizi Extra",
    ANIMALS_ALLOWED: "Animali ammessi",
    TRANSPORTATION_AVAILABILITY: "Servizio navetta disponibile",
    EXTRA_BEDS: "Letti aggiuntivi",
    SELF_CHECKIN: "Self check-in",
    WHY_US: "Perché Scegliere Civico 46 Rooms",
    STRATEGIC_LOCATION: "Posizione strategica e tranquilla",
    UNIQUE_VIBE: "Atmosfera autentica in una dimora storica siciliana",
    COMFY_ENV: "Ambienti curati e confortevoli",
    FLEXIBLE_CUSTOMERAWARE_HOUSING: "Accoglienza flessibile e attenta alle esigenze degli ospiti",
    IDEAL_FOR: "Ideale Per",
    TEXT_4: `Coppie, famiglie, viaggiatori singoli, turisti e professionisti in cerca di una base comoda e suggestiva tra
          l’Etna e il mare.`
  },
  en: {
    WHO_ARE_WE: "Who We Are",
    WHEARE_ARE_wE: "Where We Are",
    TEXT_1: `Civico 46 Rooms is located just a few meters from the city center on Via Regina Margherita 46, a strategic area for visiting the wonders of the Etna region, 27 kilometers from the cable car (Rifugio Sapienza) and the Silvestri Craters.
It is 27 kilometers from Piazza Duomo in Catania, 26 kilometers from the Catania Amphitheater, 28 kilometers from Catania Fontanarossa Airport, 14 kilometers from Etnaland Park, and 40 minutes from Taormina.
Easily accessible from the highway network and well connected by public transport.`,
    THE_BUILDING: "The Building",
    TEXT_2: `Housed in a historic 19th-century building, Civico 46 comes from a recent renovation that combines period charm with modern and functional touches. A welcoming, intimate place full of character.`,
    ROOMS: "The Rooms",
    ROOMS_SUBTITLE: "We have three independent rooms of about 40 m², all equipped with",

    COFFE_MACHINE: "Coffee machine",
    BAR_FRIDGE: "Mini bar fridge",
    SMOKE_NOT_ALLOWED: "Non-smoking rooms (except in the courtyard)",
    BIKE_RENTING: "Possibility of bike rental",
    MOTORBIKE_TOUR_SERVICE: "Off-road motorbike tour organization in the Nebrodi Park",

    PRIVATE_BATHROOM: "Private bathroom",
    FREE_WIFI: "Free Wi-Fi",
    AIR_CONDITIONING: "Air conditioning",
    SMART_TV: "Smart TV",
    TEXT_3: `Two rooms overlook a private courtyard available to all guests. The third room has a private entrance from the street, perfect for those seeking more privacy.`,
    EXTRA_SERVICES: "Extra Services",
    ANIMALS_ALLOWED: "Pets allowed",
    TRANSPORTATION_AVAILABILITY: "Shuttle service available",
    EXTRA_BEDS: "Extra beds",
    SELF_CHECKIN: "Self check-in",
    WHY_US: "Why Choose Civico 46 Rooms",
    STRATEGIC_LOCATION: "Strategic and peaceful location",
    UNIQUE_VIBE: "Authentic atmosphere in a historic Sicilian residence",
    COMFY_ENV: "Well-maintained and comfortable spaces",
    FLEXIBLE_CUSTOMERAWARE_HOUSING: "Flexible and guest-oriented hospitality",
    IDEAL_FOR: "Ideal For",
    TEXT_4: `Couples, families, solo travelers, tourists, and professionals looking for a comfortable and charming base between Etna and the sea.`
  },
  de: {
    WHO_ARE_WE: "Wer Wir Sind",
    WHEARE_ARE_wE: "Wo Wir Sind",
    TEXT_1: `Civico 46 Rooms befindet sich nur wenige Meter vom Stadtzentrum entfernt in der Via Regina Margherita 46, in einer strategischen Lage, um die Wunder der Ätna-Region zu besuchen, 27 Kilometer von der Seilbahn (Rifugio Sapienza) und den Silvestri-Kratern entfernt.
27 Kilometer von der Piazza Duomo in Catania, 26 Kilometer vom Amphitheater von Catania, 28 Kilometer vom Flughafen Catania Fontanarossa, 14 Kilometer vom Park Etnaland und 40 Minuten von Taormina entfernt.
Leichter Zugang zum Autobahnnetz und gut mit öffentlichen Verkehrsmitteln verbunden.`,
    THE_BUILDING: "Das Gebäude",
    TEXT_2: `Untergebracht in einem historischen Gebäude aus dem 19. Jahrhundert, entstand Civico 46 durch eine kürzliche Renovierung, die historischen Charme mit modernen und funktionalen Elementen vereint. Ein gemütlicher, intimer Ort voller Charakter.`,
    ROOMS: "Die Zimmer",
    ROOMS_SUBTITLE: "Wir verfügen über drei unabhängige Zimmer von etwa 40 m², alle ausgestattet mit",

    COFFE_MACHINE: "Kaffeemaschine",
    BAR_FRIDGE: "Minibar-Kühlschrank",
    SMOKE_NOT_ALLOWED: "Nichtraucherzimmer (außer im Innenhof)",
    BIKE_RENTING: "Möglichkeit, Fahrräder zu mieten",
    MOTORBIKE_TOUR_SERVICE: "Organisation von Offroad-Motorradtouren im Nebrodi-Park",

    PRIVATE_BATHROOM: "Privatem Bad",
    FREE_WIFI: "Kostenlosem WLAN",
    AIR_CONDITIONING: "Klimaanlage",
    SMART_TV: "Smart-TV",
    TEXT_3: `Zwei Zimmer blicken auf einen privaten Innenhof, der allen Gästen zur Verfügung steht. Das dritte Zimmer hat einen eigenen Eingang von der Straße aus – ideal für Gäste, die mehr Privatsphäre suchen.`,
    EXTRA_SERVICES: "Zusätzliche Services",
    ANIMALS_ALLOWED: "Haustiere erlaubt",
    TRANSPORTATION_AVAILABILITY: "Shuttleservice verfügbar",
    EXTRA_BEDS: "Zustellbetten",
    SELF_CHECKIN: "Self Check-in",
    WHY_US: "Warum Civico 46 Rooms Wählen",
    STRATEGIC_LOCATION: "Strategische und ruhige Lage",
    UNIQUE_VIBE: "Authentische Atmosphäre in einem historischen sizilianischen Gebäude",
    COMFY_ENV: "Gepflegte und komfortable Räume",
    FLEXIBLE_CUSTOMERAWARE_HOUSING: "Flexible und gastfreundliche Unterkunft",
    IDEAL_FOR: "Ideal Für",
    TEXT_4: `Paare, Familien, Alleinreisende, Touristen und Berufstätige, die eine komfortable und charmante Unterkunft zwischen dem Ätna und dem Meer suchen.`
  },
  es: {
    WHO_ARE_WE: "Quiénes Somos",
    WHEARE_ARE_wE: "Dónde Estamos",
    TEXT_1: `Civico 46 Rooms se encuentra a pocos metros del centro de la ciudad en Via Regina Margherita 46, una zona estratégica para visitar las maravillas de la región del Etna, a 27 kilómetros del teleférico (Rifugio Sapienza) y de los Cráteres Silvestri.
A 27 kilómetros de la Piazza Duomo de Catania, a 26 kilómetros del Anfiteatro de Catania, a 28 kilómetros del Aeropuerto de Catania Fontanarossa, a 14 kilómetros del parque Etnaland y a 40 minutos de Taormina.
Fácil acceso a la red de autopistas y bien conectado con transporte público.`,
    THE_BUILDING: "El Edificio",
    TEXT_2: `Ubicado en un edificio histórico del siglo XIX, Civico 46 surge de una reciente renovación que ha sabido combinar el encanto de la época con toques modernos y funcionales. Un lugar acogedor, íntimo y lleno de carácter.`,
    ROOMS: "Las Habitaciones",
    ROOMS_SUBTITLE: "Disponemos de tres habitaciones independientes de unos 40 m², todas equipadas con",

    COFFE_MACHINE: "Máquina de café",
    BAR_FRIDGE: "Frigorífico bar",
    SMOKE_NOT_ALLOWED: "Habitaciones para no fumadores (excepto en el patio)",
    BIKE_RENTING: "Posibilidad de alquiler de bicicletas",
    MOTORBIKE_TOUR_SERVICE: "Organización de excursiones en moto todoterreno en el Parque de los Nebrodi",

    PRIVATE_BATHROOM: "Baño privado",
    FREE_WIFI: "Wi-Fi gratuito",
    AIR_CONDITIONING: "Aire acondicionado",
    SMART_TV: "Smart TV",
    TEXT_3: `Dos habitaciones dan a un patio privado disponible para todos los huéspedes. La tercera habitación tiene entrada independiente desde la calle, perfecta para quienes buscan más privacidad.`,
    EXTRA_SERVICES: "Servicios Extra",
    ANIMALS_ALLOWED: "Se permiten animales",
    TRANSPORTATION_AVAILABILITY: "Servicio de traslado disponible",
    EXTRA_BEDS: "Camas supletorias",
    SELF_CHECKIN: "Auto check-in",
    WHY_US: "Por Qué Elegir Civico 46 Rooms",
    STRATEGIC_LOCATION: "Ubicación estratégica y tranquila",
    UNIQUE_VIBE: "Ambiente auténtico en una residencia siciliana histórica",
    COMFY_ENV: "Ambientes cuidados y confortables",
    FLEXIBLE_CUSTOMERAWARE_HOUSING: "Hospitalidad flexible y centrada en el huésped",
    IDEAL_FOR: "Ideal Para",
    TEXT_4: `Parejas, familias, viajeros solitarios, turistas y profesionales que buscan una base cómoda y encantadora entre el Etna y el mar.`
  },
  fr: {
    WHO_ARE_WE: "Qui Nous Sommes",
    WHEARE_ARE_wE: "Où Nous Sommes",
    TEXT_1: `Civico 46 Rooms se trouve à quelques mètres du centre-ville, Via Regina Margherita 46, un emplacement stratégique pour visiter les merveilles de la région de l’Etna, à 27 kilomètres du téléphérique (Rifugio Sapienza) et des Cratères Silvestri.
À 27 kilomètres de la Piazza Duomo de Catane, à 26 kilomètres de l’Amphithéâtre de Catane, à 28 kilomètres de l’Aéroport de Catane Fontanarossa, à 14 kilomètres du parc Etnaland, et à 40 minutes de Taormine.
Accès facile au réseau autoroutier et bien desservi par les transports en commun.`,
    THE_BUILDING: "Le Bâtiment",
    TEXT_2: `Installé dans un bâtiment historique du XIXe siècle, Civico 46 est le fruit d'une rénovation récente qui a su allier le charme d'époque à des touches modernes et fonctionnelles. Un lieu accueillant, intime et plein de caractère.`,
    ROOMS: "Les Chambres",
    ROOMS_SUBTITLE: "Nous disposons de trois chambres indépendantes d’environ 40 m², toutes équipées de",

    COFFE_MACHINE: "Machine à café",
    BAR_FRIDGE: "Réfrigérateur de bar",
    SMOKE_NOT_ALLOWED: "Chambres non-fumeurs (sauf dans la cour)",
    BIKE_RENTING: "Possibilité de location de vélos",
    MOTORBIKE_TOUR_SERVICE: "Organisation d’excursions à moto tout-terrain dans le Parc des Nébrodes",

    PRIVATE_BATHROOM: "Salle de bain privée",
    FREE_WIFI: "Wi-Fi gratuit",
    AIR_CONDITIONING: "Climatisation",
    SMART_TV: "Smart TV",
    TEXT_3: `Deux chambres donnent sur une cour privée accessible à tous les hôtes. La troisième chambre dispose d'une entrée indépendante depuis la rue, idéale pour ceux qui recherchent plus d’intimité.`,
    EXTRA_SERVICES: "Services Supplémentaires",
    ANIMALS_ALLOWED: "Animaux admis",
    TRANSPORTATION_AVAILABILITY: "Service de navette disponible",
    EXTRA_BEDS: "Lits supplémentaires",
    SELF_CHECKIN: "Enregistrement autonome",
    WHY_US: "Pourquoi Choisir Civico 46 Rooms",
    STRATEGIC_LOCATION: "Emplacement stratégique et paisible",
    UNIQUE_VIBE: "Atmosphère authentique dans une demeure historique sicilienne",
    COMFY_ENV: "Espaces soignés et confortables",
    FLEXIBLE_CUSTOMERAWARE_HOUSING: "Accueil flexible et à l’écoute des besoins des clients",
    IDEAL_FOR: "Idéal Pour",
    TEXT_4: `Couples, familles, voyageurs solos, touristes et professionnels en quête d’un hébergement confortable et charmant entre l’Etna et la mer.`
  }
};

const AboutUsComponent = (props: any) => {
  const strings = (__strings as any)[UserService.getLanguage()] || __strings.en;
  const drawTitle = !!props.drawTitle;
  const drawMap = !!props.drawMap;

  // return (
  //   <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
  // )

  return (
    <div className="about-us-container">
      <div className="container">
        <h1 className={!drawTitle ? 'hide-it' : ''}>{strings.WHO_ARE_WE}</h1>

        <section>
          <h2>{strings.WHEARE_ARE_wE}</h2>
          <p>{strings.TEXT_1}</p>
          <div style={{padding: window.innerWidth / window.innerHeight < 1 ? "0 20px" : "0"}}>
          {/* {drawMap && <Map position={[37.617611, 14.8882705]} locations={[
              {
                _id: "", 
                name: "Via Regina Margherita, 46 Santa Maria Di Licodia", 
                latitude: 37.617760, 
                longitude: 14.88820
              }  
            ]} initialZoom={30}></Map>}
             */}
             {drawMap && (<iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d790.086104248127!2d14.8878521!3d37.6175855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13115180ec5b4cbf%3A0x11ec0a25356564b0!2sVia%20Regina%20Margherita%2C%2046%2C%2095038%20Santa%20Maria%20di%20Licodia%20CT!5e0!3m2!1sen!2sit!4v1756369021887!5m2!1sen!2sit&hl=${UserService.getLanguage()}`} width="600" height="450" style={{border:0, width: "100%"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>)}
          </div>
        </section>

        <section>
          <h2>{strings.THE_BUILDING}</h2>
          <p>{strings.TEXT_2}</p>
        </section>

        <section>
          <h2>{strings.ROOMS}</h2>
          <div className="card">
            <p>{strings.ROOMS_SUBTITLE}:</p>
            <ul>
              <li>{strings.COFFE_MACHINE}</li>
              <li>{strings.BAR_FRIDGE}</li>
              <li>{strings.SMOKE_NOT_ALLOWED}</li>
              <li>{strings.BIKE_RENTING}</li>
              <li>{strings.MOTORBIKE_TOUR_SERVICE}</li>
              <li>{strings.PRIVATE_BATHROOM}</li>
              <li>{strings.FREE_WIFI}</li>
              <li>{strings.AIR_CONDITIONING}</li>
              <li>{strings.SMART_TV}</li>
            </ul>
            <p>{strings.TEXT_3}</p>
          </div>
        </section>

        <section>
          <h2>{strings.EXTRA_SERVICES}</h2>
          <ul>
            <li>{strings.ANIMALS_ALLOWED}</li>
            <li>{strings.TRANSPORTATION_AVAILABILITY}</li>
            <li>{strings.EXTRA_BEDS}</li>
            <li>{strings.SELF_CHECKIN}</li>
          </ul>
        </section>

        <section>
          <h2>{strings.WHY_US}</h2>
          <ul>
            <li>{strings.STRATEGIC_LOCATION}</li>
            <li>{strings.UNIQUE_VIBE}</li>
            <li>{strings.COMFY_ENV}</li>
            <li>{strings.FLEXIBLE_CUSTOMERAWARE_HOUSING}</li>
          </ul>
        </section>

        <section>
          <h2>{strings.IDEAL_FOR}</h2>
          <p>{strings.TEXT_4}</p>
        </section>
      </div>
    </div>
  );
}

export default AboutUsComponent;
