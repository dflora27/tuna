import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/Bahtiyar TUNA Logo_2-07.png';
import './Navbar.css';

const Navbar = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  
  // We no longer have any "light" pages right now (projects is now dark, about is dark)
  const isLightPage = false;
  // Pages that need a solid navbar immediately
  const needsSolidBg = location.pathname === '/projects' || location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = [
    'navbar',
    (scrolled || needsSolidBg) ? 'scrolled' : '',
    isLightPage ? 'on-light-page' : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={navClass}>
      <div className="navbar-container container">
        {/* Logo */}
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={logo} alt="Bahtiyar Tuna Logo" className="logo-img" />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.projects')}
          </NavLink>
          <NavLink to="/applications" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.applications')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.contact')}
          </NavLink>
        </nav>

        {/* Right Section: Language Toggle, Social & Hamburger */}
        <div className="navbar-actions">
          <div className="language-toggle">
            <button 
              className={`lang-btn ${lang === 'tr' ? 'active' : ''}`}
              onClick={() => toggleLanguage('tr')}
            >TR</button>
            <span className="lang-sep">/</span>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => toggleLanguage('en')}
            >EN</button>
          </div>
          <a href="https://instagram.com/bahtiyartunamobilya" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
          <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
