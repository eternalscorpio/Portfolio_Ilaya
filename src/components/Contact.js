'use client';

import { useEffect, useRef, useState } from 'react';
import { GlitchHeading, ScanDivider, HUDFrame, NeonCard, TextReveal, MagneticButton, CurvedText } from './VengeanceUI';

/* ─── TERMINAL CONTACT FORM (Enhanced) ─── */
function TerminalForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [typedChars, setTypedChars] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          ...formData,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
          setCharCount(0);
          setTypedChars(0);
        }, 3000);
      } else {
        console.error("Form submission failed:", result);
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTypedChars((prev) => prev + 1);
    if (field === 'message') setCharCount(value.length);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(5, 12, 26, 0.9)',
    border: `1px solid ${focusedField === field ? 'var(--gold-dim)' : 'var(--navy-border)'}`,
    color: 'var(--white)',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    letterSpacing: '0.03em',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focusedField === field
      ? '0 0 20px rgba(201, 168, 76, 0.05), inset 0 0 20px rgba(201, 168, 76, 0.02)'
      : 'none',
    cursor: 'none',
  });

  return (
    <div style={{
      position: 'relative',
      background: 'rgba(13, 26, 48, 0.5)',
      border: '1px solid var(--navy-border)',
      overflow: 'hidden',
    }}>
      {/* Terminal header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 20px',
        background: 'rgba(5, 12, 26, 0.8)',
        borderBottom: '1px solid var(--navy-border)',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--coral)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--muted)', letterSpacing: '0.08em',
          marginLeft: '8px',
        }}>
          transmission_terminal v2.0
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--gold-dim)', letterSpacing: '0.06em',
          }}>
            CHARS: {typedChars}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--green)', letterSpacing: '0.06em',
          }}>
            STATUS: {submitted ? 'SENT ✓' : 'READY'}
          </span>
        </div>
      </div>

      {/* Scanlines */}
      <div style={{
        position: 'absolute', top: '40px', left: 0, right: 0, bottom: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,76,0.008) 3px, rgba(201,168,76,0.008) 6px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '28px', position: 'relative', zIndex: 1 }}>
        {/* System prompt */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--gold-dim)', letterSpacing: '0.08em',
          marginBottom: '20px',
        }}>
          {'>'} INITIATING SECURE TRANSMISSION CHANNEL...
          <br />
          {'>'} ENCRYPTION: <span style={{ color: 'var(--green)' }}>ACTIVE</span>
          <br />
          {'>'} ENTER YOUR DETAILS BELOW:
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: focusedField === 'name' ? 'var(--gold)' : 'var(--muted)',
            marginBottom: '6px', display: 'block',
            transition: 'color 0.3s',
          }}>
            {'>'} IDENT.NAME
          </label>
          <input
            type="text" placeholder="your_name" required
            style={inputStyle('name')}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: focusedField === 'email' ? 'var(--gold)' : 'var(--muted)',
            marginBottom: '6px', display: 'block',
            transition: 'color 0.3s',
          }}>
            {'>'} COMMS.EMAIL
          </label>
          <input
            type="email" placeholder="you@domain.com" required
            style={inputStyle('email')}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: focusedField === 'message' ? 'var(--gold)' : 'var(--muted)',
              transition: 'color 0.3s',
            }}>
              {'>'} MSG.PAYLOAD
            </label>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              color: charCount > 400 ? 'var(--coral)' : 'var(--muted)',
              letterSpacing: '0.06em',
            }}>
              [{charCount}/500]
            </span>
          </div>
          <textarea
            placeholder="describe_your_project..." required
            rows={5} maxLength={500}
            style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '100px' }}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{
            width: '100%', justifyContent: 'center', padding: '16px',
            fontFamily: 'var(--font-mono)',
            border: submitted ? '1px solid var(--green)' : undefined,
            color: submitted ? 'var(--green)' : undefined,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'wait' : 'pointer'
          }}
        >
          {submitted ? '◆ TRANSMISSION SUCCESSFUL' : isSubmitting ? '◆ TRANSMITTING...' : '◆ SEND TRANSMISSION →'}
        </button>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: 'var(--gold-dim)', letterSpacing: '0.06em',
          marginTop: '12px', textAlign: 'center',
        }}>
          {'>'} RESPONSE TIME: {'<'}24H · ENCRYPTION: E2E · PROTOCOL: SECURE
        </div>
      </form>
    </div>
  );
}

