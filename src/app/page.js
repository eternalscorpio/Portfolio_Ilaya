'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';

// Lazy-load below-fold sections for faster LCP
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Experience = dynamic(() => import('@/components/Experience'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <div className="section-divider" />
        <About />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Experience />

        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
