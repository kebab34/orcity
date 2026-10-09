// ============================================================
//  CONTENU DU SITE ORCITY — français (fr) et anglais (en)
//  Source : « PRESENTATION GROUPE ORCITY 2026 ». « À COMPLÉTER » = provisoire.
// ============================================================

export const site = {
  name: 'Groupe Orcity',
  url: 'https://www.groupe-orcity.fr', // À COMPLÉTER : vrai nom de domaine
  email: 'contact@groupe-orcity.fr', // À COMPLÉTER : vraie adresse email
  phone: '', // À COMPLÉTER : numéro (laisser vide pour le masquer)
  phoneLink: '',
  street: '535 avenue André Ampère',
  postalCode: '34170',
  city: 'Castelnau-le-Lez',
  dekorUrl: 'https://www.dekordesign.fr',
};

// Photos de l'accueil (programmes réels du groupe)
export const heroSlides = [
  { src: '/images/programmes/loges-ariane-1.jpg', name: "Les Loges d'Ariane", place: 'Lattes (34)' },
  { src: '/images/programmes/caractr-1.jpg', name: "Caract'R", place: 'Montpellier (34)' },
  { src: '/images/programmes/petipa-2.jpg', name: 'Petipa', place: 'Montpellier (34)' },
  { src: '/images/programmes/mas-du-padre-1.jpg', name: 'Mas du Padre', place: 'Lamalou-les-Bains (34)' },
  { src: '/images/programmes/victor-hugo-1.jpg', name: 'Victor Hugo', place: 'Marguerittes (30)' },
];

// `perspective: true` = image d'architecte (pas une photo)
export const programmes = [
  { name: 'Skyway', place: 'Montpellier (34)', type: 'housing', images: [{ src: 'skyway-1', perspective: true }, { src: 'skyway-2' }] },
  { name: 'Notre-Dame', place: 'Castelnau-le-Lez (34)', type: 'mixed', images: [{ src: 'notre-dame-1' }, { src: 'notre-dame-2' }] },
  { name: 'Le Mind', place: 'La Grande-Motte (34)', type: 'residence', images: [{ src: 'le-mind-1', perspective: true }, { src: 'le-mind-2' }, { src: 'le-mind-3' }] },
  { name: 'La Noria', place: 'Lattes (34)', type: 'housing', images: [{ src: 'la-noria-1' }, { src: 'la-noria-2' }] },
  { name: 'Mas du Padre', place: 'Lamalou-les-Bains (34)', type: 'housing', images: [{ src: 'mas-du-padre-1' }, { src: 'mas-du-padre-2' }] },
  { name: 'Symphonie', place: 'Baillargues (34)', type: 'housing', images: [{ src: 'symphonie-1' }, { src: 'symphonie-2' }, { src: 'symphonie-3' }, { src: 'symphonie-4' }] },
  { name: 'Glenn Miller', place: 'Clapiers (34)', type: 'housing', images: [{ src: 'glenn-miller-1' }, { src: 'glenn-miller-2' }, { src: 'glenn-miller-3' }] },
  { name: 'Les Capitelles', place: 'Mauguio (34)', type: 'housing', images: [{ src: 'capitelles-1' }, { src: 'capitelles-2', perspective: true }, { src: 'capitelles-3', perspective: true }, { src: 'capitelles-4' }, { src: 'capitelles-5' }] },
  { name: "Les Loges d'Ariane", place: 'Lattes (34)', type: 'residence', images: [{ src: 'loges-ariane-1' }, { src: 'loges-ariane-2' }, { src: 'loges-ariane-3' }] },
  { name: 'Influence', place: 'Montpellier (34)', type: 'housing', images: [{ src: 'influence-1' }, { src: 'influence-2' }] },
  { name: 'La Bergerie', place: 'Juvignac (34)', type: 'housing', images: [{ src: 'bergerie-1' }, { src: 'bergerie-2' }] },
  { name: "Caract'R", place: 'Montpellier (34)', type: 'housing', images: [{ src: 'caractr-1' }, { src: 'caractr-2' }] },
  { name: 'Petipa', place: 'Montpellier (34)', type: 'housing', images: [{ src: 'petipa-1' }, { src: 'petipa-2' }, { src: 'petipa-3' }] },
  { name: 'Victor Hugo', place: 'Marguerittes (30)', type: 'housing', images: [{ src: 'victor-hugo-1' }, { src: 'victor-hugo-2' }] },
  { name: 'Sweet Parc', place: 'Garons (30)', type: 'housing', images: [{ src: 'sweet-parc-1' }] },
  { name: 'Saint-Vincent', place: 'Pérols (34)', type: 'housing', images: [{ src: 'saint-vincent-1' }, { src: 'saint-vincent-2' }, { src: 'saint-vincent-3' }, { src: 'saint-vincent-4' }, { src: 'saint-vincent-5' }, { src: 'saint-vincent-6' }] },
].map(p => ({ ...p, images: p.images.map(i => ({ ...i, src: `/images/programmes/${i.src}.jpg` })) }));

