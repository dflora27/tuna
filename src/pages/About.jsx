import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import bgVideo from '../assets/1220.mp4';
import logo from '../assets/Bahtiyar TUNA Logo_2-07.png';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  // Ensure theme is dark for the video background
  useEffect(() => {
    document.body.classList.remove('theme-light');
  }, []);

  return (
    <PageTransition className="about-page">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="about-bg-video"
        src={bgVideo}
      ></video>
      <div className="about-bg-overlay"></div>

      <div className="about-container container">

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="about-content"
        >
          <div className="about-text-wrapper">
            <img src={logo} alt="Bahtiyar Tuna Logo" className="about-center-logo" />
            <h2 className="about-subtitle">{t('about.title')}</h2>
            <p className="about-highlight">
              {t('about.highlight')}
            </p>

            <p className="about-paragraph">
              {t('about.p1')}
            </p>

            <p className="about-paragraph">
              {t('about.p2')}
            </p>
          </div>

          <div className="about-process">
            <span>{t('about.process.discovery')}</span>
            <span className="separator"></span>
            <span>{t('about.process.concept')}</span>
            <span className="separator"></span>
            <span>{t('about.process.project')}</span>
            <span className="separator"></span>
            <span>{t('about.process.prototype')}</span>
            <span className="separator"></span>
            <span>{t('about.process.production')}</span>
            <span className="separator"></span>
            <span>{t('about.process.assembly')}</span>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
};

export default About;
