import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../assets/Bahtiyar TUNA Logo_2-07.png';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling strictly while preloader is active
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        onComplete();
        document.body.style.overflow = '';
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="preloader"
      initial={{ y: 0 }}
      animate={{ y: loading ? 0 : '-100vh' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img 
        src={logo} 
        alt="Loader" 
        className="preloader-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: loading ? 1 : 0, scale: loading ? 1 : 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Preloader;
