'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
const MAX_TILT = 70;

// Orientation du globe qui place un site au centre (légèrement au-dessus, plus naturel)
const targetFor = s => [-s.lon, -s.lat + 8];
const clampTilt = v => Math.max(-MAX_TILT, Math.min(MAX_TILT, v));
// Plus court chemin en longitude (évite de faire un tour complet)
const wrapDelta = d => ((((d + 180) % 360) + 360) % 360) - 180;

export default function Globe() {
  const tr = useT();
  const svgRef = useRef(null);
  const [active, setActive] = useState(0);
  const [rot, setRot] = useState(() => targetFor(sites[0]));
  const [touched, setTouched] = useState(false);
  const rotRef = useRef(rot);
  const anim = useRef({ id: 0, target: null, vx: 0, vy: 0 });
  const drag = useRef(null);

  const apply = useCallback(r => { rotRef.current = r; setRot(r); }, []);

  // Une seule boucle d'animation : soit vers une cible (clic sur une zone), soit l'élan après un glissé
  const run = useCallback(() => {
    cancelAnimationFrame(anim.current.id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = () => {
      const a = anim.current;
      let [x, y] = rotRef.current;
      if (a.target) {
        if (reduce) { apply(a.target); a.target = null; return; }
        const dx = wrapDelta(a.target[0] - x), dy = a.target[1] - y;
        x += dx * 0.09; y += dy * 0.09;
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) { apply(a.target); a.target = null; return; }
      } else {
        a.vx *= 0.94; a.vy *= 0.94;
        x += a.vx; y = clampTilt(y + a.vy);
        if (Math.abs(a.vx) < 0.01 && Math.abs(a.vy) < 0.01) { apply([x, y]); return; }
      }
      apply([x, y]);
      a.id = requestAnimationFrame(step);
    };
    anim.current.id = requestAnimationFrame(step);
  }, [apply]);

  useEffect(() => () => cancelAnimationFrame(anim.current.id), []);

  const goTo = useCallback(i => {
    setActive(i);
    setTouched(true);
    anim.current.vx = anim.current.vy = 0;
    anim.current.target = targetFor(sites[i]);
    run();
  }, [run]);

  const { path, projection } = useMemo(() => {
    const projection = geoOrthographic().scale(R).translate([SIZE / 2, SIZE / 2]).rotate(rot).clipAngle(90).precision(0.6);
    return { projection, path: geoPath(projection) };
  }, [rot]);

  const center = [-rot[0], -rot[1]];
  const visible = s => geoDistance([s.lon, s.lat], center) < Math.PI / 2 - 0.08;
  const current = sites[active];
  const [cx, cy] = projection([current.lon, current.lat]);

  // ----- Glisser pour faire tourner (souris et tactile) -----
  const toSvg = e => {
    const r = svgRef.current.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE];
  };
  const onDown = e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    cancelAnimationFrame(anim.current.id);
    anim.current.target = null;
    const [x, y] = toSvg(e);
    drag.current = { x, y, startX: x, startY: y, t: performance.now(), moved: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setTouched(true);
  };
  const onMove = e => {
    const d = drag.current;
    if (!d) return;
    const [x, y] = toSvg(e);
    const k = 0.32; // degrés par unité SVG
    const dx = (x - d.x) * k, dy = (y - d.y) * k;
    const now = performance.now(), dt = Math.max(now - d.t, 1);
    anim.current.vx = (dx / dt) * 16;
    anim.current.vy = (-dy / dt) * 16;
    d.x = x; d.y = y; d.t = now;
    d.moved = Math.max(d.moved, Math.hypot(x - d.startX, y - d.startY));
    const [rx, ry] = rotRef.current;
    apply([rx + dx, clampTilt(ry - dy)]);
  };
  const onUp = e => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved < 6) {
      // Simple toucher : on cherche la zone la plus proche du doigt
      const [x, y] = toSvg(e);
      let best = -1, bestDist = 34;
      sites.forEach((s, i) => {
        if (!visible(s)) return;
        const [px, py] = projection([s.lon, s.lat]);
        const dist = Math.hypot(px - x, py - y);
        if (dist < bestDist) { best = i; bestDist = dist; }
      });
      if (best >= 0) goTo(best);
      return;
    }
    if (performance.now() - d.t > 80) anim.current.vx = anim.current.vy = 0; // doigt immobile avant de lâcher : pas d'élan
    run();
  };

  const france = sites.filter(s => ['castelnau', 'paris', 'cannes'].includes(s.id));
  const abroad = sites.filter(s => !france.includes(s));

  return (
    <section className="section section-dark world" id="international">
      <div className="container world-grid">
        <div className="world-text">
          <span className="eyebrow">{tr.world.eyebrow}</span>
          <Lines lines={tr.world.title} />
          <FadeUp as="p" className="lead">{tr.world.lead}</FadeUp>
          {[[tr.world.france, france], [tr.world.international, abroad]].map(([label, list]) => (
            <FadeUp className="site-group" key={label}>
              <h3>{label}</h3>
              <ul>
                {list.map(s => {
                  const i = sites.indexOf(s);
                  return (
                    <li key={s.id}>
                      <button className={active === i ? 'on' : ''} onClick={() => goTo(i)} aria-pressed={active === i}>
                        <b>{tr.world.sites[s.id].name}</b>
                        <span>{tr.world.sites[s.id].detail}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          ))}
        </div>

        <motion.div className="globe" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={tr.world.title.join(' ')}
            data-lenis-prevent
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={() => { drag.current = null; }}
          >
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

            {sites.map((s, i) => {
              if (!visible(s)) return null;
              const [x, y] = projection([s.lon, s.lat]);
              const on = active === i;
              return (
                <g key={s.id} className={`pin ${s.hq ? 'hq' : ''} ${on ? 'on' : ''}`}>
                  {on && <circle cx={x} cy={y} r="9" className="pin-ring" />}
                  <circle cx={x} cy={y} r={s.hq ? 5.5 : 4} className="pin-dot" />
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {visible(current) && (
              <motion.div
                key={current.id}
                className={`globe-anchor ${cx > SIZE * 0.55 ? 'flip' : ''}`}
                style={{ left: `${(cx / SIZE) * 100}%`, top: `${(cy / SIZE) * 100}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="globe-tag" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, ease }}>
                  <b>{tr.world.sites[current.id].name}</b>
                  <span>{current.hq ? tr.world.hq : tr.world.sites[current.id].detail}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!touched && (
              <motion.div className="globe-hint" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.5, ease }}>
                <span className="globe-hint-icon" aria-hidden="true">↔</span>
                {tr.world.drag}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
