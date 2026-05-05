'use client';

import { useEffect, useRef, useState } from 'react';
import { GlitchHeading, ScanDivider, NeonCard, DataTerminal } from './VengeanceUI';

const experiences = [
  {
    period: '2024 — Present',
    title: 'Full Stack MERN Developer',
    company: 'Divinoft Developers',
    description: 'Full stack MERN developer working on 10+ projects spanning diverse industries. Building scalable web applications, REST APIs, and end-to-end digital products for clients worldwide.',
    tech: ['MERN Stack', 'React', 'Node.js', 'MongoDB'],
    color: '#C9A84C',
    icon: '◆',
    achievements: ['10+ projects delivered', 'Multi-industry clients', 'Full lifecycle ownership'],
  },
  {
    period: '2023 — 2024',
    title: 'Freelance Full Stack Developer',
    company: 'Independent',
    description: 'Built custom web applications for clients across healthcare, finance, and business sectors. Managed full project lifecycle from requirement gathering to deployment and maintenance.',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    color: '#00D4FF',
    icon: '◇',
    achievements: ['10+ clients onboarded', 'Full lifecycle management', '99.9% uptime'],
  },
  {
    period: '2022 — 2023',
    title: 'Web Development & Python',
    company: 'Self-Initiated Projects',
    description: 'Deep-dived into MERN stack and Python ecosystems. Built multiple portfolio projects, contributed to open source, and mastered modern web development practices.',
    tech: ['Python', 'Flask', 'MERN', 'Open Source'],
    color: '#8B5CF6',
    icon: '○',
    achievements: ['5+ open source contributions', 'Flask & FastAPI mastery', 'Database design'],
  },
  {
    period: '2021 — 2022',
    title: 'Foundation & Learning',
    company: 'Computer Science Studies',
    description: 'Began the journey into software development. Studied core CS fundamentals, learned HTML/CSS/JavaScript, and started building first web pages.',
    tech: ['HTML/CSS', 'JavaScript', 'CS Fundamentals'],
    color: '#10B981',
    icon: '□',
    achievements: ['Core CS mastery', 'First web projects', 'Passion discovered'],
  },
];

const hackathons = [
  {
    event: 'NASA Space Apps Challenge',
    entries: [
      {
        award: 'Local People\'s Choice Award',
        date: 'October 2022',
        role: 'Front-end Lead',
        project: '"On the Way to the Sun"',
        tech: 'HTML, CSS, JS, Blender, Unity (VR)',
        color: '#C9A84C',
      },
      {
        award: 'Local Lead & Global Nominees',
        date: 'October 2023',
        role: '3D Animation Lead',
        project: '"Eclipses - Perspective is Everything"',
        tech: 'HTML, CSS, Three.js, Blender, Google AR Core',
        color: '#00D4FF',
      },
    ],
  },
];

const communityRoles = [
  { role: 'Android / Flutter Lead', org: 'Google Developers Student Club', period: 'Aug 2023 — Ongoing', color: '#C9A84C' },
  { role: 'Technical Lead', org: 'AURCT Tech Community', period: 'Jun 2023 — May 2024', color: '#00D4FF' },
  { role: 'Vice President', org: 'AURCT Tech Community', period: 'Jun 2022 — May 2023', color: '#8B5CF6' },
];