// Implantations, placées sur la carte (longitude, latitude)
export const sites = [
  { id: 'castelnau', lon: 3.9, lat: 43.64, hq: true },
  { id: 'paris', lon: 2.35, lat: 48.86 },
  { id: 'cannes', lon: 7.01, lat: 43.55 },
  { id: 'istanbul', lon: 28.98, lat: 41.01 },
  { id: 'dubai', lon: 55.27, lat: 25.2 },
  { id: 'abidjan', lon: -4.01, lat: 5.36 },
];

export const catalogues = [
  { id: 'cuisines', img: '/images/catalogues/cuisines.jpg', href: '/catalogue/catalogue-cuisines-2026.pdf', pages: 44 },
  { id: 'bains', img: '/images/catalogues/salle-de-bains.jpg', href: '/catalogue/catalogue-salle-de-bains-2026.pdf', pages: 50 },
  { id: 'menuiserie', img: '/images/catalogues/menuiserie.jpg', href: '/catalogue/catalogue-menuiserie-2026.pdf', pages: 24 },
  { id: 'portes', img: '/images/catalogues/portes-entree.jpg', href: '/catalogue/catalogue-portes-entree-2026.pdf', pages: 20 },
  { id: 'exterieur', img: '/images/catalogues/exterieur.jpg', href: '/catalogue/catalogue-exterieur-2026.pdf', pages: 27 },
];

// Logos en blanc sur fond transparent (public/images/marques/), extraits de la plaquette.
// `h` : hauteur d'affichage en px, pour équilibrer visuellement les logos larges et compacts.
export const brands = [
  { name: 'VitrA', logo: 'vitra', h: 30 },
  { name: 'QUA Granite', logo: 'qua-granite', h: 44 },
  { name: 'Majorca Ceramiche', logo: 'majorca-ceramiche', h: 44 },
  { name: 'Kütahya Porselen', logo: 'kutahya-porselen', h: 24 },
  { name: 'Kobos Banyo', logo: 'kobos-banyo', h: 42 },
  { name: 'Soprano Mutfak', logo: 'soprano-mutfak', h: 36 },
  { name: 'Bien', logo: 'bien', h: 34 },
];

