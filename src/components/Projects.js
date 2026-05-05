'use client';

import { useEffect, useRef, useState } from 'react';
import { GlitchHeading, ScanDivider, HUDFrame, TextReveal, MagneticButton } from './VengeanceUI';

const projects = [
  {
    id: 1,
    name: 'Divinoft Developers',
    subtitle: 'Agency Platform',
    description: 'Custom Development Agency Platform — A full-service digital agency delivering web solutions, mobile apps, and enterprise software for clients across various industries.',
    tech: ['MERN', 'React', 'Node.js', 'MongoDB'],
    color: '#C9A84C',
    category: 'AGENCY',
    url: 'https://divinoft.com',
    stats: { users: '500+', pages: '12', uptime: '99.9%' },
  },
  {
    id: 2,
    name: 'Preethika Psychology Wellness',
    subtitle: 'Wellness Portal',
    description: 'Psychology & Wellness Portal — A comprehensive mental health platform with appointment booking, resource library, and therapist profiles built with modern Next.js.',
    tech: ['Next.js', 'SEO', 'CMS', 'Responsive'],
    color: '#00D4FF',
    category: 'HEALTHCARE',
    url: 'https://preethikapsychologywellness.com',
    stats: { users: '1K+', pages: '8', uptime: '99.9%' },
  },
  {
    id: 3,
    name: 'Accountique',
    subtitle: 'Accounting Training Institute',
    description: 'Accounting Training Institute website — A professional platform for an institute offering accounting courses, GST training, and financial education programs.',
    tech: ['Next.js', 'SEO', 'CMS', 'Education'],
    color: '#8B5CF6',
    category: 'EDTECH',
    url: 'https://accountique.in',
    stats: { users: '200+', courses: '10+', uptime: '99.5%' },
  },
  {
    id: 4,
    name: 'SVS DigiCorp',
    subtitle: 'Digital Services Hub',
    description: 'End-to-end digital services platform — government registrations, business compliance, and digital solutions for individuals and enterprises.',
    tech: ['MERN', 'Portal', 'Services', 'Compliance'],
    color: '#10B981',
    category: 'SERVICES',
    url: 'https://svsdigicorp.com',
    stats: { users: '300+', services: '10+', regions: 'India' },
  },
  {
    id: 5,
    name: 'SVS Digisign',
    subtitle: 'DSC & USB Token Store',
    description: 'Authorised DSC distributor and USB token seller — offering ICEGATE, APEDA, e-tender, e-auction, Trademark, ADcode Registration, IREPS, and many more services.',
    tech: ['DSC', 'USB Token', 'GovTech', 'Portal'],
    color: '#FF6B6B',
    category: 'GOVTECH',
    url: 'https://svsdigisign.com',
    stats: { clients: '500+', services: '10+', certs: '1K+' },
  },
];

/* ─── 3D IMMERSIVE PROJECT CARD ─── */
function ImmersiveCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const glareRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -20,
      y: (x - 0.5) * 20,
    });
    // Glare position
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.06) 0%, transparent 50%)`;
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{
        perspective: '1200px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(80px)',
        transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.2}s`,
      }}
    >
      <div style={{
        position: 'relative',
        background: 'rgba(13, 26, 48, 0.5)',
        border: `1px solid ${hovered ? project.color + '60' : 'var(--navy-border)'}`,
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
        transition: hovered
          ? 'border-color 0.4s, transform 0.1s ease-out, box-shadow 0.4s'
          : 'border-color 0.4s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s',
        boxShadow: hovered
          ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}20`
          : '0 8px 32px rgba(0,0,0,0.2)',
        cursor: 'none',
        transformStyle: 'preserve-3d',
      }}>
        {/* Top neon line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }} />

        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: `2px solid ${project.color}`, borderLeft: `2px solid ${project.color}`, opacity: hovered ? 0.8 : 0.2, transition: 'opacity 0.4s' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: `2px solid ${project.color}`, borderRight: `2px solid ${project.color}`, opacity: hovered ? 0.8 : 0.2, transition: 'opacity 0.4s' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: `2px solid ${project.color}`, borderLeft: `2px solid ${project.color}`, opacity: hovered ? 0.8 : 0.2, transition: 'opacity 0.4s' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: `2px solid ${project.color}`, borderRight: `2px solid ${project.color}`, opacity: hovered ? 0.8 : 0.2, transition: 'opacity 0.4s' }} />

        {/* Glare / light effect */}
        <div ref={glareRef} style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,76,0.008) 3px, rgba(201,168,76,0.008) 6px)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Project number watermark */}
        <div style={{
          position: 'absolute', top: '20px', right: '24px',
          fontFamily: 'var(--font-display)', fontSize: '90px',
          color: `${project.color}06`, lineHeight: 1,
          pointerEvents: 'none', zIndex: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, padding: '32px' }}>
          {/* Category + status row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '20px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '4px 12px', border: `1px solid ${project.color}40`,
              color: project.color,
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '8px',
              letterSpacing: '0.1em', color: 'var(--green)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{
                width: '4px', height: '4px', borderRadius: '50%',
                background: 'var(--green)', display: 'inline-block',
              }} />
              LIVE
            </span>
          </div>

          {/* Project name */}
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '32px',
            letterSpacing: '0.04em', color: 'var(--white)',
            marginBottom: '2px', lineHeight: 1.1,
          }}>
            {project.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-interface)', fontSize: '14px',
            color: project.color, letterSpacing: '0.06em',
            textTransform: 'uppercase', fontWeight: 600,
            marginBottom: '16px', opacity: 0.8,
          }}>
            {project.subtitle}
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--muted)', fontSize: '13.5px',
            lineHeight: 1.7, marginBottom: '20px',
          }}>
            {project.description}
          </p>

          {/* Mini stats */}
          <div style={{
            display: 'flex', gap: '16px', marginBottom: '20px',
            padding: '12px 16px',
            background: 'rgba(5, 12, 26, 0.5)',
            border: '1px solid var(--navy-border)',
          }}>
            {Object.entries(project.stats).map(([key, val]) => (
              <div key={key} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '20px',
                  color: project.color, lineHeight: 1,
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '8px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginTop: '2px',
                }}>
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '3px 10px',
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
                color: project.color,
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {project.url !== '#' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: project.color, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'opacity 0.3s',
                }}
              >
                <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s', display: 'inline-block' }}>↗ LIVE SITE</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS SECTION ─── */
export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">04 — Featured Arsenal</div>
          <GlitchHeading text="PROJECTS" size="clamp(36px, 5vw, 64px)" />
          <p className="section-desc" style={{ marginTop: '12px' }}>
            A curated showcase of live productions — each project represents a complete
            solution from concept → design → development → deployment.
          </p>
        </div>

        <ScanDivider />

        {/* Project grid — Staggered masonry-like */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                marginTop: index % 2 === 1 ? '48px' : '0',
              }}
            >
              <ImmersiveCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center', marginTop: '64px',
        }}>
          <TextReveal delay={0.5}>
            <HUDFrame label="SYS.STATUS" color="var(--gold)">
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.12em', color: 'var(--muted)',
                  marginBottom: '12px',
                }}>
                  MORE PROJECTS IN DEVELOPMENT — LOOKING FOR YOUR NEXT ONE?
                </div>
                <MagneticButton
                  href="#contact"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start a Project →
                </MagneticButton>
              </div>
            </HUDFrame>
          </TextReveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="marginTop: index"] {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
