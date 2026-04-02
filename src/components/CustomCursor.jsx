import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [largeHovered, setLargeHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if(isMobile) return; 

    // Inject cursor:none into body immediately
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const isProject = e.target.closest('.project-card');
      const isGallery = e.target.closest('.pd-gallery-img-wrap');
      
      if (isProject) {
        setLargeHovered(true);
        setCursorText("");
        setHovered(false);
      } else if (isGallery) {
        setLargeHovered(true);
        setCursorText("");
        setHovered(false);
      } else if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') || 
        e.target.closest('button') ||
        e.target.closest('.interactive')
      ) {
        setHovered(true);
        setLargeHovered(false);
        setCursorText("");
      } else {
        setHovered(false);
        setLargeHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render cursor div on mobile to save performance and avoid issues
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return null;

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
        <div className="cursor-text">{cursorText}</div>
      </motion.div>
    </>
  );
};
export default CustomCursor;