// ------------------------------------------------------------
//  Textes traduits
// ------------------------------------------------------------
export const t = {
  fr: {
    meta: {
      title: 'Groupe Orcity – Entreprise générale, promotion immobilière & matériaux | Castelnau-le-Lez',
      description: "Groupe Orcity : entreprise générale du bâtiment et promoteur constructeur depuis 10 ans. Logements collectifs, villas, showrooms Dekor & Design, implantations en France, à Istanbul, Dubaï et Abidjan.",
    },
    intro: 'Groupe',
    nav: { group: 'Le groupe', figures: 'Chiffres', world: 'International', projects: 'Réalisations', catalogues: 'Catalogues', contact: 'Contact', cta: 'Nous contacter' },
    hero: {
      tag: 'Entreprise générale · Promotion · Matériaux',
      before: 'Nous',
      words: ['construisons', 'développons', 'équipons'],
      after: 'vos projets.',
      lead: "Du logement collectif à la villa moderne ou traditionnelle, le Groupe Orcity mène des projets ambitieux en France et à l'international, avec une polyvalence et une disponibilité sans limite.",
      cta: 'Découvrir nos réalisations',
      cta2: 'Nous contacter',
      programme: 'Programme',
    },
    about: {
      eyebrow: 'Présentation',
      statement: "Nous répondons à tout type d'opération avec une grande polyvalence et une disponibilité sans limite.",
      p1: "Depuis dix ans, notre groupe répond aux attentes de ses clients grâce à l'expérience de ses dirigeants. Grâce à notre savoir-faire, nous réalisons tout type de projet architectural, pour une clientèle à la recherche d'une entreprise générale ou d'un promoteur constructeur capable de mener un projet ambitieux.",
      p2: "Les nombreuses années de travail nous ont permis de proposer une capacité humaine et technique à la hauteur des plus hautes exigences. Depuis 2021, nous sommes actifs dans la promotion immobilière, avec une demi-dizaine de terrains sur la Côte d'Azur en cours de construction et de commercialisation.",
    },
    figures: {
      eyebrow: 'Chiffres clés',
      title: ['Un groupe', 'qui grandit.'],
      items: [
        { value: 19.6, decimals: 1, suffix: ' M€', label: "de chiffre d'affaires en 2025" },
        { value: 45, prefix: '≈', label: 'salariés' },
        { value: 18, label: 'filiales dans le groupe' },
        { value: 2500, suffix: ' m²', label: 'de parc matériel' },
        { value: 25, suffix: '+', label: "années d'expérience" },
        { value: 6, label: "sites d'implantation" },
      ],
    },
    timeline: {
      eyebrow: 'Notre histoire',
      title: ['Dix ans', "d'expansion."],
      items: [
        { year: '10 ans', title: 'Entreprise générale', text: "Logements collectifs, villas modernes et traditionnelles : tout type de projet architectural, avec l'expérience de nos dirigeants." },
        { year: '2021', title: 'Promotion immobilière', text: "Le groupe devient promoteur constructeur, avec de nombreux terrains en portefeuille, dont une demi-dizaine sur la Côte d'Azur." },
        { year: '2024', title: 'Showrooms Dekor & Design', text: "Ouverture d'un showroom de 250 m² à Cannes et d'un showroom-dépôt de 2 200 m² au Muy, dans le Var." },
        { year: '2025', title: 'ORMA · Turquie', text: "Ouverture d'un site de développement à Istanbul avec notre filiale ORMA, spécialisée dans la menuiserie intérieure." },
        { year: '2026', title: 'Moyen-Orient & Afrique', text: 'SRA Global Trading à Dubaï et ADN Building à Abidjan : céramiques, marbres, menuiseries, façades et mobilier.' },
      ],
    },
    world: {
      eyebrow: 'Implantations',
      title: ['De Castelnau-le-Lez', 'à Dubaï.'],
      lead: '3 sites en France et 3 sites à l’international pour accompagner nos clients sur tous leurs besoins de construction.',
      france: 'France',
      international: 'International',
      hq: 'Siège social',
      sites: {
        castelnau: { name: 'Bassin méditerranéen', detail: 'Siège · Castelnau-le-Lez' },
        paris: { name: 'Grand Paris', detail: 'Île-de-France' },
        cannes: { name: 'Côte d’Azur', detail: 'Showrooms de Cannes et du Muy' },
        istanbul: { name: 'Istanbul', detail: 'Turquie · ORMA' },
        dubai: { name: 'Dubaï', detail: 'Émirats arabes unis · SRA Global Trading' },
        abidjan: { name: 'Abidjan', detail: "Côte d'Ivoire · ADN Building" },
      },
    },
    subsidiaries: {
      eyebrow: 'Nos filiales',
      title: ['Un groupe,', 'plusieurs savoir-faire.'],
      items: [
        { id: 'dekor', name: 'Dekor & Design', place: 'Castelnau-le-Lez · Cannes · Le Muy', text: 'Céramiques, marbres et pierres, meubles de salle de bains et de cuisine, menuiseries aluminium et PVC, à des tarifs attractifs.' },
        { id: 'orma', name: 'ORMA', place: 'Istanbul · Turquie', text: 'Site de développement spécialisé dans la menuiserie intérieure.' },
        { id: 'sra', name: 'SRA Global Trading', place: 'Dubaï · Émirats arabes unis', text: 'Murs-rideaux, menuiseries et carrelages pour le Moyen-Orient.' },
        { id: 'adn', name: 'ADN Building', place: "Abidjan · Côte d'Ivoire", text: "Vente de matériaux de construction en Afrique de l'Ouest. Qualité, solidité, confiance." },
      ],
    },
    projects: {
      eyebrow: 'Nos chantiers · Notre savoir-faire',
      title: ['Nos', 'réalisations.'],
      lead: "Résidences, immeubles et bâtiments mixtes réalisés par le groupe dans l'Hérault et le Gard. Cliquez sur un programme pour voir les photos.",
      count: 'programmes',
      photos: 'photos',
      perspective: "Perspective d'architecte",
      types: { housing: 'Logements collectifs', residence: 'Résidence', mixed: 'Bâtiment mixte' },
      close: 'Fermer', prev: 'Précédente', next: 'Suivante',
    },
    showrooms: {
      eyebrow: 'Dekor & Design',
      title: ['Inspiration, qualité,', 'élégance.'],
      lead: 'Venez découvrir notre univers unique de mobilier design, de décoration intérieure et de cuisine sur mesure.',
      places: [
        { name: 'Siège', address: '535 avenue André Ampère, 34170 Castelnau-le-Lez' },
        { name: 'Showroom Cannes', address: '4 boulevard Étienne Astegiano, 06400 Cannes' },
        { name: 'Showroom-dépôt Le Muy', address: "2204 route d'Aix, 83490 Le Muy" },
      ],
      brands: 'Nos principales marques',
      moreBrands: '& bien d’autres',
      visit: 'Visiter dekordesign.fr',
    },
    catalogues: {
      eyebrow: 'Catalogues 2026',
      title: ['Nos', 'catalogues.'],
      lead: 'Cuisines, salles de bains, menuiseries, portes et extérieur : feuilletez les collections Dekor & Design.',
      open: 'Ouvrir le catalogue',
      pages: 'pages',
      names: { cuisines: 'Cuisines', bains: 'Salle de bains', menuiserie: 'Menuiserie', portes: "Portes d'entrée", exterieur: 'Extérieur' },
      more: { title: 'Carrelage & céramique', text: 'Marbres, pierres et grands formats', cta: 'Voir sur dekordesign.fr' },
    },
    park: {
      eyebrow: 'Notre siège',
      title: ['2 500 m²', 'de parc matériel.'],
      lead: "Grues, banches, étaiements, échafaudages et engins : notre parc matériel nous rend autonomes et réactifs sur chaque chantier.",
    },
    contact: {
      eyebrow: 'Contact',
      title: ['Parlons de', 'votre projet.'],
      lead: 'Entreprise générale, promotion ou matériaux : nos équipes vous répondent rapidement.',
      hq: 'Siège social', email: 'Email', phone: 'Téléphone',
      form: { name: 'Nom et prénom *', company: 'Société', email: 'Email *', phone: 'Téléphone', subject: 'Votre besoin', message: 'Votre message', send: 'Envoyer', note: 'Réponse sous 48 h ouvrées.' },
      subjects: ['Entreprise générale', 'Promotion immobilière', 'Matériaux & showrooms', 'International', 'Autre'],
    },
    cta: { title: ['Votre prochain projet', 'commence ici.'], button: 'Nous contacter' },
    footer: { rights: 'Tous droits réservés', legal: 'Mentions légales', tagline: 'Entreprise générale · Promotion immobilière · Matériaux de construction' },
    switchTo: 'English',
  },

  en: {
    meta: {
      title: 'Orcity Group – General contractor, real estate development & materials | France',
      description: 'Orcity Group: general contractor and developer-builder for 10 years. Collective housing, villas, Dekor & Design showrooms, sites in France, Istanbul, Dubai and Abidjan.',
    },
    intro: 'Group',
    nav: { group: 'The group', figures: 'Key figures', world: 'International', projects: 'Projects', catalogues: 'Catalogues', contact: 'Contact', cta: 'Contact us' },
    hero: {
      tag: 'General contractor · Development · Materials',
      before: 'We',
      words: ['build', 'develop', 'supply'],
      after: 'your projects.',
      lead: 'From collective housing to modern or traditional villas, Orcity Group carries out ambitious projects in France and abroad, with great versatility and unlimited availability.',
      cta: 'See our projects',
      cta2: 'Contact us',
      programme: 'Project',
    },
    about: {
      eyebrow: 'About us',
      statement: 'We respond to all types of operations with great versatility and unlimited availability.',
      p1: 'For the past ten years, our group has been meeting the expectations of its customers with the experience of its managers. Thanks to our know-how, we carry out all types of architectural projects for clients looking for a general contractor or a developer-builder capable of carrying out an ambitious project.',
      p2: 'Many years of work have allowed us to offer a human and technical capacity that meets the highest requirements. Since 2021, we have been active in real estate development, with half a dozen plots of land on the Côte d’Azur under construction and marketing.',
    },
    figures: {
      eyebrow: 'Key figures',
      title: ['A growing', 'group.'],
      items: [
        { value: 19.6, decimals: 1, prefix: '€', suffix: 'M', label: 'turnover in 2025' },
        { value: 45, prefix: '≈', label: 'employees' },
        { value: 18, label: 'subsidiaries in the group' },
        { value: 2500, suffix: ' m²', label: 'equipment park' },
        { value: 25, suffix: '+', label: 'years of experience' },
        { value: 6, label: 'sites worldwide' },
      ],
    },
    timeline: {
      eyebrow: 'Our story',
      title: ['Ten years', 'of growth.'],
      items: [
        { year: '10 years', title: 'General contractor', text: 'Collective housing, modern and traditional villas: all types of architectural projects, backed by the experience of our managers.' },
        { year: '2021', title: 'Real estate development', text: 'The group becomes a developer-builder, with many plots of land in its portfolio, including half a dozen on the Côte d’Azur.' },
        { year: '2024', title: 'Dekor & Design showrooms', text: 'Opening of a 250 m² showroom in Cannes and a 2,200 m² showroom-depot in Le Muy, in the Var.' },
        { year: '2025', title: 'ORMA · Turkey', text: 'Opening of a development site in Istanbul with our subsidiary ORMA, specialised in interior carpentry.' },
        { year: '2026', title: 'Middle East & Africa', text: 'SRA Global Trading in Dubai and ADN Building in Abidjan: ceramics, marble, joinery, façades and furniture.' },
      ],
    },
    world: {
      eyebrow: 'Locations',
      title: ['From Castelnau-le-Lez', 'to Dubai.'],
      lead: '3 sites in France and 3 international sites to support our clients with all their construction needs.',
      france: 'France',
      international: 'International',
      hq: 'Headquarters',
      sites: {
        castelnau: { name: 'Mediterranean Basin', detail: 'Headquarters · Castelnau-le-Lez' },
        paris: { name: 'Greater Paris', detail: 'Île-de-France' },
        cannes: { name: 'Côte d’Azur', detail: 'Cannes and Le Muy showrooms' },
        istanbul: { name: 'Istanbul', detail: 'Turkey · ORMA' },
        dubai: { name: 'Dubai', detail: 'United Arab Emirates · SRA Global Trading' },
        abidjan: { name: 'Abidjan', detail: "Côte d'Ivoire · ADN Building" },
      },
    },
    subsidiaries: {
      eyebrow: 'Our subsidiaries',
      title: ['One group,', 'many skills.'],
      items: [
        { id: 'dekor', name: 'Dekor & Design', place: 'Castelnau-le-Lez · Cannes · Le Muy', text: 'Ceramics, marble and stone, bathroom and kitchen furniture, aluminium and PVC joinery, at attractive prices.' },
        { id: 'orma', name: 'ORMA', place: 'Istanbul · Turkey', text: 'Development site specialised in interior carpentry.' },
        { id: 'sra', name: 'SRA Global Trading', place: 'Dubai · United Arab Emirates', text: 'Curtain walls, windows and tiles for the Middle East.' },
        { id: 'adn', name: 'ADN Building', place: "Abidjan · Côte d'Ivoire", text: 'Construction materials for West Africa. Quality, strength, trust.' },
      ],
    },
    projects: {
      eyebrow: 'Our projects · Our know-how',
      title: ['Our', 'projects.'],
      lead: 'Residences, apartment buildings and mixed-use buildings delivered by the group in the Hérault and Gard. Click a project to see the photos.',
      count: 'projects',
      photos: 'photos',
      perspective: 'Architect’s rendering',
      types: { housing: 'Collective housing', residence: 'Residence', mixed: 'Mixed-use building' },
      close: 'Close', prev: 'Previous', next: 'Next',
    },
    showrooms: {
      eyebrow: 'Dekor & Design',
      title: ['Inspiration, quality,', 'elegance.'],
      lead: 'Discover our unique world of designer furniture, interior decoration and made-to-measure kitchens.',
      places: [
        { name: 'Head office', address: '535 avenue André Ampère, 34170 Castelnau-le-Lez, France' },
        { name: 'Cannes showroom', address: '4 boulevard Étienne Astegiano, 06400 Cannes, France' },
        { name: 'Le Muy showroom-depot', address: "2204 route d'Aix, 83490 Le Muy, France" },
      ],
      brands: 'Our main brands',
      moreBrands: '& many more',
      visit: 'Visit dekordesign.fr',
    },
    catalogues: {
      eyebrow: '2026 catalogues',
      title: ['Our', 'catalogues.'],
      lead: 'Kitchens, bathrooms, windows, entrance doors and outdoor living: browse the Dekor & Design collections (in French).',
      open: 'Open catalogue',
      pages: 'pages',
      names: { cuisines: 'Kitchens', bains: 'Bathrooms', menuiserie: 'Windows & joinery', portes: 'Entrance doors', exterieur: 'Outdoor living' },
      more: { title: 'Tiles & ceramics', text: 'Marble, stone and large formats', cta: 'See dekordesign.fr' },
    },
    park: {
      eyebrow: 'Our headquarters',
      title: ['2,500 m²', 'equipment park.'],
      lead: 'Cranes, formwork, shoring, scaffolding and machinery: our equipment park keeps us independent and responsive on every site.',
    },
    contact: {
      eyebrow: 'Contact',
      title: ["Let's talk about", 'your project.'],
      lead: 'General contracting, development or materials: our teams will get back to you quickly.',
      hq: 'Headquarters', email: 'Email', phone: 'Phone',
      form: { name: 'Full name *', company: 'Company', email: 'Email *', phone: 'Phone', subject: 'Your need', message: 'Your message', send: 'Send', note: 'We reply within 2 business days.' },
      subjects: ['General contracting', 'Real estate development', 'Materials & showrooms', 'International', 'Other'],
    },
    cta: { title: ['Your next project', 'starts here.'], button: 'Contact us' },
    footer: { rights: 'All rights reserved', legal: 'Legal notice', tagline: 'General contractor · Real estate development · Construction materials' },
    switchTo: 'Français',
  },
};
