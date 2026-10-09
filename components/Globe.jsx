'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-110m.json';
import { ease, FadeUp, Lines, useT } from './motion';
import { sites } from '@/lib/content';

const SIZE = 600;
const R = 270;
const land = feature(landTopo, landTopo.objects.land);
const graticule = geoGraticule10();
const hq = sites.find(s => s.hq);
const CYCLE = 3800;

// Orientation du globe qui place un site au centre (légèrement au-dessus, plus naturel)
const targetFor = s => [-s.lon, -s.lat + 8];

export default function Globe() {
  const tr = useT();
  const wrap = useRef(null);
  const inView = useInView(wrap, { margin: '-15% 0px -15% 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rot, setRot] = useState(() => targetFor(sites[0]));
  const rotRef = useRef(rot);

  // Rotation fluide vers le site actif
  useEffect(() => {
    if (!inView) return;
    const target = targetFor(sites[active]);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { rotRef.current = target; setRot(target); return; }
    let id;
    const step = () => {
      const [a, b] = rotRef.current;
      const na = a + (target[0] - a) * 0.06;
      const nb = b + (target[1] - b) * 0.06;
      rotRef.current = [na, nb];
      setRot([na, nb]);
      if (Math.abs(target[0] - na) > 0.02 || Math.abs(target[1] - nb) > 0.02) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, inView]);

  // Visite automatique des implantations, interrompue au survol
  useEffect(() => {
    if (!inView || paused) return;
    const id = setTimeout(() => setActive(a => (a + 1) % sites.length), CYCLE);
    return () => clearTimeout(id);
  }, [active, inView, paused]);

  const { path, projection } = useMemo(() => {
    const projection = geoOrthographic().scale(R).translate([SIZE / 2, SIZE / 2]).rotate(rot).clipAngle(90).precision(0.6);
    return { projection, path: geoPath(projection) };
  }, [rot]);

  const center = [-rot[0], -rot[1]];
  const visible = s => geoDistance([s.lon, s.lat], center) < Math.PI / 2 - 0.08;
  const current = sites[active];
  const [cx, cy] = projection([current.lon, current.lat]);

  const france = sites.filter(s => ['castelnau', 'paris', 'cannes'].includes(s.id));
  const abroad = sites.filter(s => !france.includes(s));
  const choose = s => { setActive(sites.indexOf(s)); setPaused(true); };

  return (
    <section className="section section-dark world" id="international">
      <div className="container world-grid">
        <div className="world-text">
          <span className="eyebrow">{tr.world.eyebrow}</span>
          <Lines lines={tr.world.title} />
          <FadeUp as="p" className="lead">{tr.world.lead}</FadeUp>
          <div onMouseLeave={() => setPaused(false)}>
            {[[tr.world.france, france], [tr.world.international, abroad]].map(([label, list]) => (
              <FadeUp className="site-group" key={label}>
                <h3>{label}</h3>
                <ul>
                  {list.map(s => {
                    const on = sites[active].id === s.id;
                    return (
                      <li key={s.id}>
                        <button className={on ? 'on' : ''} onMouseEnter={() => choose(s)} onFocus={() => choose(s)} onClick={() => choose(s)}>
                          <b>{tr.world.sites[s.id].name}</b>
                          <span>{tr.world.sites[s.id].detail}</span>
                          {on && !paused && <motion.i className="site-timer" key={`t-${active}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CYCLE / 1000, ease: 'linear' }} />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>

        <motion.div className="globe" ref={wrap} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={tr.world.title.join(' ')}>
            <defs>
              <radialGradient id="g-sphere" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#2a2c31" />
                <stop offset="70%" stopColor="#16171a" />
                <stop offset="100%" stopColor="#0c0d0f" />
              </radialGradient>
              <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
                <stop offset="78%" stopColor="#c5911a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#c5911a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R + 34} fill="url(#g-glow)" />
            <path d={path({ type: 'Sphere' })} fill="url(#g-sphere)" stroke="rgba(244,241,234,.18)" />
            <path d={path(graticule)} className="graticule" />
            <path d={path(land)} className="land" />

            {sites.filter(s => !s.hq).map(s => (
              <path key={s.id} d={path({ type: 'LineString', coordinates: [[hq.lon, hq.lat], [s.lon, s.lat]] }) || ''} pathLength="1" className={`route ${current.id === s.id ? 'on' : ''}`} />
            ))}

            {sites.map(s => {
              if (!visible(s)) return null;
              const [x, y] = projection([s.lon, s.lat]);
              const on = current.id === s.id;
              return (
                <g key={s.id} className={`pin ${s.hq ? 'hq' : ''} ${on ? 'on' : ''}`} onMouseEnter={() => choose(s)}>
                  {on && <circle cx={x} cy={y} r="9" className="pin-ring" />}
                  <circle cx={x} cy={y} r={s.hq ? 5.5 : 4} className="pin-dot" />
                </g>
              );
            })}
          </svg>

          {/* Étiquette du site actif, posée sur le globe */}
          <AnimatePresence mode="wait">
            {visible(current) && (
              <motion.div
                key={current.id}
                className={`globe-anchor ${cx > SIZE * 0.55 ? 'flip' : ''}`}
                style={{ left: `${(cx / SIZE) * 100}%`, top: `${(cy / SIZE) * 100}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div className="globe-tag" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, ease }}>
                  <b>{tr.world.sites[current.id].name}</b>
                  <span>{current.hq ? tr.world.hq : tr.world.sites[current.id].detail}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="globe-count"><b>{String(active + 1).padStart(2, '0')}</b> / {String(sites.length).padStart(2, '0')}</div>
        </motion.div>
      </div>
    </section>
  );
}
