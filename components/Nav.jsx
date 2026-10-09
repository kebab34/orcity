'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease, useLang, useT } from './motion';
import Logo from './Logo';

export function LangSwitch({ onSwitch }) {
  const lang = useLang();
  return (
    <button className="lang" onClick={onSwitch} aria-label={useT().switchTo}>
      {['fr', 'en'].map(l => (
        <span key={l} className={l === lang ? 'on' : ''}>
          {l === lang && <motion.i layoutId="lang-pill" transition={{ duration: 0.5, ease }} />}
          {l.toUpperCase()}
        </span>
      ))}
    </button>
  );
}

export default function Nav({ onSwitchLang }) {
  const tr = useT();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.8);
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['#groupe', tr.nav.group],
    ['#international', tr.nav.world],
    ['#realisations', tr.nav.projects],
    ['#catalogues', tr.nav.catalogues],
  ];

  return (
    <>
      <header className={`nav ${solid || open ? 'solid' : ''} ${hidden && !open ? 'hidden' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav-inner">
          <a href="#accueil" className="logo" onClick={() => setOpen(false)} aria-label="Groupe Orcity">
            <Logo light={!solid || open} />
          </a>
          <nav className="nav-links">
            {links.map(([href, label]) => (
              <a key={href} href={href}><span data-text={label}>{label}</span></a>
            ))}
          </nav>
          <div className="nav-right">
            <LangSwitch onSwitch={onSwitchLang} />
            <a href="#contact" className="btn btn-small nav-cta">{tr.nav.cta}</a>
            <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
              <i /><i />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            {[...links, ['#contact', tr.nav.contact]].map(([href, label], i) => (
              <span className="line-mask" key={href}>
                <motion.a href={href} onClick={() => setOpen(false)} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}>
                  <em>0{i + 1}</em>{label}
                </motion.a>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
