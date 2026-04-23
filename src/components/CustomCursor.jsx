import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const detectTouchDevice = () => {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return true;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [largeHovered, setLargeHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Detect touch in an effect so SSR / hydration / StrictMode is happy.
  useEffect(() => {
    setIsTouch(detectTouchDevice());
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      const isProject = t.closest && t.closest('.project-card');
      const isGallery = t.closest && t.closest('.pd-gallery-img-wrap');

      if (isProject || isGallery) {
        setLargeHovered(true);
        setHovered(false);
        return;
      }

      const tag = t.tagName ? t.tagName.toLowerCase() : '';
      const isInteractive =
        tag === 'a' ||
        tag === 'button' ||
        (t.closest && (t.closest('a') || t.closest('button') || t.closest('.interactive')));

      setHovered(Boolean(isInteractive));
      setLargeHovered(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className={`custom-cursor-dot ${largeHovered ? 'large-hovered' : ''}`}
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className={`custom-cursor-ring ${hovered ? 'hovered' : ''} ${largeHovered ? 'large-hovered' : ''}`}
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="cursor-text"></div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
