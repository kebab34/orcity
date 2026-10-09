'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ease, useIntroDone, useT } from './motion';
import { heroSlides } from '@/lib/content';

const DURATION = 6000;

/** Mot qui change en boucle (construisons → développons → équipons). */
function RotatingWord({ words, start }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setI(n => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [start, words.length]);
  return (
    <span className="rotator">
      {/* Mot le plus long, invisible, pour réserver la largeur */}
      <span className="rotator-ghost" aria-hidden="true">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="rotator-word"
          initial={{ y: '100%', rotateX: -60, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          exit={{ y: '-100%', rotateX: 60, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const tr = useT();
  const start = useIntroDone();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!start) return;
    const id = setTimeout(() => setI(n => (n + 1) % heroSlides.length), DURATION);
    return () => clearTimeout(id);
  }, [i, start]);

  const slide = heroSlides[i];
  const show = start ? { opacity: 1, y: 0 } : {};

  return (
    <section className="hero" id="accueil" ref={ref}>
      <motion.div className="hero-media" style={{ scale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="hero-slide"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 1, transition: { duration: 1.3 } }}
            transition={{ duration: 1.3, ease }}
          >
            <motion.img src={slide.src} alt={`${slide.name} – ${slide.place}`} initial={{ scale: 1.25 }} animate={{ scale: 1.02 }} transition={{ duration: DURATION / 1000 + 1.5, ease: 'linear' }} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="hero-grain" aria-hidden="true" />

      <motion.div className="hero-content" style={{ y: contentY, opacity: fade }}>
        <div className="container">
          <motion.p className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={show} transition={{ duration: 1, ease, delay: 0.1 }}>
            <i /> {tr.hero.tag}
          </motion.p>
          <h1 className="hero-title">
            <span className="line-mask"><motion.span initial={{ y: '110%' }} animate={start ? { y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 0.2 }}>{tr.hero.before} <RotatingWord words={tr.hero.words} start={start} /></motion.span></span>
            <span className="line-mask"><motion.span initial={{ y: '110%' }} animate={start ? { y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 0.3 }}>{tr.hero.after}</motion.span></span>
          </h1>
          <motion.div className="hero-bottom" initial={{ opacity: 0, y: 30 }} animate={show} transition={{ duration: 1.1, ease, delay: 0.7 }}>
            <p>{tr.hero.lead}</p>
            <div className="hero-ctas">
              <a href="#realisations" className="btn">{tr.hero.cta} <span className="arrow">→</span></a>
              <a href="#contact" className="btn btn-outline">{tr.hero.cta2}</a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hero-card" initial={{ opacity: 0, x: 40 }} animate={start ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease, delay: 0.9 }}>
        <div className="hero-card-top">
          <span>{tr.hero.programme}</span>
          <span>{String(i + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={slide.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease }}>
            <strong>{slide.name}</strong>
            <em>{slide.place}</em>
          </motion.div>
        </AnimatePresence>
        <div className="hero-dots">
          {heroSlides.map((s, n) => (
            <button key={s.src} onClick={() => setI(n)} className={n === i ? 'on' : ''} aria-label={s.name} style={{ '--dur': `${DURATION}ms` }}>
              <span key={n === i ? `on-${i}` : 'off'} />
            </button>
          ))}
        </div>
      </motion.div>
      <div className="hero-scroll" aria-hidden="true" />
    </section>
  );
}
