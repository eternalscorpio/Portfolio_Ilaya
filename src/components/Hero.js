'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CurvedText, MagneticButton, FloatingBadge, TextReveal } from './VengeanceUI';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

/* ─── SCRAMBLE TEXT EFFECT ─── */
function ScrambleText({ text, className = '', delay = 0, speed = 30 }) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}|';

  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 0.5;
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return <span className={className}>{displayText || '\u00A0'.repeat(text.length)}</span>;
}

/* ─── SPLIT TEXT REVEAL (GSAP-Style) ─── */
function SplitTextReveal({ text, delay = 0, stagger = 40, className = '' }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={className} style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: revealed ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-80deg)',
            opacity: revealed ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * stagger}ms,
                         opacity 0.4s ease ${i * stagger}ms`,
            transformOrigin: 'bottom center',
            minWidth: char === ' ' ? '0.3em' : 'auto',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

/* ─── TYPEWRITER WITH CURSOR ─── */
function Typewriter({ words, speed = 70, deleteSpeed = 35, pause = 2500 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deleteSpeed : speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);

  return (
    <span>
      {text}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: 'var(--gold)',
        marginLeft: '3px',
        animation: 'blink 1s step-end infinite',
        verticalAlign: 'text-bottom',
      }} />
    </span>
  );
}

/* ─── ORBITING TEXT RING ─── */
function OrbitingText() {
  return (
    <div className="orbit-ring" style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '550px', height: '550px',
      maxWidth: '90vw', maxHeight: '90vw',
      opacity: 0.15, pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{ animation: 'rotate 30s linear infinite' }}>
        <CurvedText
          text="  ★  FULL STACK DEVELOPER  ★  MERN & PYTHON  ★  DIGITAL ARCHITECT  ★  CREATIVE CODER  "
          radius={260}
          fontSize={10}
          color="var(--gold)"
          speed={40}
        />
      </div>
    </div>
  );
}

/* ─── HERO SECTION ─── */
export default function Hero() {
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const roles = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'Python Developer',
    'Digital Architect',
    'UI/UX Craftsman',
  ];

  // Parallax values based on mouse
  const px = (mousePos.x - 0.5) * 20;
  const py = (mousePos.y - 0.5) * 20;

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <HeroScene />

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,12,26,0.7) 100%)',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, var(--navy) 0%, transparent 100%)',
      }} />

      {/* Animated scanline sweep */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.15,
          animation: 'scanline-move 4s linear infinite',
        }} />
      </div>

      {/* Scanline texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,168,76,0.008) 2px, rgba(201,168,76,0.008) 4px)',
      }} />

      {/* Orbiting curved text */}
      <OrbitingText />

      {/* Decorative corner brackets */}
      <div className="hero-corner" style={{
        position: 'absolute', top: '100px', left: '48px', zIndex: 2,
        width: '80px', height: '80px',
        borderTop: '1px solid rgba(201,168,76,0.2)',
        borderLeft: '1px solid rgba(201,168,76,0.2)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 2s',
        transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
      }} />
      <div className="hero-corner" style={{
        position: 'absolute', bottom: '100px', right: '48px', zIndex: 2,
        width: '80px', height: '80px',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        borderRight: '1px solid rgba(201,168,76,0.2)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 2s',
        transform: `translate(${px * -0.3}px, ${py * -0.3}px)`,
      }} />

      {/* Side data readouts */}
      <div className="hero-side-text" style={{
        position: 'absolute', left: '48px', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em',
        color: 'var(--gold-dim)', textTransform: 'uppercase',
        opacity: loaded ? 0.4 : 0,
        transition: 'opacity 1s ease 2.5s',
      }}>
        SYS.PORTFOLIO — V2.0 — ACTIVE
      </div>
      <div className="hero-side-text" style={{
        position: 'absolute', right: '48px', top: '50%', transform: 'translateY(-50%) rotate(180deg)', zIndex: 2,
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em',
        color: 'var(--gold-dim)', textTransform: 'uppercase',
        opacity: loaded ? 0.4 : 0,
        transition: 'opacity 1s ease 2.5s',
      }}>
        MERN · PYTHON · DIGITAL ARCHITECT
      </div>


      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '0 24px', maxWidth: '1000px',
        transform: `translate(${px * 0.1}px, ${py * 0.1}px)`,
        transition: 'transform 0.3s ease-out',
      }}>
        {/* Eyebrow with floating badges */}
        <div style={{
          display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '28px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.5s',
        }}>
          <FloatingBadge delay={0}>NextGen Portfolio</FloatingBadge>
          <FloatingBadge delay={0.5}>Three.js · GSAP</FloatingBadge>
          <FloatingBadge delay={1}>Motion Design</FloatingBadge>
        </div>

        {/* Name — Split text reveal + Scramble */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 11vw, 130px)',
          letterSpacing: '0.06em',
          lineHeight: 0.85,
          color: 'var(--white)',
          marginBottom: '12px',
          position: 'relative',
        }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.1s ease 0.8s',
          }}>
            <SplitTextReveal text="ILAYA" delay={800} stagger={50} />
          </div>
          <div style={{
            color: 'var(--gold)',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.1s ease 1.2s',
          }}>
            <SplitTextReveal text="BHARATHI" delay={1200} stagger={45} />
          </div>
        </h1>

        {/* Decorative line */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '16px', margin: '20px 0 24px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 1.6s',
        }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-dim))' }} />
          <div style={{ width: '6px', height: '6px', border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
        </div>

        {/* Typewriter subtitle */}
        <div style={{
          fontFamily: 'var(--font-interface)',
          fontSize: 'clamp(16px, 3vw, 26px)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '20px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.6s',
        }}>
          <Typewriter words={roles} />
        </div>

        {/* Subtitle description */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 2s',
        }}>
          <TextReveal delay={2}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--muted)',
              maxWidth: '520px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}>
              Crafting immersive digital experiences with code, motion, and spatial design — from Tamil Nadu to the world.
            </p>
          </TextReveal>
        </div>

        {/* CTA Buttons — Magnetic */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 2.2s',
        }}>
          <MagneticButton
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Work →
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Me
          </MagneticButton>
        </div>

        {/* Bottom data strip */}
        <div style={{
          display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap',
          marginTop: '60px',
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 2.8s',
        }}>
          <div style={{ color: 'var(--gold-dim)' }}>
            Stack <span style={{ color: 'var(--gold)' }}>MERN · Python</span>
          </div>
          <div style={{ color: 'var(--gold-dim)' }}>
            Region <span style={{ color: 'var(--gold)' }}>Tamil Nadu</span>
          </div>
          <div style={{ color: 'var(--gold-dim)' }}>
            Status <span style={{ color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse-glow 2s ease infinite' }} />
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2, textAlign: 'center',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 3s',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '8px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: '8px',
        }}>
          Scroll to explore
        </div>
        <div style={{
          width: '16px', height: '24px',
          border: '1px solid var(--gold-dim)',
          borderRadius: '10px', margin: '0 auto',
          position: 'relative',
        }}>
          <div style={{
            width: '2px', height: '6px', background: 'var(--gold)',
            borderRadius: '1px', position: 'absolute',
            top: '4px', left: '50%', transform: 'translateX(-50%)',
            animation: 'scroll-hint 2s ease infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
