'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Don't show on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      trail.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add('hovering');
      trail.classList.add('hovering');
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove('hovering');
      trail.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMouseMove);
    animateTrail();

    // Watch for interactive elements
    const interactiveSelector = 'a, button, .glass-card, .project-card, .btn-primary, .btn-secondary, [data-cursor-hover]';
    
    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    addListeners();

    // Re-add on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}
