'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={(e) => scrollToSection(e, 'hero')}>
        ILAYA<span>BHARATHI</span>
      </a>
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
      <button className="nav-menu-btn" aria-label="Menu">
        ☰ MENU
      </button>
    </nav>
  );
}
