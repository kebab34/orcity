// Logo Orcity redessiné en vectoriel d'après la plaquette : toit doré + chevron noir.

export const GOLD = '#c5911a';
export const ROOF = 'M0 154L211 0V65L0 219Z';
export const CHEVRON = 'M171 120L213 89L302 154V218Z';

export function OrcityMark({ className, dark = '#111111' }) {
  return (
    <svg className={className} viewBox="0 0 302 219" aria-hidden="true">
      <path d={ROOF} fill={GOLD} />
      <path d={CHEVRON} fill={dark} />
    </svg>
  );
}

export default function Logo({ className = '', light = false }) {
  return (
    <span className={`brand ${light ? 'is-light' : ''} ${className}`}>
      <OrcityMark className="brand-mark" dark={light ? '#ffffff' : '#111111'} />
      <span className="brand-text">
        <b>ORCITY</b>
        <small>GROUPE</small>
      </span>
    </span>
  );
}
