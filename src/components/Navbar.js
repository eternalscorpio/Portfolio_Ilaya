'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const sections = [
    { id: 'hero', label: '01 Home' },
    { id: 'about', label: '02 About' },
    { id: 'skills', label: '03 Skills' },
    { id: 'projects', label: '04 Projects' },
    { id: 'experience', label: '05 Experience' },
    { id: 'contact', label: '06 Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={(e) => scrollToSection(e, 'hero')}>
          ILAYA<span>BHARATHI</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                style={activeSection === id ? { color: 'var(--gold)' } : {}}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-menu-btn"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          ☰ MENU
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <button
          className="nav-drawer-close"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          ✕ CLOSE
        </button>

        {/* Decorative line */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1px', height: '60%',
          background: 'linear-gradient(to bottom, transparent, var(--gold-dim), transparent)',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        {sections.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'active' : ''}
            onClick={(e) => scrollToSection(e, id)}
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
            }}
          >
            {label}
          </a>
        ))}

        <div style={{
          position: 'absolute', bottom: '40px',
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          letterSpacing: '0.15em', color: 'var(--gold-dim)',
          textTransform: 'uppercase',
        }}>
          ILAYABHARATHI · MERN · PYTHON
        </div>
      </div>
    </>
  );
}
