import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  en: {
    TITLE1: `${env.WEBSITE_NAME} - Your Premier Property Rental Service`,
    SUBTITLE1: 'Your Trusted Partner for Property Rentals',
    CONTENT1: `At ${env.WEBSITE_NAME}, we understand that every journey is unique. We are committed to providing our customers with a diverse selection of properties that cater to every travel need. Whether you're exploring a city, commuting for business, or seeking adventure, our reliable property rental services ensure that your adventure begins seamlessly. Our mission is to deliver exceptional customer service, making your experience enjoyable and stress-free. With competitive rates, a variety of well-maintained properties, and a dedicated team ready to assist you, we strive to be your trusted partner on the road. Choose ${env.WEBSITE_NAME} for all your property rental needs and experience the freedom to explore at your own pace.`,
    TITLE2: `Why Choose ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Experience Excellence in Every Journey',
    CONTENT2: "Enjoy unmatched convenience, reliability, and value with our premier property rental service. From effortless bookings to high-quality properties, we're your trusted travel partner.",
    FIND_DEAL: 'Find Deal',
  },

  de: {
    TITLE1: `${env.WEBSITE_NAME} – Ihr erstklassiger Mietservice für Immobilien`,
    SUBTITLE1: 'Ihr vertrauenswürdiger Partner für Immobilienvermietungen',
    CONTENT1: `Bei ${env.WEBSITE_NAME} wissen wir, dass jede Reise einzigartig ist. Wir bieten Ihnen eine vielfältige Auswahl an Immobilien, die alle Reisebedürfnisse abdecken. Ob Städtereise, Geschäftsreise oder Abenteuer – mit unserem zuverlässigen Mietservice beginnt Ihre Reise reibungslos. Unsere Mission ist es, exzellenten Kundenservice zu bieten und Ihre Erfahrung angenehm und stressfrei zu gestalten. Mit wettbewerbsfähigen Preisen, gepflegten Immobilien und einem engagierten Team sind wir Ihr zuverlässiger Partner auf Reisen. Wählen Sie ${env.WEBSITE_NAME} für Ihre Mietbedürfnisse und erleben Sie die Freiheit, in Ihrem eigenen Tempo zu reisen.`,
    TITLE2: `Warum ${env.WEBSITE_NAME} wählen?`,
    SUBTITLE2: 'Exzellenz auf jeder Reise erleben',
    CONTENT2: "Genießen Sie unvergleichlichen Komfort, Zuverlässigkeit und Wert mit unserem erstklassigen Mietservice. Von einfacher Buchung bis zu hochwertigen Immobilien – wir sind Ihr vertrauenswürdiger Reisepartner.",
    FIND_DEAL: 'Angebot finden',
  },

  es: {
    TITLE1: `${env.WEBSITE_NAME} - Su servicio de alquiler de propiedades de primer nivel`,
    SUBTITLE1: 'Su socio de confianza en alquileres de propiedades',
    CONTENT1: `En ${env.WEBSITE_NAME}, entendemos que cada viaje es único. Estamos comprometidos a ofrecer una amplia selección de propiedades que se adapten a cada necesidad de viaje. Ya sea que explore una ciudad, viaje por negocios o busque aventuras, nuestros servicios confiables aseguran que su experiencia comience sin problemas. Nuestra misión es brindar un servicio al cliente excepcional, haciendo que su experiencia sea placentera y libre de estrés. Con tarifas competitivas, propiedades bien mantenidas y un equipo dedicado listo para ayudarle, aspiramos a ser su socio de confianza en el camino. Elija ${env.WEBSITE_NAME} para todas sus necesidades de alquiler y disfrute de la libertad de explorar a su propio ritmo.`,
    TITLE2: `¿Por qué elegir ${env.WEBSITE_NAME}?`,
    SUBTITLE2: 'Viva la excelencia en cada viaje',
    CONTENT2: "Disfrute de una comodidad, fiabilidad y valor incomparables con nuestro servicio de alquiler de propiedades. Desde reservas fáciles hasta propiedades de alta calidad, somos su socio de confianza en viajes.",
    FIND_DEAL: 'Buscar oferta',
  },

  it: {
    TITLE1: `${env.WEBSITE_NAME} - Il tuo servizio di noleggio immobiliare di prima scelta`,
    SUBTITLE1: 'Il tuo partner di fiducia per gli affitti',
    CONTENT1: `Noi di ${env.WEBSITE_NAME} sappiamo che ogni viaggio è unico. Ci impegniamo a offrire una vasta selezione di proprietà per soddisfare ogni esigenza di viaggio. Che tu stia esplorando una città, viaggiando per lavoro o cercando avventura, i nostri affidabili servizi di noleggio ti garantiranno un inizio senza intoppi. La nostra missione è offrire un servizio clienti eccezionale, rendendo la tua esperienza piacevole e senza stress. Con tariffe competitive, proprietà ben tenute e un team dedicato pronto ad assisterti, vogliamo essere il tuo partner di fiducia in viaggio. Scegli ${env.WEBSITE_NAME} per tutte le tue esigenze di noleggio e goditi la libertà di esplorare al tuo ritmo.`,
    TITLE2: `Perché scegliere ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Eccellenza in ogni viaggio',
    CONTENT2: "Goditi comodità, affidabilità e valore senza pari con il nostro servizio di noleggio. Dalla prenotazione facile a proprietà di alta qualità, siamo il tuo partner di viaggio di fiducia.",
    FIND_DEAL: 'Trova offerta',
  }
})

langHelper.setLanguage(strings)
export { strings }
