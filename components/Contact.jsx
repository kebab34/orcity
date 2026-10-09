'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp, Lines, useLang, useT } from './motion';
import Logo from './Logo';
import { site } from '@/lib/content';

export function Contact() {
  const tr = useT();
  const f = tr.contact.form;
  // Le formulaire ouvre la messagerie du visiteur. À REMPLACER une fois en ligne par un service d'envoi (Formspree, Web3Forms…).
  const onSubmit = e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [`${f.name.replace(' *', '')} : ${d.get('nom')}`, `${f.company} : ${d.get('societe')}`, `${f.email.replace(' *', '')} : ${d.get('email')}`, `${f.phone} : ${d.get('tel')}`, '', d.get('message')].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${d.get('sujet')} – Groupe Orcity`)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">{tr.contact.eyebrow}</span>
          <Lines lines={tr.contact.title} />
          <FadeUp as="p" className="lead">{tr.contact.lead}</FadeUp>
          <FadeUp as="ul" className="contact-list">
            <li><span>{tr.contact.hq}</span><b>{site.street}<br />{site.postalCode} {site.city}, France</b></li>
            <li><span>{tr.contact.email}</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.phone && <li><span>{tr.contact.phone}</span><a href={`tel:${site.phoneLink}`}>{site.phone}</a></li>}
          </FadeUp>
        </div>
        <FadeUp as="form" className="form" onSubmit={onSubmit} delay={0.1}>
          <div className="row">
            <div className="field"><input id="nom" name="nom" placeholder=" " required autoComplete="name" /><label htmlFor="nom">{f.name}</label></div>
            <div className="field"><input id="societe" name="societe" placeholder=" " autoComplete="organization" /><label htmlFor="societe">{f.company}</label></div>
          </div>
          <div className="row">
            <div className="field"><input id="email" name="email" type="email" placeholder=" " required autoComplete="email" /><label htmlFor="email">{f.email}</label></div>
            <div className="field"><input id="tel" name="tel" type="tel" placeholder=" " autoComplete="tel" /><label htmlFor="tel">{f.phone}</label></div>
          </div>
          <div className="field">
            <select id="sujet" name="sujet" defaultValue={tr.contact.subjects[0]}>{tr.contact.subjects.map(s => <option key={s}>{s}</option>)}</select>
            <label htmlFor="sujet">{f.subject}</label>
          </div>
          <div className="field"><textarea id="message" name="message" rows={4} placeholder=" " /><label htmlFor="message">{f.message}</label></div>
          <button className="btn" type="submit">{f.send} <span className="arrow">→</span></button>
          <p className="form-note">{f.note}</p>
        </FadeUp>
      </div>
    </section>
  );
}

export function Footer({ onSwitchLang }) {
  const tr = useT();
  const lang = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo light />
            <p>{tr.footer.tagline}</p>
          </div>
          <div>
            <h4>{tr.nav.group}</h4>
            <a href="#groupe">{tr.nav.group}</a>
            <a href="#chiffres">{tr.nav.figures}</a>
            <a href="#international">{tr.nav.world}</a>
            <a href="#realisations">{tr.nav.projects}</a>
            <a href="#catalogues">{tr.nav.catalogues}</a>
          </div>
          <div>
            <h4>{tr.nav.contact}</h4>
            <p>{site.street}<br />{site.postalCode} {site.city}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button className="footer-lang" onClick={onSwitchLang}>{tr.switchTo} ↗</button>
          </div>
        </div>
        <motion.div className="footer-word" style={{ y }} aria-hidden="true">
          {/* Mot réparti exactement sur la largeur (textLength) : centré, sans débordement ; rempli d'un dégradé plutôt qu'en contour */}
          <svg viewBox="0 0 1000 152" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="footer-word-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4f1ea" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#f4f1ea" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <text x="0" y="146" textLength="1000" lengthAdjust="spacing" fill="url(#footer-word-fill)">ORCITY</text>
          </svg>
        </motion.div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name} · {tr.footer.rights}</span>
          <a href="#" lang={lang}>{tr.footer.legal}</a>
        </div>
      </div>
    </footer>
  );
}
