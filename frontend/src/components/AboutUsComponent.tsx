import React from 'react'
import { UNSAFE_getTurboStreamSingleFetchDataStrategy, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import * as UserService from "@/services/UserService";

import '@/assets/css/about.css'

const __strings = {
  it: {
    WHO_ARE_WE: "Chi Siamo",
    WHEARE_ARE_wE: "Dove Siamo",
    TEXT_1: `Civico 46 Rooms si trova a pochi metri dal centro di S.M. di Licodia, in via Regina Margherita 46, zona
          strategica per visitare il paese e le meraviglie della zona etnea. A pochi km dalla città di Catania, il
          Rifugio Sapienza, il parco Etnaland e i poli commerciali. Facile accesso alle reti autostradali e ben
          collegato con i mezzi pubblici.`,
    THE_BUILDING: "La Struttura",
    TEXT_2: `Ospitato in un edificio storico del 1800, Civico 46 nasce da una recente ristrutturazione che ha saputo unire
          il fascino dell’epoca con tocchi moderni e funzionali. Un luogo accogliente, intimo e ricco di carattere.`,
    ROOMS: "Le Camere",
    ROOMS_SUBTITLE: "Disponiamo di tre camere indipendenti, tutte dotate di",
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
    TEXT_1: `Civico 46 Rooms is located just a few meters from the center of S.M. di Licodia, at Via Regina Margherita 46, a strategic area to explore the town and the wonders of the Etna region. Just a few kilometers from the city of Catania, the Rifugio Sapienza, Etnaland park, and commercial centers. Easy access to motorways and well connected by public transport.`,
    THE_BUILDING: "The Building",
    TEXT_2: `Housed in a historic 19th-century building, Civico 46 comes from a recent renovation that combines period charm with modern and functional touches. A welcoming, intimate place full of character.`,
    ROOMS: "The Rooms",
    ROOMS_SUBTITLE: "We offer three independent rooms, all equipped with",
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
    TEXT_1: `Civico 46 Rooms befindet sich nur wenige Meter vom Zentrum von S.M. di Licodia entfernt, in der Via Regina Margherita 46 – ein strategischer Standort, um das Dorf und die Wunder der Ätna-Region zu erkunden. Nur wenige Kilometer von der Stadt Catania, dem Rifugio Sapienza, dem Etnaland-Park und Einkaufszentren entfernt. Einfacher Zugang zu Autobahnen und gute Anbindung an öffentliche Verkehrsmittel.`,
    THE_BUILDING: "Das Gebäude",
    TEXT_2: `Untergebracht in einem historischen Gebäude aus dem 19. Jahrhundert, entstand Civico 46 durch eine kürzliche Renovierung, die historischen Charme mit modernen und funktionalen Elementen vereint. Ein gemütlicher, intimer Ort voller Charakter.`,
    ROOMS: "Die Zimmer",
    ROOMS_SUBTITLE: "Wir verfügen über drei unabhängige Zimmer, alle ausgestattet mit",
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
    TEXT_1: `Civico 46 Rooms se encuentra a pocos metros del centro de S.M. di Licodia, en la vía Regina Margherita 46, una zona estratégica para visitar el pueblo y las maravillas de la región del Etna. A pocos kilómetros de la ciudad de Catania, del Rifugio Sapienza, del parque Etnaland y de centros comerciales. Fácil acceso a autopistas y bien conectado con el transporte público.`,
    THE_BUILDING: "El Edificio",
    TEXT_2: `Ubicado en un edificio histórico del siglo XIX, Civico 46 surge de una reciente renovación que ha sabido combinar el encanto de la época con toques modernos y funcionales. Un lugar acogedor, íntimo y lleno de carácter.`,
    ROOMS: "Las Habitaciones",
    ROOMS_SUBTITLE: "Contamos con tres habitaciones independientes, todas equipadas con",
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
    TEXT_1: `Civico 46 Rooms est situé à quelques mètres du centre de S.M. di Licodia, via Regina Margherita 46, une zone stratégique pour visiter le village et les merveilles de la région de l'Etna. À quelques kilomètres de la ville de Catane, du Rifugio Sapienza, du parc Etnaland et des centres commerciaux. Accès facile aux autoroutes et bien desservi par les transports publics.`,
    THE_BUILDING: "Le Bâtiment",
    TEXT_2: `Installé dans un bâtiment historique du XIXe siècle, Civico 46 est le fruit d'une rénovation récente qui a su allier le charme d'époque à des touches modernes et fonctionnelles. Un lieu accueillant, intime et plein de caractère.`,
    ROOMS: "Les Chambres",
    ROOMS_SUBTITLE: "Nous disposons de trois chambres indépendantes, toutes équipées de",
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

  const pageContent = `  <div class="about-us-container">
    <div class="container">
      <h1 class="${!drawTitle ? 'hide-it' : ''}">${strings.WHO_ARE_WE}</h1>

      <section>
        <h2>${strings.WHEARE_ARE_wE}</h2>
        <p>${strings.TEXT_1}</p>
      </section>

      <section>
        <h2>${strings.THE_BUILDING}</h2>
        <p>${strings.TEXT_2}</p>
      </section>

      <section>
        <h2>${strings.ROOMS}</h2>
        <div class="card">
          <p>${strings.ROOMS_SUBTITLE}:</p>
          <ul>
            <li>${strings.PRIVATE_BATHROOM}</li>
            <li>${strings.FREE_WIFI}</li>
            <li>${strings.AIR_CONDITIONING}</li>
            <li>${strings.SMART_TV}</li>
          </ul>
          <p>${strings.TEXT_3}</p>
        </div>
      </section>

      <section>
        <h2>${strings.EXTRA_SERVICES}</h2>
        <ul>
          <li>${strings.ANIMALS_ALLOWED}</li>
          <li>${strings.TRANSPORTATION_AVAILABILITY}</li>
          <li>${strings.EXTRA_BEDS}</li>
          <li>${strings.SELF_CHECKIN}</li>
        </ul>
      </section>

      <section>
        <h2>${strings.WHY_US}</h2>
        <ul>
          <li>${strings.STRATEGIC_LOCATION}</li>
          <li>${strings.UNIQUE_VIBE}</li>
          <li>${strings.COMFY_ENV}</li>
          <li>${strings.FLEXIBLE_CUSTOMERAWARE_HOUSING}</li>
        </ul>
      </section>

      <section>
        <h2>${strings.IDEAL_FOR}</h2>
        <p>${strings.TEXT_4}</p>
      </section>
    </div>
  </div>`;

  return (
    <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
  )
}

export default AboutUsComponent;
