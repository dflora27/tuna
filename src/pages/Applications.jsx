import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useLanguage } from '../context/LanguageContext';
import './Applications.css';

const p = (folder, file) => `/media/${folder}/${encodeURIComponent(file)}`;

// Görsel çiftleri: aynı alanın iki farklı karesi ya da tek kare üzerinden
// 'öncesi' (nötr filtre) / 'sonrası' (renkli, bitmiş hal) şeklinde sunulur.
// İleride gerçek öncesi-sonrası kareleri eklendiğinde bu dizi güncellenecek.
const buildCases = (lang) => [
  {
    id: 'sahin-ofis',
    subtitle: lang === 'tr' ? 'OFİS — KAYNAKLAR' : 'OFFICE — KAYNAKLAR',
    title: lang === 'tr' ? 'Şahin Balıkçılık' : 'Şahin Balıkçılık',
    caption:
      lang === 'tr'
        ? 'Kaba yapı karkasının çıplak betonundan, karakterli ahşap panellerin ve ısmarlama mobilyanın sahne aldığı bir çalışma alanına; şantiyeden teslim anına kadar tek elden yürütülen süreç.'
        : 'From the raw concrete shell of the structural frame to a workspace where character-rich wood panels and bespoke furniture take the stage; a single-handed process from site to handover.',
    beforeImage: p('sahin-balikcilik', 'yatay-1.png'),
    afterImage: p('sahin-balikcilik', 'yatay-5.png'),
  },
  {
    id: 'ds-yali',
    subtitle: lang === 'tr' ? 'YALI DAİRESİ — GÖZTEPE' : 'SEASIDE APT — GÖZTEPE',
    title: lang === 'tr' ? 'D&S Yalı Dairesi' : 'D&S Seaside Residence',
    caption:
      lang === 'tr'
        ? 'İki kardeşin paylaştığı yalı dairesi; zeminin sıfırdan kurgulandığı, duvarların yeniden konumlandığı ve her dokunuşun atölyede prototiple doğrulandığı ince işçilikli bir iç mekân.'
        : 'A seaside apartment shared by two siblings; floors rebuilt from scratch, walls repositioned and every detail verified with prototypes in the workshop.',
    beforeImage: p('ds-yali-dairesi', 'yatay-1.jpg'),
    afterImage: p('ds-yali-dairesi', 'yatay-5.jpg'),
  },
  {
    id: 'sa-villa',
    subtitle: lang === 'tr' ? 'MÜSTAKİL VİLLA — URLA' : 'DETACHED VILLA — URLA',
    title: lang === 'tr' ? 'S&A Villa' : 'S&A Villa',
    caption:
      lang === 'tr'
        ? 'Kalabak’ın manzarasına açılan villa; ev sahibinin yaşam ritmi gözlemlenerek kurgulanan açık planlı salon, tavan izleri ve özel dökümlü detaylarla tamamlanmıştır.'
        : 'A villa opening onto the Kalabak landscape; the open-plan living area was shaped by observing the owner’s daily rhythm, completed with ceiling traces and custom-cast details.',
    beforeImage: p('sa-villa', 'yatay-1.jpg'),
    afterImage: p('sa-villa', 'yatay-3.jpg'),
  },
  {
    id: 'zo-malikane',
    subtitle: lang === 'tr' ? 'MALİKANE — KEKLİKTEPE' : 'MANSION — KEKLİKTEPE',
    title: lang === 'tr' ? 'Z&O Malikane' : 'Z&O Mansion',
    caption:
      lang === 'tr'
        ? 'Geniş bir malikanede tüm iç kabuğun yeniden ele alınması: duvar kaplamaları, ısmarlama vestiyerler, mermer detayları ve her köşeye ait özel mobilya takımları.'
        : 'A full interior skin renewal in a large mansion: wall cladding, bespoke dressing rooms, marble details and custom furniture tailored to every corner.',
    beforeImage: p('zo-malikane', 'yatay-1.jpg'),
    afterImage: p('zo-malikane', 'yatay-3.jpg'),
  },
  {
    id: 'bf-villa',
    subtitle: lang === 'tr' ? 'VİLLA — ÇEŞME' : 'VILLA — ÇEŞME',
    title: lang === 'tr' ? 'B&F Villa' : 'B&F Villa',
    caption:
      lang === 'tr'
        ? 'Mamurbaba’da sakin bir villa; doğal taş, doğal ahşap ve sessiz bir palet üzerinden kurgulanan mekân, atölyede üretilen özel parçalarla sahada buluştu.'
        : 'A calm villa in Mamurbaba; composed around natural stone, natural wood and a quiet palette, where workshop-made pieces met the site at installation.',
    beforeImage: p('bf-villa', 'yatay-1.jpg'),
    afterImage: p('bf-villa', 'yatay-3.jpg'),
  },
  {
    id: 'sigacik-otel',
    subtitle: lang === 'tr' ? 'BUTİK OTEL — SIĞACIK' : 'BOUTIQUE HOTEL — SIĞACIK',
    title: lang === 'tr' ? 'Sığacık Butik Otel' : 'Sığacık Boutique Hotel',
    caption:
      lang === 'tr'
        ? 'Kıyı dokusuna saygılı butik bir otel; lobiden odalara kadar tüm mobilyanın kendi atölyemizde üretildiği, uygulama yönetiminin tek akışta yürütüldüğü bir proje.'
        : 'A boutique hotel respecting its coastal context; from lobby to rooms all furniture was produced in our own workshop and site management was run as a single flow.',
    beforeImage: p('sigacik-otel', 'yatay-1.jpg'),
    afterImage: p('sigacik-otel', 'yatay-3.jpg'),
  },
];

