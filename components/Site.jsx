'use client';

import Shell from './Shell';
import Hero from './Hero';
import { About, Figures, Timeline, Subsidiaries, Projects, Showrooms, Catalogues, Park, CtaBand } from './Sections';
import { Contact, Footer } from './Contact';
import Globe from './Globe';

// Bascule de langue depuis le pied de page (même effet que le bouton FR/EN du menu)
const switchFromFooter = lang => () => document.querySelector('.lang')?.click();

export default function Site({ lang }) {
  return (
    <Shell lang={lang}>
      <main>
        <Hero />
        <About />
        <Figures />
        <Timeline />
        <Globe />
        <Subsidiaries />
        <Projects />
        <Showrooms />
        <Catalogues />
        <Park />
        <CtaBand />
        <Contact />
      </main>
      <Footer onSwitchLang={switchFromFooter(lang)} />
    </Shell>
  );
}
