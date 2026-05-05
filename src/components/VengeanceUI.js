'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   VENGEANCE UI — Cyberpunk Component Library
   Glassmorphism · Scanlines · Data Terminals · Neon Borders
   ═══════════════════════════════════════════════════════════════ */

/* ─── DATA TERMINAL READOUT ─── */
export function DataTerminal({ label, value, unit = '', color = 'var(--gold)', icon = '▸' }) {
  const [displayValue, setDisplayValue] = useState('---');
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        // Scramble effect before showing value
        const chars = '0123456789ABCDEF';
        let iteration = 0;
        const maxIterations = 15;
        const interval = setInterval(() => {
          setDisplayValue(
            Array.from({ length: String(value).length }, () =>
              chars[Math.floor(Math.random() * chars.length)]
            ).join('')
          );
          iteration++;
          if (iteration >= maxIterations) {
            clearInterval(interval);
            setDisplayValue(String(value));
          }
        }, 50);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{
      background: 'rgba(5, 12, 26, 0.8)',
      border: '1px solid var(--navy-border)',
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />

      {/* Scanline */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,168,76,0.015) 2px, rgba(201,168,76,0.015) 4px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--muted)', marginBottom: '8px',
      }}>
        {icon} {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '36px',
        color, lineHeight: 1, letterSpacing: '0.04em',
      }}>
        {displayValue}
        {unit && <span style={{ fontSize: '18px', opacity: 0.6, marginLeft: '4px' }}>{unit}</span>}
      </div>
    </div>
  );
}

/* ─── HUD FRAME ─── */
export function HUDFrame({ children, label = 'SYS.DATA', color = 'var(--gold)', className = '' }) {
  return (
    <div className={className} style={{
      position: 'relative',
      border: `1px solid rgba(201,168,76,0.12)`,
      padding: '32px',
      background: 'rgba(5, 12, 26, 0.4)',
    }}>
      {/* Top-left corner bracket */}
      <div style={{
        position: 'absolute', top: -1, left: -1,
        width: '20px', height: '20px',
        borderTop: `2px solid ${color}`,
        borderLeft: `2px solid ${color}`,
      }} />
      {/* Top-right corner bracket */}
      <div style={{
        position: 'absolute', top: -1, right: -1,
        width: '20px', height: '20px',
        borderTop: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
      }} />
      {/* Bottom-left */}
      <div style={{
        position: 'absolute', bottom: -1, left: -1,
        width: '20px', height: '20px',
        borderBottom: `2px solid ${color}`,
        borderLeft: `2px solid ${color}`,
      }} />
      {/* Bottom-right */}
      <div style={{
        position: 'absolute', bottom: -1, right: -1,
        width: '20px', height: '20px',
        borderBottom: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', top: '-10px', left: '24px',
        background: 'var(--navy)',
        padding: '0 8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '8px', letterSpacing: '0.15em',
        textTransform: 'uppercase', color,
      }}>
        {label}
      </div>

      {children}
    </div>
  );
}

/* ─── NEON CARD ─── */
export function NeonCard({ children, color = 'var(--gold)', glowIntensity = 0.1 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(13, 26, 48, 0.6)',
        border: `1px solid ${hovered ? color : 'var(--navy-border)'}`,
        padding: '28px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? `0 0 30px ${color}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}, inset 0 0 30px ${color}08` : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,76,0.01) 3px, rgba(201,168,76,0.01) 6px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── GLITCH HEADING ─── */
export function GlitchHeading({ text, tag = 'h2', size = '48px', color = 'var(--white)' }) {
  const [glitching, setGlitching] = useState(false);
  const Tag = tag;

  const handleHover = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 500);
  };

  return (
    <Tag
      onMouseEnter={handleHover}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size,
        letterSpacing: '0.06em',
        color,
        position: 'relative',
        display: 'inline-block',
        cursor: 'none',
      }}
    >
      <span style={{
        position: 'relative',
        display: 'inline-block',
      }}>
        {text}
        {glitching && (
          <>
            <span style={{
              position: 'absolute', top: 0, left: '2px',
              color: 'var(--cyan)', opacity: 0.7,
              clipPath: 'inset(20% 0 30% 0)',
              animation: 'glitch-1 0.3s linear',
            }}>{text}</span>
            <span style={{
              position: 'absolute', top: 0, left: '-2px',
              color: 'var(--coral)', opacity: 0.7,
              clipPath: 'inset(50% 0 10% 0)',
              animation: 'glitch-2 0.3s linear',
            }}>{text}</span>
          </>
        )}
      </span>

      <style jsx>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(3px, -1px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -1px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(1px, -2px); }
          80% { transform: translate(-3px, 1px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </Tag>
  );
}