const processSteps = (lang) => [
  {
    n: '01',
    t: lang === 'tr' ? 'KEŞİF' : 'DISCOVERY',
    d:
      lang === 'tr'
        ? 'Alanı bizzat dolaşır, ışığı ve ritmi okuruz. Mal sahibinin günlük akışı, eşyası ve alışkanlıkları ilk çizginin rehberi olur.'
        : 'We walk the space ourselves, read its light and rhythm. The owner’s daily flow, belongings and habits guide the first line we draw.',
  },
  {
    n: '02',
    t: lang === 'tr' ? 'KONSEPT' : 'CONCEPT',
    d:
      lang === 'tr'
        ? 'Malzeme, doku ve renk paletini çok boyutlu bir konsept tablosunda tutarlılıkla kurgular, mekânın karakterini tanımlarız.'
        : 'We compose materials, texture and palette into a multi-layered concept board, defining the space’s character with coherence.',
  },
  {
    n: '03',
    t: lang === 'tr' ? 'PROJE' : 'PROJECT',
    d:
      lang === 'tr'
        ? 'Teknik çizim, detay kesit ve BIM modelleriyle yapı kabuğundan son vidaya kadar her kararı önceden verilmiş hale getiririz.'
        : 'With technical drawings, detail sections and BIM models, every decision — from shell to final screw — is made before the site.',
  },
  {
    n: '04',
    t: lang === 'tr' ? 'PROTOTİP' : 'PROTOTYPE',
    d:
      lang === 'tr'
        ? 'Kritik mobilya ve detayları atölyemizde 1/1 prototipte doğrular; dokusunu, oturumunu ve bitişini fiziksel olarak onaylarız.'
        : 'Critical furniture and details are validated at 1:1 in our workshop; we physically approve texture, ergonomics and finish.',
  },
  {
    n: '05',
    t: lang === 'tr' ? 'ÜRETİM' : 'PRODUCTION',
    d:
      lang === 'tr'
        ? 'Kendi CNC atölyemizde, usta kadrolarımızla her parça kalite kontrolden geçerek numaralanır ve sahaya hazırlanır.'
        : 'In our own CNC workshop, with master craftspeople, each piece is quality-checked, numbered and prepared for the site.',
  },
  {
    n: '06',
    t: lang === 'tr' ? 'MONTAJ' : 'ASSEMBLY',
    d:
      lang === 'tr'
        ? 'Sahada tek şantiye şefliği altında montaj, ince işçilik ve teslim; anahtar teslime kadar aynı ekiple süreç yürütülür.'
        : 'On site, assembly, fine finishing and handover run under a single site-chief; one team carries the project to turnkey delivery.',
  },
];

