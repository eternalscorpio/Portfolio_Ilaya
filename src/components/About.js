'use client';

import { useEffect, useRef, useState } from 'react';
import { DataTerminal, HUDFrame, NeonCard, GlitchHeading, ScanDivider, TextReveal, CurvedText } from './VengeanceUI';

function HolographicRing() {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="holo-ring"
      style={{ position: 'relative', width: '100%', maxWidth: '280px', aspectRatio: '1 / 1', margin: '0 auto' }}>
      <div style={{ position: 'absolute', inset: '-40px', opacity: 0.3, animation: 'rotate 25s linear infinite', overflow: 'hidden' }}>
        <CurvedText text="  DEVELOPER · ARCHITECT · CREATOR · ENGINEER  " radius={170} fontSize={9} color="var(--gold)" speed={30} />
      </div>
      <div style={{ position: 'absolute', inset: '0', borderRadius: '50%', border: `1px solid rgba(201,168,76,${hovered ? 0.4 : 0.15})`, animation: 'rotate 12s linear infinite', transition: 'border-color 0.5s' }}>
        <div style={{ position: 'absolute', top: '-3px', left: '50%', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold-glow)' }} />
      </div>
      <div style={{ position: 'absolute', inset: '24px', borderRadius: '50%', border: `1px solid rgba(0,212,255,${hovered ? 0.3 : 0.1})`, animation: 'rotate 8s linear infinite reverse', transition: 'border-color 0.5s' }}>
        <div style={{ position: 'absolute', top: '-3px', left: '50%', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />
      </div>
      <div style={{ position: 'absolute', inset: '48px', borderRadius: '50%', border: `1px solid rgba(139,92,246,${hovered ? 0.25 : 0.08})`, animation: 'rotate 15s linear infinite', transition: 'border-color 0.5s' }}>
        <div style={{ position: 'absolute', top: '-2px', left: '50%', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--purple)' }} />
      </div>
      <div style={{ position: 'absolute', inset: '72px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,${hovered ? 0.25 : 0.12}) 0%, transparent 70%)`, animation: 'pulse-glow 3s ease infinite', transition: 'background 0.5s' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', letterSpacing: '0.1em', color: 'var(--gold)', textShadow: '0 0 30px var(--gold-glow)', lineHeight: 1 }}>IB</div>
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: '2px', height: '2px', borderRadius: '50%', background: i % 3 === 0 ? 'var(--gold)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--purple)', opacity: 0.4, transform: `rotate(${i * 36}deg) translateX(${70 + (i % 3) * 35}px)`, animation: `rotate ${8 + i * 1.5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }} />
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>

        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">02 — Digital Identity Chamber</div>
          <GlitchHeading text="ABOUT ME" size="clamp(36px, 5vw, 64px)" />
        </div>
        <ScanDivider />

        {/* About grid: ring + bio */}
        <div className="grid-about">
          <div className={`reveal-left ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <HolographicRing />
          </div>

          <div className={`reveal-right ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <TextReveal delay={0.6}>
              <div style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: 'clamp(16px, 3vw, 22px)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '20px' }}>
                Full Stack Developer — MERN &amp; Python
              </div>
            </TextReveal>
            <TextReveal delay={0.8}>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '16px' }}>
                I'm a <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Full Stack Developer</span> specialising in the{' '}
                <span style={{ color: 'var(--gold)', fontWeight: 500 }}>MERN Stack</span> and{' '}
                <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>Python</span> — turning ideas into fast, scalable, and beautifully crafted digital products. I don't just write code; I architect experiences that work at scale.
              </p>
            </TextReveal>
            <TextReveal delay={1}>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '28px' }}>
                From healthcare portals and FinTech platforms to agency systems and AI-powered tools — I've collaborated with clients across diverse industries worldwide, delivering end-to-end solutions that are technically precise and visually compelling.{' '}
                <span style={{ color: 'var(--gold)' }}>I work worldwide</span>, remotely and asynchronously, to build the web that businesses deserve.
              </p>
            </TextReveal>
            <HUDFrame label="LOCATION.DATA" color="var(--cyan)">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🌐</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '14px', color: 'var(--white)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Worldwide — Working Remotely</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em' }}>Based in Tamil Nadu, India · IST (UTC+5:30)</div>
                </div>
              </div>
            </HUDFrame>
          </div>
        </div>

        <ScanDivider color="var(--cyan)" />

        {/* Stats */}
        <div className="grid-4col" style={{ marginTop: '24px' }}>
          {[
            { label: 'Years Active', value: '3+', color: 'var(--gold)' },
            { label: 'Projects Built', value: '20+', color: 'var(--cyan)' },
            { label: 'Happy Clients', value: '15+', color: 'var(--purple)' },
            { label: 'Industries Served', value: '6+', color: 'var(--green)' },
          ].map((stat, i) => (
            <div key={i} className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${0.8 + i * 0.1}s` }}>
              <DataTerminal label={stat.label} value={stat.value} color={stat.color} icon="◆" />
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div className="grid-3col" style={{ marginTop: '48px' }}>
          {[
            { title: 'Full Stack Development', desc: 'End-to-end MERN & Next.js applications — from REST APIs to pixel-perfect UIs.', icon: '⚡', color: 'var(--gold)' },
            { title: 'Python & Automation', desc: 'Flask, FastAPI, AI agents, n8n workflows, and intelligent process automation.', icon: '🐍', color: 'var(--cyan)' },
            { title: 'Cloud & Deployment', desc: 'AWS infrastructure, CI/CD pipelines, and production-grade deployments that scale.', icon: '☁️', color: 'var(--purple)' },
          ].map((service, i) => (
            <div key={i} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${1.2 + i * 0.15}s` }}>
              <NeonCard color={service.color}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{service.icon}</div>
                <div style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '8px' }}>{service.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{service.desc}</div>
              </NeonCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
