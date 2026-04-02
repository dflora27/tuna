import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/Bahtiyar TUNA Logo_2-07.png';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* TOP ROW */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Bahtiyar Tuna" className="footer-logo" />
            <p className="footer-desc">{t('footer.desc')}</p>
            <div className="footer-social-inline">
              <a href="https://instagram.com/bahtiyartunamobilya" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4 className="footer-col-label">{t('footer.navTitle')}</h4>
              <ul>
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/about">{t('nav.about')}</Link></li>
                <li><Link to="/projects">{t('nav.projects')}</Link></li>
                <li><Link to="/contact">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-label">{t('footer.contactTitle')}</h4>
              <ul>
                <li><a href="mailto:info@bahtiyartuna.com">info@bahtiyartuna.com</a></li>
                <li><a href="tel:+905543806327">+90 554 380 63 27</a></li>
                <li>Seyhan Mah. 630/3 Sk. No:3/1<br />İzmir, Türkiye</li>
              </ul>
            </div>



            <div className="footer-col">
              <h4 className="footer-col-label">ÇALIŞMA SAATLERİ</h4>
              <ul className="footer-hours">
                <li>Pazartesi: 08:00 - 18:30</li>
                <li>Salı: 08:00 - 18:30</li>
                <li>Çarşamba: 08:00 - 18:30</li>
                <li>Perşembe: 08:00 - 18:30</li>
                <li>Cuma: 08:00 - 18:30</li>
                <li>Cumartesi: 08:00 - 13:00</li>
                <li className="off-day">Pazar: Kapalı</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="footer-legal-links">
            <a href="#">{t('footer.privacy')}</a>
            <span>·</span>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