/* ─── CONTACT INFO PANEL ─── */
function ContactInfoPanel() {
  const contacts = [
    { icon: '◆', label: 'Email', value: 'ilayabharathi.dev@gmail.com', href: 'mailto:ilayabharathi.dev@gmail.com', color: 'var(--gold)' },
    { icon: '◇', label: 'Phone', value: '+91 6381467923', href: 'tel:+916381467923', color: 'var(--cyan)' },
    { icon: '○', label: 'Location', value: 'Tamil Nadu, India · Worldwide', href: null, color: 'var(--green)' },
    { icon: '□', label: 'LinkedIn', value: 'linkedin.com/in/ilayabharathi-murugan', href: 'https://www.linkedin.com/in/ilayabharathi-murugan/', color: 'var(--purple)' },
    { icon: '△', label: 'GitHub', value: 'github.com/eternalscorpio', href: 'https://github.com/eternalscorpio', color: 'var(--muted)' },
    { icon: '▶', label: 'Instagram', value: '@eternal_scorpio', href: 'https://www.instagram.com/eternal_scorpio', color: 'var(--coral)' },
  ];

  return (
    <div>
      {/* Curved text decoration */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        marginBottom: '24px', opacity: 0.2,
      }}>
        <div style={{ animation: 'rotate 20s linear infinite reverse' }}>
          <CurvedText
            text="  ● GET IN TOUCH ● COLLABORATE ● BUILD ● CREATE ● CONNECT  "
            radius={100}
            fontSize={8}
            color="var(--gold)"
            speed={25}
          />
        </div>
      </div>

      {/* Contact cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {contacts.map((contact, i) => (
          <NeonCard key={contact.label} color={contact.color} glowIntensity={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${contact.color}30`, fontFamily: 'var(--font-mono)', fontSize: '14px', color: contact.color }}>
                {contact.icon}
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: contact.color, marginBottom: '2px' }}>
                  {contact.label}
                </div>
                {contact.href ? (
                  <a href={contact.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--white)', textDecoration: 'none', wordBreak: 'break-all' }}>
                    {contact.value}
                  </a>
                ) : (
                  <div style={{ fontSize: '13px', color: 'var(--white)' }}>{contact.value}</div>
                )}
              </div>
            </div>
          </NeonCard>
        ))}
      </div>

      {/* Availability HUD */}
      <HUDFrame label="STATUS.CHECK" color="var(--green)" className="" >
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', marginBottom: '10px',
          }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 12px rgba(16,185,129,0.5)',
              animation: 'pulse-glow 2s ease infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--green)', fontWeight: 700,
            }}>
              AVAILABLE FOR PROJECTS
            </span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--muted)', letterSpacing: '0.06em',
          }}>
            Open for freelance · Partnerships · Full-time
          </div>
        </div>
      </HUDFrame>
    </div>
  );
}

/* ─── CONTACT SECTION ─── */
export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">06 — Transmission Terminal</div>
          <GlitchHeading text="GET IN TOUCH" size="clamp(36px, 5vw, 64px)" />
          <ScanDivider />
          <p className="section-desc">
            Have a project in mind? Ready to build something great together?
            Open a channel — I respond within 24 hours.
          </p>
        </div>

        <div className="grid-contact">
          <div className={`reveal-left ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <TerminalForm />
          </div>
          <div className={`reveal-right ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <ContactInfoPanel />
          </div>
        </div>
      </div>


    </section>
  );
}
