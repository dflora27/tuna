import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import './Home.css';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/Bahtiyar TUNA Logo_2-07.png';
import heroVideo from '../assets/kitchen_lights_hero_infinite_loop.mp4';

const Home = () => {
  const { t } = useLanguage();
  // Ensure theme is dark
  useEffect(() => {
    document.body.classList.remove('theme-light');
  }, []);

  return (
    <PageTransition className="home-page">
      <div className="hero-section">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
          src={heroVideo}
        ></video>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={logo} 
            alt="Bahtiyar Tuna BT Logo" 
            className="hero-center-logo" 
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-titles"
          >
            <h1 className="hero-title">BAHTİYAR TUNA</h1>
            <p className="hero-subtitle">{t('home.title')}</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="scroll-indicator-container"
        >
          <div className="scroll-indicator-bar">
            <div className="scroll-indicator-progress"></div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
