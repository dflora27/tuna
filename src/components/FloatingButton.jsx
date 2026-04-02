import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './FloatingButton.css';

const FloatingButton = () => {
  const [isLifted, setIsLifted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const distFromBottom = totalHeight - (scrollY + clientHeight);
      
      // If within 180px of bottom, lift the button
      if (distFromBottom < 180) {
        setIsLifted(true);
      } else {
        setIsLifted(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link to="/contact" className={`floating-button ${isLifted ? 'lifted' : ''}`}>
      PROJE TALEBİ
    </Link>
  );
};

export default FloatingButton;
