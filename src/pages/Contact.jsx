import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.classList.remove('theme-light');
  }, []);

  return (
    <PageTransition className="contact-page">

      {/* ── TOP SECTION: info and image ── */}
      <div className="contact-top-section">
        <div className="contact-left">
          <motion.div
            className="contact-left-inner"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact-eyebrow">İLETİŞİM</span>
            <h1 className="contact-heading">
              Birlikte<br />Harika Şeyler<br />Yaratalım.
            </h1>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-label">E-Posta</span>
                <a href="mailto:info@bahtiyartuna.com" className="contact-info-value">
                  info@bahtiyartuna.com
                </a>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">Telefon</span>
                <a href="tel:+905543806327" className="contact-info-value">
                  +90 554 380 63 27
                </a>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">Adres</span>
                <span className="contact-info-value">
                  Seyhan Mah. 630/3 Sk. No:3/1<br />
                  İzmir, Türkiye
                </span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">Sosyal</span>
                <a
                  href="https://instagram.com/bahtiyartunamobilya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                >
                  @bahtiyartunamobilya
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL (Image Area) ── */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-image-placeholder" style={{ padding: 0 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.8797407725883!2d27.136157677219874!3d38.37490337736205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbdf2f7ce592ab%3A0x428ea58422ff7221!2sTuna%20Mobilya!5e0!3m2!1str!2str!4v1775140474492!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, display: 'block', filter: 'grayscale(100%) opacity(80%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM SECTION: form ── */}
      <div className="contact-bottom-section">
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="contact-form-title">{lang === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">{lang === 'tr' ? 'Adınız Soyadınız' : 'Full Name'}</label>
              <input type="text" id="name" placeholder={lang === 'tr' ? 'Aylin Yılmaz' : 'Jane Doe'} />
            </div>
            <div className="form-group">
              <label htmlFor="email">{lang === 'tr' ? 'E-Posta Adresiniz' : 'Email Address'}</label>
              <input type="email" id="email" placeholder={lang === 'tr' ? 'ornek@mail.com' : 'example@mail.com'} />
            </div>
            <div className="form-group">
              <label htmlFor="message">{lang === 'tr' ? 'Mesajınız' : 'Your Message'}</label>
              <textarea id="message" rows="4" placeholder={lang === 'tr' ? 'Projenizden bahsedin...' : 'Tell us about your project...'} />
            </div>
            <button type="submit" className="contact-submit">{lang === 'tr' ? 'GÖNDER' : 'SEND'}</button>
          </form>
        </motion.div>
      </div>



    </PageTransition>
  );
};

export default Contact;
