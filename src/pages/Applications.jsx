import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useLanguage } from '../context/LanguageContext';
import './Applications.css';

const p = (folder, file) => `/media/${folder}/${encodeURIComponent(file)}`;

const heroImage = p('sahin-balikcilik', 'kapak.png');

const buildCases = (lang) => [
  {
    id: 'sahin-ofis',
    title: 'Şahin Balıkçılık',
    place: lang === 'tr'
      ? 'Ofis · Kaynaklar / İzmir · 2023'
      : 'Office · Kaynaklar / İzmir · 2023',
    caption:
      lang === 'tr'
        ? 'Kaba yapı karkasının çıplak betonundan, karakterli ahşap panellerin ve ısmarlama mobilyanın sahne aldığı bir çalışma alanına.'
        : 'From the raw concrete of the structural shell to a workspace where character-rich wood panels and bespoke furniture take the stage.',
    beforeImage: p('sahin-balikcilik', 'yatay-1.png'),
    afterImage: p('sahin-balikcilik', 'yatay-5.png'),
  },
  {
    id: 'ds-yali',
    title: 'D&S Yalı Dairesi',
    place: lang === 'tr'
      ? 'Yalı Dairesi · Göztepe / İzmir · 2025'
      : 'Seaside Residence · Göztepe / İzmir · 2025',
    caption:
      lang === 'tr'
        ? 'İki kardeşin paylaştığı yalı dairesi; zeminin sıfırdan kurgulandığı, her dokunuşun atölyede prototiple doğrulandığı ince işçilikli bir iç mekân.'
        : 'A seaside apartment shared by two siblings; floors rebuilt from scratch, every detail prototyped and validated in the workshop.',
    beforeImage: p('ds-yali-dairesi', 'yatay-1.jpg'),
    afterImage: p('ds-yali-dairesi', 'yatay-5.jpg'),
  },
  {
    id: 'sa-villa',
    title: 'S&A Villa',
    place: lang === 'tr'
      ? 'Müstakil Villa · Urla / Kalabak · 2024'
      : 'Detached Villa · Urla / Kalabak · 2024',
    caption:
      lang === 'tr'
        ? 'Kalabak’ın manzarasına açılan villa; ev sahibinin yaşam ritmi gözlemlenerek kurgulanan açık planlı salon ve özel dökümlü detaylarla tamamlandı.'
        : 'A villa opening to the Kalabak landscape; the open-plan living area was shaped by the owner’s daily rhythm, completed with custom-cast details.',
    beforeImage: p('sa-villa', 'yatay-1.jpg'),
    afterImage: p('sa-villa', 'yatay-3.jpg'),
  },
  {
    id: 'zo-malikane',
    title: 'Z&O Malikane',
    place: lang === 'tr'
      ? 'Malikane · Kekliktepe / İzmir · 2025'
      : 'Mansion · Kekliktepe / İzmir · 2025',
    caption:
      lang === 'tr'
        ? 'Geniş bir malikanede tüm iç kabuğun yeniden ele alınması: duvar kaplamaları, ısmarlama vestiyerler, mermer detayları, özel mobilya takımları.'
        : 'A full interior renewal in a large mansion: wall cladding, bespoke dressing rooms, marble details and custom furniture sets.',
    beforeImage: p('zo-malikane', 'yatay-1.jpg'),
    afterImage: p('zo-malikane', 'yatay-3.jpg'),
  },
  {
    id: 'bf-villa',
    title: 'B&F Villa',
    place: lang === 'tr'
      ? 'Villa · Mamurbaba / Çeşme · 2024'
      : 'Villa · Mamurbaba / Çeşme · 2024',
    caption:
      lang === 'tr'
        ? 'Mamurbaba’da sakin bir villa; doğal taş, doğal ahşap ve sessiz bir palet üzerinden kurgulanan mekân, atölyede üretilen parçalarla sahada buluştu.'
        : 'A calm villa in Mamurbaba; a space composed of natural stone, natural wood and a quiet palette, meeting the site with workshop-made pieces.',
    beforeImage: p('bf-villa', 'yatay-1.jpg'),
    afterImage: p('bf-villa', 'yatay-3.jpg'),
  },
  {
    id: 'sigacik-otel',
    title: lang === 'tr' ? 'Sığacık Butik Otel' : 'Sığacık Boutique Hotel',
    place: lang === 'tr'
      ? 'Butik Otel · Sığacık / İzmir'
      : 'Boutique Hotel · Sığacık / İzmir',
    caption:
      lang === 'tr'
        ? 'Kıyı dokusuna saygılı butik bir otel; lobiden odalara tüm mobilyanın kendi atölyemizde üretildiği, uygulama yönetiminin tek akışta yürütüldüğü proje.'
        : 'A boutique hotel respecting its coastal context; from lobby to rooms, all furniture made in our workshop under a single execution flow.',
    beforeImage: p('sigacik-otel', 'yatay-1.jpg'),
    afterImage: p('sigacik-otel', 'yatay-3.jpg'),
  },
];

