'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Counter, ease, FadeUp, Lines, RevealImage, useT } from './motion';
import { OrcityMark } from './Logo';
import { brands, catalogues, programmes, site } from '@/lib/content';

/* ---------- Présentation : mots qui s'allument + image qui s'agrandit ---------- */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span className="word" style={{ opacity }}>{children}</motion.span>;
}

export function About() {
  const tr = useT();
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.5'] });
  const words = tr.about.statement.split(' ');

  const expandRef = useRef(null);
  const { scrollYProgress: ep } = useScroll({ target: expandRef, offset: ['start start', 'end end'] });
  const clip = useTransform(ep, [0, 0.6], ['inset(14% 18% 14% 18% round 28px)', 'inset(0% 0% 0% 0% round 0px)']);
  const imgScale = useTransform(ep, [0, 1], [1.25, 1]);
  const labelOpacity = useTransform(ep, [0.45, 0.7], [0, 1]);

  return (
    <section className="about" id="groupe">
      <div className="container section">
        <span className="eyebrow">{tr.about.eyebrow}</span>
        <p className="statement" ref={textRef}>
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
        <div className="about-cols">
          <FadeUp as="p">{tr.about.p1}</FadeUp>
          <FadeUp as="p" delay={0.1}>{tr.about.p2}</FadeUp>
        </div>
      </div>
      <div className="expand" ref={expandRef}>
        <div className="expand-sticky">
          <motion.div className="expand-frame" style={{ clipPath: clip }}>
            <motion.img src="/images/programmes/petipa-3.jpg" alt="Programme Petipa, Montpellier" style={{ scale: imgScale }} />
            <motion.div className="expand-label" style={{ opacity: labelOpacity }}>
              <OrcityMark className="expand-mark" dark="#ffffff" />
              <span>Petipa · Montpellier (34)</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Chiffres clés ---------- */
export function Figures() {
  const tr = useT();
  return (
    <section className="section figures" id="chiffres">
      <div className="container">
        <div className="head">
          <span className="eyebrow">{tr.figures.eyebrow}</span>
          <Lines lines={tr.figures.title} />
        </div>
        <div className="figures-grid">
          {tr.figures.items.map((f, i) => (
            <FadeUp className="figure" key={f.label} delay={(i % 3) * 0.1}>
              <strong>
                {f.prefix && <small>{f.prefix}</small>}
                <Counter value={f.value} decimals={f.decimals} />
                {f.suffix && <sup>{f.suffix}</sup>}
              </strong>
              <span>{f.label}</span>
              <motion.i className="figure-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease, delay: 0.2 + (i % 3) * 0.1 }} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Histoire : frise horizontale pilotée par le défilement ---------- */
export function Timeline() {
  const tr = useT();
  const ref = useRef(null);
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, p => {
    const el = track.current;
    return el ? -p * Math.max(el.scrollWidth - window.innerWidth, 0) : 0;
  });
  return (
    <section className="timeline" ref={ref} style={{ '--h': `${tr.timeline.items.length * 60 + 100}vh` }}>
      <div className="timeline-sticky">
        <div className="container timeline-head">
          <span className="eyebrow">{tr.timeline.eyebrow}</span>
          <Lines lines={tr.timeline.title} />
        </div>
        <motion.div className="timeline-track" ref={track} style={{ x }}>
          {tr.timeline.items.map((it, i) => (
            <article className="milestone" key={it.year}>
              <span className="milestone-year">{it.year}</span>
              <span className="milestone-dot" />
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <span className="milestone-n">0{i + 1}</span>
            </article>
          ))}
        </motion.div>
        <div className="container"><div className="timeline-progress"><motion.span style={{ scaleX: scrollYProgress }} /></div></div>
      </div>
    </section>
  );
}

/* ---------- Filiales ---------- */
function TiltCard({ children, className }) {
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  return (
    <motion.article className={className} style={{ rotateX: rx, rotateY: ry }} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}>
      {children}
    </motion.article>
  );
}

export function Subsidiaries() {
  const tr = useT();
  const visual = {
    dekor: <img src="/images/groupe/showroom-1.jpg" alt="Showroom Dekor & Design" loading="lazy" className="cover" />,
    orma: <div className="orma-mark"><span>ORMA</span><small>Interior carpentry · İstanbul</small></div>,
    sra: <img src="/images/groupe/logo-sra.jpg" alt="SRA Global Trading" loading="lazy" className="logo-img" />,
    adn: <img src="/images/groupe/logo-adn.jpg" alt="ADN Building" loading="lazy" className="logo-img" />,
  };
  return (
    <section className="section subsidiaries" id="filiales">
      <div className="container">
        <div className="head">
          <span className="eyebrow">{tr.subsidiaries.eyebrow}</span>
          <Lines lines={tr.subsidiaries.title} />
        </div>
        <div className="subs-grid">
          {tr.subsidiaries.items.map((s, i) => (
            <FadeUp key={s.id} delay={i * 0.1} className="sub-wrap">
              <TiltCard className={`sub sub-${s.id}`}>
                <div className="sub-visual">{visual[s.id]}</div>
                <div className="sub-body">
                  <span className="sub-n">0{i + 1}</span>
                  <h3>{s.name}</h3>
                  <em>{s.place}</em>
                  <p>{s.text}</p>
                </div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Réalisations : liste interactive + aperçu qui suit la souris + visionneuse ---------- */
function Lightbox({ prog, onClose }) {
  const tr = useT();
  const [i, setI] = useState(0);
  const n = prog.images.length;
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI(v => (v + 1) % n);
      if (e.key === 'ArrowLeft') setI(v => (v - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, onClose]);
  const img = prog.images[i];
  return (
    <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img key={img.src} src={img.src} alt={prog.name} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} />
        </AnimatePresence>
        <div className="lightbox-bar">
          <div>
            <strong>{prog.name}</strong>
            <span>{prog.place} · {tr.projects.types[prog.type]}{img.perspective ? ` · ${tr.projects.perspective}` : ''}</span>
          </div>
          {n > 1 && (
            <div className="lightbox-nav">
              <button onClick={() => setI((i - 1 + n) % n)} aria-label={tr.projects.prev}>←</button>
              <span>{i + 1} / {n}</span>
              <button onClick={() => setI((i + 1) % n)} aria-label={tr.projects.next}>→</button>
            </div>
          )}
        </div>
        <button className="lightbox-close" onClick={onClose} aria-label={tr.projects.close}>×</button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const tr = useT();
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26 });
  const sy = useSpring(my, { stiffness: 220, damping: 26 });
  // Inclinaison selon la vitesse de la souris : vaut 0 au rendu serveur comme au chargement, donc pas d'écart d'hydratation
  const rotate = useTransform(useVelocity(sx), v => Math.max(-10, Math.min(10, v / 120)));
  const onMove = e => { mx.set(e.clientX); my.set(e.clientY); };

  return (
    <section className="section projects" id="realisations" onMouseMove={onMove}>
      <div className="container">
        <div className="head head-split">
          <div>
            <span className="eyebrow">{tr.projects.eyebrow}</span>
            <Lines lines={tr.projects.title} />
          </div>
          <div>
            <FadeUp className="big-count"><Counter value={programmes.length} /><span>{tr.projects.count}</span></FadeUp>
            <FadeUp as="p" className="lead">{tr.projects.lead}</FadeUp>
          </div>
        </div>

        <ul className="plist" onMouseLeave={() => setHover(null)}>
          {programmes.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -5% 0px' }}
              transition={{ duration: 0.7, ease, delay: (i % 4) * 0.05 }}
            >
              <button className={`prow ${hover !== null && hover !== i ? 'dim' : ''}`} onMouseEnter={() => setHover(i)} onClick={() => setOpen(p)}>
                <span className="prow-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="prow-thumb"><img src={p.images[0].src} alt="" loading="lazy" /></span>
                <span className="prow-name">{p.name}<small>{p.place}</small></span>
                <span className="prow-place">{p.place}</span>
                <span className="prow-type">{tr.projects.types[p.type]}</span>
                <span className="prow-count">{p.images.length} {tr.projects.photos}</span>
                <span className="prow-arrow">↗</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div className="cursor-preview" style={{ x: sx, y: sy, rotate }} animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.6 }} transition={{ duration: 0.35, ease }} aria-hidden="true">
        <AnimatePresence initial={false}>
          {hover !== null && (
            <motion.img key={hover} src={programmes[hover].images[0].src} alt="" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{open && <Lightbox prog={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ---------- Showrooms Dekor & Design + catalogues ---------- */
export function Showrooms() {
  const tr = useT();
  return (
    <section className="section section-dark showrooms" id="showrooms">
      <div className="container showrooms-grid">
        <div className="showroom-photos">
          <div className="sp a"><RevealImage src="/images/groupe/showroom-1.jpg" alt="Showroom Dekor & Design" /></div>
          <div className="sp b"><RevealImage src="/images/groupe/showroom-2.jpg" alt="Showroom Dekor & Design" from="left" /></div>
        </div>
        <div>
          <span className="eyebrow">{tr.showrooms.eyebrow}</span>
          <Lines lines={tr.showrooms.title} />
          <FadeUp as="p" className="lead">{tr.showrooms.lead}</FadeUp>
          <FadeUp as="ul" className="places">
            {tr.showrooms.places.map(p => <li key={p.name}><b>{p.name}</b><span>{p.address}</span></li>)}
          </FadeUp>
          <FadeUp className="brands">
            <span>{tr.showrooms.brands}</span>
            <ul className="brand-logos">
              {brands.map((b, i) => (
                <motion.li key={b.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.06 }}>
                  <img src={`/images/marques/${b.logo}.png`} alt={b.name} title={b.name} loading="lazy" style={{ height: b.h }} />
                </motion.li>
              ))}
              <li className="brand-more">{tr.showrooms.moreBrands}</li>
            </ul>
          </FadeUp>
          <FadeUp><a className="btn" href={site.dekorUrl} target="_blank" rel="noopener">{tr.showrooms.visit} <span className="arrow">↗</span></a></FadeUp>
        </div>
      </div>
    </section>
  );
}

export function Catalogues() {
  const tr = useT();
  return (
    <section className="section catalogues" id="catalogues">
      <div className="container">
        <div className="head head-split">
          <div>
            <span className="eyebrow">{tr.catalogues.eyebrow}</span>
            <Lines lines={tr.catalogues.title} />
          </div>
          <FadeUp as="p" className="lead">{tr.catalogues.lead}</FadeUp>
        </div>
      </div>
      <div className="cat-scroller" data-lenis-prevent-horizontal>
        <div className="cat-grid">
          {catalogues.map((c, i) => (
            <motion.a
              key={c.id}
              className="cat"
              href={c.href}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 70, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.02 }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="cat-cover"><img src={c.img} alt={`${tr.catalogues.names[c.id]} 2026 – Dekor & Design`} loading="lazy" /></div>
              <div className="cat-foot">
                <div><b>{tr.catalogues.names[c.id]}</b><small>PDF · {c.pages} {tr.catalogues.pages}</small></div>
                <i>↗</i>
              </div>
            </motion.a>
          ))}
          <motion.a
            className="cat cat-more"
            href={site.dekorUrl}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.02 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="cat-cover">
              <img src="/images/catalogues/carrelage.jpg" alt={tr.catalogues.more.title} loading="lazy" />
              <div className="cat-more-text"><b>{tr.catalogues.more.title}</b><span>{tr.catalogues.more.text}</span></div>
            </div>
            <div className="cat-foot">
              <div><b>{tr.catalogues.more.cta}</b><small>Dekor & Design</small></div>
              <i>↗</i>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Parc matériel ---------- */
export function Park() {
  const tr = useT();
  return (
    <section className="section park">
      <div className="container park-grid">
        <div>
          <span className="eyebrow">{tr.park.eyebrow}</span>
          <Lines lines={tr.park.title} />
          <FadeUp as="p" className="lead">{tr.park.lead}</FadeUp>
        </div>
        <div className="park-photos">
          {['parc-1', 'parc-2', 'parc-3'].map((p, i) => (
            <div key={p} className={`pp pp${i}`}><RevealImage src={`/images/groupe/${p}.jpg`} alt={tr.park.title.join(' ')} strength={6} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Grand appel à l'action ---------- */
export function CtaBand() {
  const tr = useT();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const markRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  return (
    <section className="cta-band" ref={ref}>
      <motion.div className="bg" style={{ y }}><img src="/images/programmes/loges-ariane-1.jpg" alt="" loading="lazy" /></motion.div>
      <div className="container">
        <motion.div className="cta-mark" style={{ rotate: markRotate }}><OrcityMark dark="#ffffff" /></motion.div>
        <Lines lines={tr.cta.title} />
        <FadeUp delay={0.2}><a href="#contact" className="btn btn-light">{tr.cta.button} <span className="arrow">→</span></a></FadeUp>
      </div>
    </section>
  );
}