const Applications = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.classList.remove('theme-light');
  }, []);

  const cases = buildCases(lang);
  const steps = processSteps(lang);

  return (
    <PageTransition className="apps-page">
      {/* ── HERO ── */}
      <section className="apps-hero">
        <div className="apps-hero-grain" aria-hidden="true" />
        <div className="apps-hero-inner">
          <motion.span
            className="apps-hero-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {lang === 'tr' ? 'SAHANIN RUHU' : 'THE SPIRIT OF THE SITE'}
          </motion.span>
          <motion.h1
            className="apps-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {lang === 'tr' ? (
              <>
                Çizgiyi
                <br />
                <em>Mekâna</em> Dönüştürmek
              </>
            ) : (
              <>
                From Line
                <br />
                To <em>Inhabited Space</em>
              </>
            )}
          </motion.h1>
          <motion.p
            className="apps-hero-lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {lang === 'tr'
              ? 'Mimari projelendirme, özel üretim mobilya atölyesi ve uygulama şantiyesini tek akışta birleştiririz. Çizgi kâğıttan ayrılır, prototiple sınanır ve sahada kusursuz detayla yerine oturur.'
              : 'We combine architectural design, our bespoke furniture workshop and site execution in a single flow. The line leaves the paper, is tested with a prototype and lands on site with flawless detail.'}
          </motion.p>
        </div>
        <div className="apps-hero-stats">
          <div>
            <strong>1971</strong>
            <span>{lang === 'tr' ? 'Kuruluş' : 'Since'}</span>
          </div>
          <div>
            <strong>120+</strong>
            <span>{lang === 'tr' ? 'Tamamlanan Proje' : 'Delivered Projects'}</span>
          </div>
          <div>
            <strong>6</strong>
            <span>{lang === 'tr' ? 'Uygulama Aşaması' : 'Execution Stages'}</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>{lang === 'tr' ? 'Özel Detay' : 'Bespoke Details'}</span>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section className="apps-process">
        <div className="apps-section-head">
          <span className="apps-section-eyebrow">
            {lang === 'tr' ? 'SÜREÇ' : 'PROCESS'}
          </span>
          <h2 className="apps-section-title">
            {lang === 'tr'
              ? 'Altı Aşamalı Uygulama Akışı'
              : 'A Six-Stage Execution Flow'}
          </h2>
          <p className="apps-section-lead">
            {lang === 'tr'
              ? 'Her proje aynı disiplinle, aynı ellerden geçer. Keşiften anahtar teslime kadar akışın kopmadığı, kararların sahada keşfedilmediği bir yapı kurgular ve uygularız.'
              : 'Every project passes through the same discipline, the same hands. From discovery to turnkey delivery, we build and execute a flow in which no decision is left to be discovered on site.'}
          </p>
        </div>

        <ol className="apps-timeline">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="apps-timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="apps-timeline-num">{s.n}</span>
              <h3 className="apps-timeline-title">{s.t}</h3>
              <p className="apps-timeline-desc">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ── BEFORE / AFTER GALLERY ── */}
      <section className="apps-gallery">
        <div className="apps-section-head">
          <span className="apps-section-eyebrow">
            {lang === 'tr' ? 'ÖNCESİ — SONRASI' : 'BEFORE — AFTER'}
          </span>
          <h2 className="apps-section-title">
            {lang === 'tr'
              ? 'Aynı Mekânın İki Hâli'
              : 'Two States of the Same Space'}
          </h2>
          <p className="apps-section-lead">
            {lang === 'tr'
              ? 'Görselin ortasındaki tutamağı sürükleyin; mekânın ilk hâli ile teslim anındaki karakterini yan yana karşılaştırın.'
              : 'Drag the handle at the middle of each image; compare the first state of the space with its delivered character side-by-side.'}
          </p>
        </div>

        <div className="apps-gallery-grid">
          {cases.map((c) => (
            <BeforeAfterSlider
              key={c.id}
              beforeImage={c.beforeImage}
              afterImage={c.afterImage}
              beforeLabel={lang === 'tr' ? 'ÖNCESİ' : 'BEFORE'}
              afterLabel={lang === 'tr' ? 'SONRASI' : 'AFTER'}
              title={c.title}
              subtitle={c.subtitle}
              caption={c.caption}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="apps-cta">
        <motion.div
          className="apps-cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="apps-section-eyebrow">
            {lang === 'tr' ? 'BİR SONRAKİ MEKÂN' : 'THE NEXT SPACE'}
          </span>
          <h2 className="apps-cta-title">
            {lang === 'tr'
              ? 'Kendi öncesi-sonrası hikâyenizi birlikte yazalım.'
              : 'Let’s write your own before-after story together.'}
          </h2>
          <a href="/contact" className="apps-cta-link">
            {lang === 'tr' ? 'PROJE TALEBİ OLUŞTUR →' : 'START A PROJECT REQUEST →'}
          </a>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Applications;
