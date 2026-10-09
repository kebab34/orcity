'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { IntroContext, LangContext, ease } from './motion';
import { CHEVRON, GOLD, ROOF } from './Logo';
import Nav from './Nav';
import { t } from '@/lib/content';

const SWITCH_KEY = 'orcity-lang-switch';
const SEEN_KEY = 'orcity-intro-seen';

export default function Shell({ lang, children }) {
  const [introDone, setIntroDone] = useState(false);
  const [enter, setEnter] = useState(true);
  const [leaving, setLeaving] = useState(null);
  const [pastHero, setPastHero] = useState(false);
  const lenisRef = useRef(null);

  // L'intro du logo ne se joue qu'à la première arrivée sur le site (une fois par visite).
  // Ensuite (changement de langue, rechargement), la page s'affiche directement.
  useEffect(() => {
    const cls = document.documentElement.classList;
    const seen = cls.contains('skip-intro');
    try { sessionStorage.setItem(SEEN_KEY, '1'); sessionStorage.removeItem(SWITCH_KEY); } catch {}
    setEnter(false); // lève le rideau doré s'il est affiché (arrivée après un changement de langue)
    const timer = setTimeout(() => setIntroDone(true), seen ? 0 : 2600);
    return () => clearTimeout(timer);
  }, []);

  // Défilement fluide + liens d'ancre animés
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: x => 1 - Math.pow(1 - x, 4) });
    lenisRef.current = lenis;
    let id = requestAnimationFrame(function raf(time) { lenis.raf(time); id = requestAnimationFrame(raf); });
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el);
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const l = lenisRef.current;
    if (!introDone) { l?.stop(); document.documentElement.style.overflow = 'hidden'; }
    else { l?.start(); document.documentElement.style.overflow = ''; }
  }, [introDone]);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Changement de langue : rideau doré, puis chargement de la page dans l'autre langue
  const switchLang = () => {
    const target = lang === 'fr' ? '/en/' : '/';
    try { sessionStorage.setItem(SWITCH_KEY, '1'); } catch {}
    setLeaving(lang === 'fr' ? 'en' : 'fr');
    setTimeout(() => { window.location.href = target + window.location.hash; }, 750);
  };

  const word = 'ORCITY'.split('');

  return (
    <LangContext.Provider value={lang}>
      <IntroContext.Provider value={introDone}>
        <AnimatePresence>
          {!introDone && (
            <motion.div
              className="intro"
              key="intro"
              initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
              transition={{ duration: 1, ease }}
            >
              {(
                <>
                  <svg className="intro-mark" viewBox="0 0 302 219" aria-hidden="true">
                    <motion.path d={ROOF} fill={GOLD} initial={{ x: -120, y: 90, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, ease, delay: 0.1 }} />
                    <motion.path d={CHEVRON} fill="#f4f1ea" initial={{ x: 120, y: 90, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, ease, delay: 0.3 }} />
                  </svg>
                  <div className="intro-word" aria-label="ORCITY">
                    {word.map((l, i) => (
                      <span className="line-mask" key={i}>
                        <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.55 + i * 0.06 }}>{l}</motion.span>
                      </span>
                    ))}
                  </div>
                  <motion.div className="intro-sub" initial={{ opacity: 0, letterSpacing: '0.2em' }} animate={{ opacity: 1, letterSpacing: '0.6em' }} transition={{ duration: 1.4, ease, delay: 1 }}>
                    {t[lang].intro.toUpperCase()}
                  </motion.div>
                  <div className="intro-bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease }} /></div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {enter && (
            <motion.div className="lang-curtain enter-curtain" key="enter" exit={{ clipPath: 'inset(0% 0% 100% 0%)' }} transition={{ duration: 0.8, ease }} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {leaving && (
            <motion.div className="lang-curtain" initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 0.7, ease }}>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
                {leaving === 'en' ? 'English' : 'Français'}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <Nav onSwitchLang={switchLang} />
        {children}
        <a href="#contact" className={`mobile-cta ${pastHero ? 'show' : ''}`}>{t[lang].nav.cta} →</a>
      </IntroContext.Provider>
    </LangContext.Provider>
  );
}
