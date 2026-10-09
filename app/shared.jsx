import { Montserrat, Inter } from 'next/font/google';
import { site, t } from '@/lib/content';
import './globals.css';

const display = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const viewport = { themeColor: '#111111' };

/** Métadonnées (titre, description, langues alternatives) pour chaque langue. */
export function metaFor(lang) {
  const m = t[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: m.title,
    description: m.description,
    alternates: { canonical: lang === 'fr' ? '/' : '/en/', languages: { fr: '/', en: '/en/', 'x-default': '/' } },
    openGraph: { type: 'website', locale: lang === 'fr' ? 'fr_FR' : 'en_GB', title: m.title, description: m.description, images: ['/images/programmes/loges-ariane-1.jpg'] },
    icons: { icon: '/favicon.svg' },
  };
}

function jsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: lang === 'fr' ? site.url : `${site.url}/en/`,
    logo: `${site.url}/favicon.svg`,
    description: t[lang].meta.description,
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: site.city, addressCountry: 'FR' },
    subOrganization: ['Dekor & Design', 'ORMA', 'SRA Global Trading', 'ADN Building'].map(name => ({ '@type': 'Organization', name })),
  };
}

const introScript = `try{var s=sessionStorage,c=document.documentElement.classList;if(s.getItem('orcity-intro-seen'))c.add('skip-intro');if(s.getItem('orcity-lang-switch'))c.add('lang-enter')}catch(e){}`;

export function RootHtml({ lang, children }) {
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Avant tout affichage : l'intro du logo ne se joue qu'une fois par visite ; après un changement de langue, rideau doré */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