/* ─── SCAN LINE DIVIDER ─── */
export function ScanDivider({ color = 'var(--gold)' }) {
  return (
    <div style={{
      position: 'relative',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '24px 0',
    }}>
      <div style={{
        flex: 1, height: '1px',
        background: `linear-gradient(90deg, transparent, ${color}40)`,
      }} />
      <div style={{
        width: '6px', height: '6px',
        border: `1px solid ${color}`,
        transform: 'rotate(45deg)',
      }} />
      <div style={{
        flex: 1, height: '1px',
        background: `linear-gradient(90deg, ${color}40, transparent)`,
      }} />
    </div>
  );
}

/* ─── PARALLAX IMAGE CONTAINER ─── */
export function ParallaxImage({ src, alt, height = '400px', speed = 0.3 }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      setOffset(distance * speed * -1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} style={{
      position: 'relative',
      height,
      overflow: 'hidden',
      border: '1px solid var(--navy-border)',
    }}>
      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', zIndex: 3 }} />

      <div style={{
        position: 'absolute',
        inset: '-20%',
        backgroundImage: src ? `url(${src})` : 'none',
        backgroundColor: 'var(--navy-card)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${offset}px) scale(1.1)`,
        transition: 'transform 0.1s linear',
      }} />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(5,12,26,0.3) 0%, rgba(5,12,26,0.6) 100%)',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,168,76,0.02) 2px, rgba(201,168,76,0.02) 4px)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─── CURVED TEXT ─── */
export function CurvedText({ text, radius = 150, fontSize = 12, color = 'var(--gold)', speed = 20 }) {
  const pathId = useRef(`curve-${Math.random().toString(36).slice(2)}`).current;

  return (
    <svg
      width={radius * 2 + 40}
      height={radius * 2 + 40}
      viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
      style={{ overflow: 'hidden', maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <path
          id={pathId}
          d={`M ${20},${radius + 20} a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
      </defs>
      <text
        fill={color}
        fontFamily="'Space Mono', monospace"
        fontSize={fontSize}
        letterSpacing="0.15em"
        style={{ textTransform: 'uppercase' }}
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          <animate
            attributeName="startOffset"
            from="0%"
            to="100%"
            dur={`${speed}s`}
            repeatCount="indefinite"
          />
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/* ─── TEXT REVEAL LINE BY LINE ─── */
export function TextReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: 'translateY(100%)',
    down: 'translateY(-100%)',
    left: 'translateX(100%)',
    right: 'translateX(-100%)',
  };

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <div style={{
        transform: visible ? 'translate(0)' : transforms[direction],
        opacity: visible ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s, opacity 0.8s ease ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
export function MagneticButton({ children, href = '#', className = 'btn-primary', onClick }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.3;
    const distY = (e.clientY - centerY) * 0.3;
    setOffset({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
      }}
    >
      {children}
    </a>
  );
}

/* ─── FLOATING BADGE ─── */
export function FloatingBadge({ children, delay = 0 }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      background: 'rgba(201,168,76,0.06)',
      border: '1px solid rgba(201,168,76,0.15)',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '0.08em',
      color: 'var(--gold)',
      animation: `float 4s ease-in-out ${delay}s infinite`,
    }}>
      <span style={{ fontSize: '7px' }}>▸</span>
      {children}
    </span>
  );
}
