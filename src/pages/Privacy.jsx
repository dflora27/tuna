import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1 className="legal-title">{t('footer.privacy') || 'Gizlilik Politikası'}</h1>
        <p>Bahtiyar Tuna Mimarlık & Mobilya Atölyesi olarak kişisel verilerinizin güvenliğine önem veriyoruz.</p>
        <p>Web sitemizi ziyaretiniz sırasında bizimle paylaştığınız iletişim formlarındaki ad, soyad ve e-posta gibi bilgileriniz yalnızca proje taleplerinize hızlıca yanıt verebilmek ve size uygun teklifleri sunabilmek amacıyla saklanmaktadır.</p>
        <p>Bilgileriniz üçüncü şahıslarla reklam veya pazarlama amacıyla paylaşılmaz. Sistemimiz, genel kullanım istatistiklerini (site ziyaretçi sayısı gibi) anonim olarak kaydedebilir, bu veriler hiçbir şekilde kimlik tespiti içermez.</p>
        <p>Ayrıntılı bilgi için bizimle "info@bahtiyartuna.com" adresinden iletişime geçebilirsiniz.</p>
      </div>
    </div>
  );
};

export default Privacy;
