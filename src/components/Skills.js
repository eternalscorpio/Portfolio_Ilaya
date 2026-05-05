'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { GlitchHeading, ScanDivider, HUDFrame, NeonCard, DataTerminal, TextReveal } from './VengeanceUI';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'var(--gold)',
    colorHex: '#C9A84C',
    barClass: 'skill-bar-gold',
    icon: '◆',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Next.js', level: 88 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'Responsive Design', level: 93 },
    ],
  },
  {
    name: 'Backend',
    color: 'var(--cyan)',
    colorHex: '#00D4FF',
    barClass: 'skill-bar-cyan',
    icon: '◇',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'Python / Flask', level: 82 },
      { name: 'FastAPI', level: 78 },
      { name: 'MongoDB', level: 86 },
    ],
  },
  {
    name: 'Tools & Services',
    color: 'var(--purple)',
    colorHex: '#8B5CF6',
    barClass: 'skill-bar-purple',
    icon: '○',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'WordPress', level: 85 },
      { name: 'Canva', level: 90 },
      { name: 'SEO & Analytics', level: 82 },
    ],
  },
];

const allSkillTags = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Flask', 'FastAPI',
  'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Git', 'SEO', 'REST API',
  'AWS', 'WordPress', 'Canva', 'Meta Ads', 'AI Agents', 'n8n', 'PostgreSQL',
  'WhatsApp API', 'TypeScript', 'Docker',
];

/* ─── ROTATING TAG SPHERE ─── */
function TagSphere() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);

  useEffect(() => {
    let frameId;
    const animate = () => {
      if (!hoverPause) setRotation((prev) => prev + 0.15);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hoverPause]);

  const tags = useMemo(() => {
    return allSkillTags.map((tag, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkillTags.length);
      const theta = Math.sqrt(allSkillTags.length * Math.PI) * phi;
      return { tag, phi, theta };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      style={{
        position: 'relative',
        width: '350px',
        height: '350px',
        margin: '0 auto',
      }}
    >
      {/* Glow ring behind sphere */}
      <div style={{
        position: 'absolute', inset: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.06)',
        boxShadow: '0 0 40px rgba(201,168,76,0.03)',
      }} />
      <div style={{
        position: 'absolute', inset: '70px',
        borderRadius: '50%',
        border: '1px dashed rgba(0,212,255,0.05)',
      }} />

      {tags.map(({ tag, phi, theta }, i) => {
        const radius = 150;
        const rotRad = (rotation + i * 0.15) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta + rotRad);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta + rotRad);
        const scale = (z + radius) / (2 * radius);
        const opacity = Math.max(0.15, scale);

        const colors = ['var(--gold)', 'var(--cyan)', 'var(--purple)', 'var(--green)'];

        return (
          <div
            key={tag}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
              fontFamily: 'var(--font-mono)',
              fontSize: `${8 + scale * 4}px`,
              letterSpacing: '0.06em',
              color: colors[i % colors.length],
              opacity,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s, font-size 0.3s',
              pointerEvents: 'none',
              textTransform: 'uppercase',
              fontWeight: scale > 0.6 ? 700 : 400,
              textShadow: scale > 0.7 ? `0 0 8px ${colors[i % colors.length]}40` : 'none',
            }}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
}

/* ─── SKILL BAR (VengeanceUI Style) ─── */
function SkillBar({ name, level, color, colorHex, delay = 0 }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setAnimated(true), delay);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '5px',
      }}>
        <span style={{
          fontFamily: 'var(--font-interface)', fontWeight: 600,
          fontSize: '12px', letterSpacing: '0.04em',
          textTransform: 'uppercase', color: 'var(--white)',
        }}>
          {name}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: animated ? color : 'var(--muted)',
          transition: 'color 0.5s',
        }}>
          {level}%
        </span>
      </div>
      <div style={{
        width: '100%', height: '3px',
        background: 'var(--navy-border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: animated ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${colorHex}60, ${colorHex})`,
          transition: `width 1.5s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
          position: 'relative',
        }}>
          {/* Glow tip */}
          <div style={{
            position: 'absolute', right: '-3px', top: '-3px',
            width: '9px', height: '9px', borderRadius: '50%',
            background: colorHex,
            boxShadow: `0 0 10px ${colorHex}80`,
            opacity: animated ? 1 : 0,
            transition: `opacity 0.3s ease ${delay + 1500}ms`,
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SKILLS SECTION ─── */
export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.08 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">03 — Tech Constellation</div>
          <GlitchHeading text="SKILLS & EXPERTISE" size="clamp(36px, 5vw, 64px)" />
          <ScanDivider />
          <p className="section-desc">
            A full-spectrum technology arsenal — from frontend frameworks to backend systems,
            cloud infrastructure, AI automation, and modern no-code/low-code tools.
          </p>
        </div>

        {/* Data terminal header */}
        <div className="grid-4col skills-terminals" style={{ marginBottom: '48px' }}>
          <div className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <DataTerminal label="Technologies" value="15+" color="var(--gold)" icon="◆" />
          </div>
          <div className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <DataTerminal label="Frameworks" value="6" color="var(--cyan)" icon="◇" />
          </div>
          <div className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <DataTerminal label="Services" value="7" color="var(--purple)" icon="○" />
          </div>
          <div className={`reveal-scale ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <DataTerminal label="Partnerships" value="3" color="var(--green)" icon="□" />
          </div>
        </div>

        <div className="grid-2col">
          {/* Tag Sphere */}
          <div className={`reveal-scale ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}>
            <HUDFrame label="SKILL.SPHERE" color="var(--gold)">
              <TagSphere />
            </HUDFrame>
          </div>

          {/* Skill Bars */}
          <div className={`reveal-right ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}>
            {skillCategories.map((category, catIdx) => (
              <div key={category.name} style={{ marginBottom: '28px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: category.color, marginBottom: '14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span>{category.icon}</span>
                  {category.name}
                  <span style={{
                    flex: '0 0 32px', height: '1px',
                    background: 'var(--navy-border)',
                  }} />
                </div>
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    colorHex={category.colorHex}
                    delay={(catIdx * 5 + skillIdx) * 80}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
