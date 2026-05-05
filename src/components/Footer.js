'use client';

import { CurvedText, ScanDivider } from './VengeanceUI';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--navy-2)',
      borderTop: '1px solid var(--navy-border)',
      padding: '64px 48px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grid-bg" style={{ opacity: 0.2 }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,76,0.005) 3px, rgba(201,168,76,0.005) 6px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
      }}>
        {/* Top section */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px',
          marginBottom: '32px',
        }}>
          {/* Left — Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '32px',
              letterSpacing: '0.06em', lineHeight: 1,
              marginBottom: '8px',
            }}>
              <span style={{ color: 'var(--gold)' }}>ILAYA</span>
              <span style={{ color: 'var(--white)' }}>BHARATHI</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--muted)', letterSpacing: '0.1em',
            }}>
              Full Stack Developer — MERN & Python
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              color: 'var(--gold-dim)', letterSpacing: '0.08em',
              marginTop: '4px',
            }}>
              Tamil Nadu, India · Remote Worldwide
            </div>
          </div>

          {/* Center — Quick Links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'color 0.3s', cursor: 'none',
                  position: 'relative',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — Tech */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              color: 'var(--muted)', letterSpacing: '0.08em',
              marginBottom: '8px',
            }}>
              BUILT WITH
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {['Three.js', 'Next.js', 'React', 'GSAP'].map((tech) => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 8px',
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  color: 'var(--gold)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ScanDivider />

        {/* Bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--gold-dim)', letterSpacing: '0.1em',
          }}>
            © {currentYear} ILAYABHARATHI · ALL RIGHTS RESERVED
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { name: 'GitHub', icon: '◆' },
              { name: 'LinkedIn', icon: '◇' },
              { name: 'Twitter', icon: '○' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'color 0.3s', cursor: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
              >
                <span style={{ fontSize: '8px' }}>{social.icon}</span>
                {social.name}
              </a>
            ))}
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--gold-dim)', letterSpacing: '0.06em',
          }}>
            NEXTGEN 3D PORTFOLIO · v2.0
          </div>
        </div>
      </div>
    </footer>
  );
}