/* ─── CARD CONTENT ─── */
function CardContent({ experience }) {
  return (
    <div style={{ padding: '20px' }}>
      {/* Period */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        letterSpacing: '0.12em', color: experience.color,
        marginBottom: '10px', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span>{experience.icon}</span>
        {experience.period}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-interface)', fontWeight: 700,
        fontSize: 'clamp(14px, 3vw, 17px)', letterSpacing: '0.04em',
        textTransform: 'uppercase', color: 'var(--white)',
        marginBottom: '4px', lineHeight: 1.3,
      }}>
        {experience.title}
      </h3>

      {/* Company */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: 'var(--muted)', letterSpacing: '0.08em',
        marginBottom: '14px',
      }}>
        @ {experience.company}
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--muted)', fontSize: '13px',
        lineHeight: 1.7, marginBottom: '16px',
      }}>
        {experience.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {experience.tech.map((t) => (
          <span key={t} className="tag tag-gold">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── TIMELINE NODE — Responsive ─── */
function TimelineNode({ experience, index, isLast }) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  const cardStyle = {
    opacity: visible ? 1 : 0,
    transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${index * 0.15}s`,
  };

  const dot = (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
        background: visible ? experience.color : 'var(--navy-card)',
        border: `2px solid ${visible ? experience.color : 'var(--navy-border)'}`,
        boxShadow: visible ? `0 0 16px ${experience.color}50` : 'none',
        marginTop: '28px', zIndex: 2, transition: 'all 0.5s ease',
        position: 'relative',
      }}>
        {visible && (
          <div style={{
            position: 'absolute', inset: '-5px', borderRadius: '50%',
            border: `1px solid ${experience.color}30`,
            animation: 'pulse-glow 2s ease infinite',
          }} />
        )}
      </div>
      {!isLast && (
        <div style={{
          width: '1px', flex: 1, marginTop: '4px',
          background: `linear-gradient(to bottom, ${experience.color}60, var(--navy-border))`,
        }} />
      )}
    </div>
  );

  return (
    <div ref={nodeRef} style={{ marginBottom: isLast ? 0 : 32 }}>

      {/* ── DESKTOP LAYOUT (alternating left/right) ── */}
      <div className="timeline-desktop-row" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: 0,
        alignItems: 'start',
      }}>
        {/* Left cell */}
        <div style={{ paddingRight: '24px', paddingTop: '8px' }}>
          {isLeft && (
            <div style={{
              ...cardStyle,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            }}>
              <NeonCard color={experience.color}>
                <CardContent experience={experience} />
              </NeonCard>
            </div>
          )}
        </div>

        {/* Center dot + line */}
        {dot}

        {/* Right cell */}
        <div style={{ paddingLeft: '24px', paddingTop: '8px' }}>
          {!isLeft && (
            <div style={{
              ...cardStyle,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
            }}>
              <NeonCard color={experience.color}>
                <CardContent experience={experience} />
              </NeonCard>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE LAYOUT (always single column) ── */}
      <div className="timeline-mobile-row" style={{
        display: 'none',
        gridTemplateColumns: '32px 1fr',
        gap: 0,
        alignItems: 'start',
      }}>
        {/* Left: dot + line */}
        {dot}

        {/* Right: card */}
        <div style={{
          paddingLeft: '16px', paddingTop: '8px',
          ...cardStyle,
          transform: visible ? 'translateX(0)' : 'translateX(20px)',
        }}>
          <div style={{
            background: 'rgba(13,26,48,0.6)',
            border: `1px solid ${experience.color}30`,
            borderLeft: `3px solid ${experience.color}`,
          }}>
            <CardContent experience={experience} />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─── EXPERIENCE SECTION ─── */
export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className={`reveal ${visible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>05 — Timeline Vortex</div>
          <GlitchHeading text="EXPERIENCE" size="clamp(36px, 5vw, 64px)" />
          <ScanDivider />
          <p className="section-desc" style={{ margin: '0 auto' }}>
            A journey from curiosity to craftsmanship — building digital solutions for clients across industries, worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid-3col-stats" style={{ marginBottom: '48px' }}>
          {[
            { label: 'Career Span', value: '3Y+', color: 'var(--gold)', icon: '◆' },
            { label: 'Roles Held', value: '4', color: 'var(--cyan)', icon: '◇' },
            { label: 'Technologies', value: '15+', color: 'var(--purple)', icon: '○' },
          ].map((stat, i) => (
            <div key={i} className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
              <DataTerminal label={stat.label} value={stat.value} color={stat.color} icon={stat.icon} />
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {experiences.map((exp, index) => (
            <TimelineNode
              key={index}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Hackathons */}
        <div style={{ marginTop: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Hackathons</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 40px)', letterSpacing: '0.06em', color: 'var(--white)' }}>NASA SPACE APPS CHALLENGE</div>
          </div>
          <div className="grid-hackathon">
            {hackathons[0].entries.map((entry, i) => (
              <div key={i} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${0.3 + i * 0.2}s` }}>
                <div style={{ position: 'relative', background: 'rgba(13, 26, 48, 0.5)', border: `1px solid ${entry.color}30`, padding: '24px', backdropFilter: 'blur(12px)', height: '100%' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${entry.color}, transparent)` }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: entry.color, marginBottom: '10px', textTransform: 'uppercase' }}>🏆 {entry.award}</div>
                  <div style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: 'clamp(12px, 2vw, 14px)', color: 'var(--white)', marginBottom: '6px', letterSpacing: '0.04em' }}>{entry.project}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginBottom: '12px' }}>{entry.role} · {entry.date}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>{entry.tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Roles */}
        <div style={{ marginTop: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Community & Leadership</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {communityRoles.map((role, i) => (
              <div key={i} className={`reveal-scale ${visible ? 'visible' : ''}`}
                style={{
                  transitionDelay: `${0.2 + i * 0.15}s`,
                  flex: '1', minWidth: '200px', maxWidth: '340px',
                  background: 'rgba(13,26,48,0.5)',
                  border: `1px solid ${role.color}25`,
                  padding: '20px 24px', position: 'relative',
                }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${role.color}60, transparent)` }} />
                <div style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '13px', color: 'var(--white)', marginBottom: '4px' }}>{role.role}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: role.color, marginBottom: '4px' }}>{role.org}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>{role.period}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .timeline-desktop-row { display: grid; }
        .timeline-mobile-row { display: none !important; }

        @media (max-width: 768px) {
          .timeline-desktop-row { display: none !important; }
          .timeline-mobile-row { display: grid !important; }
          .grid-3col-stats { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .grid-3col-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
