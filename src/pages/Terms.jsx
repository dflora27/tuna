import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1 className="legal-title">{t('footer.terms') || 'Kullanım Şartları'}</h1>
        <p>Bahtiyar Tuna web sitesine hoş geldiniz. Sitemizi kullanarak aşağıda belirtilen şartları kabul etmiş olursunuz.</p>
        <p>1. Web sitemizde yer alan tüm tasarım, proje görselleri, render kareleri ve mimari çizimler Bahtiyar Tuna'ya aittir ve telif haklarıyla korunmaktadır. İzinsiz kullanılması veya ticari amaçlarla kopyalanması yasaktır.</p>
        <p>2. Projeler sayfasında gösterilen konseptler ve mobilya dizaynları fikir amaçlı sunulmuş olup, uygulanabilirliği mekanın teknik özelliklerine göre değişiklik gösterebilir.</p>
        <p>3. Web sitemizde yayımlanan iletişim ve kampanya bilgileri güncellenebilir, hizmet ve teklifler nihai sözleşme imzalanana dek bağlayıcı değildir.</p>
      </div>
    </div>
  );
};

export default Terms;