const Applications = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.classList.remove('theme-light');
  }, []);

  const cases = buildCases(lang);

  return (
    <PageTransition className="apps-page">
      {/* ── HERO ── */}
      <section className="apps-hero">
        <div
          className="apps-hero-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div className="apps-hero-overlay" aria-hidden="true" />
        <motion.div
          className="apps-hero-inner"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="apps-hero-eyebrow">
            {lang === 'tr' ? 'UYGULAMA' : 'EXECUTION'}
          </span>
          <h1 className="apps-hero-title">
            {lang === 'tr'
              ? 'Çizgiden mekâna.'
              : 'From line to space.'}
          </h1>
          <p className="apps-hero-lead">
            {lang === 'tr'
              ? 'Mimari projelendirme, özel üretim mobilya atölyesi ve uygulama şantiyesini tek akışta birleştiriyoruz. Her mekânın öncesiyle sonrasını aynı ellerden geçirdiğimiz, ince işçilikli bir sürecin kaydı.'
              : 'We bring architecture, bespoke furniture and site execution into a single flow. A record of refined craftsmanship where every space is carried by the same hands from its first state to its last.'}
          </p>
        </motion.div>
        <span className="apps-hero-scroll" aria-hidden="true" />
      </section>

      {/* ── INTRO ── */}
      <motion.section
        className="apps-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="apps-intro-rule" aria-hidden="true" />
        <p className="apps-intro-highlight">
          {lang === 'tr'
            ? 'Bir mekânın hikâyesi, sahadaki ilk adımla son vida arasındaki ince yolculuktur.'
            : 'The story of a space is the quiet journey from the first step on site to the last screw.'}
        </p>
        <p>
          {lang === 'tr'
            ? 'Her projede aynı ritüeli yaşatırız: alanı kendi adımlarımızla ölçeriz, ışığı gözlemleriz, mal sahibinin günlük akışını dinleriz. Çizimlerimiz atölyede prototiple doğrulanır, imalatın her parçası numaralanıp sahaya hazırlanır.'
            : 'On every project we observe the same ritual: we measure the space with our own steps, read its light, listen to the owner’s daily rhythm. Drawings are validated with prototypes in the workshop; every produced piece is numbered and prepared for the site.'}
        </p>
        <p>
          {lang === 'tr'
            ? 'Aşağıdaki örnekler, farklı ölçeklerdeki mekânların aynı disiplinden geçerek nasıl dönüştüğünü gösteriyor — görselin ortasındaki tutamağı sürükleyin.'
            : 'The examples below show how spaces of different scales are transformed through the same discipline — drag the handle across each image.'}
        </p>
      </motion.section>

      {/* ── GALLERY STREAM ── */}
      <section className="apps-gallery">
        <div className="apps-gallery-list">
          {cases.map((c) => (
            <BeforeAfterSlider
              key={c.id}
              beforeImage={c.beforeImage}
              afterImage={c.afterImage}
              beforeLabel={lang === 'tr' ? 'ÖNCESİ' : 'BEFORE'}
              afterLabel={lang === 'tr' ? 'SONRASI' : 'AFTER'}
              title={c.title}
              place={c.place}
              caption={c.caption}
            />
          ))}
        </div>
      </section>

      {/* ── PROCESS STRIP (About ile aynı dil) ── */}
      <section className="apps-process">
        <div className="apps-process-row">
          <span>{lang === 'tr' ? 'KEŞİF' : 'DISCOVERY'}</span>
          <span className="separator" aria-hidden="true" />
          <span>{lang === 'tr' ? 'KONSEPT' : 'CONCEPT'}</span>
          <span className="separator" aria-hidden="true" />
          <span>{lang === 'tr' ? 'PROJE' : 'PROJECT'}</span>
          <span className="separator" aria-hidden="true" />
          <span>{lang === 'tr' ? 'PROTOTİP' : 'PROTOTYPE'}</span>
          <span className="separator" aria-hidden="true" />
          <span>{lang === 'tr' ? 'ÜRETİM' : 'PRODUCTION'}</span>
          <span className="separator" aria-hidden="true" />
          <span>{lang === 'tr' ? 'MONTAJ' : 'ASSEMBLY'}</span>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="apps-cta">
        <motion.div
          className="apps-cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="apps-cta-title">
            {lang === 'tr'
              ? 'Kendi öncesi-sonrası hikâyenizi birlikte yazalım.'
              : 'Let’s write your own before-and-after together.'}
          </p>
          <a href="/contact" className="apps-cta-link">
            {lang === 'tr' ? 'PROJE TALEBİ OLUŞTUR' : 'START A PROJECT REQUEST'}
          </a>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Applications;
