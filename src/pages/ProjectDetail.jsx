import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const project = projectsData[currentIndex];
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="pd-not-found">
        <p>{t('projectDetail.notFound')}</p>
        <button onClick={() => navigate('/projects')}>{t('projectDetail.goBack')}</button>
      </div>
    );
  }

  const { gallery } = project;
  const images = gallery.images || [];

  // Parse rows based on filename convention: "yatay-" and "dikey-"
  const rows = [];
  let currentRow = [];
  let currentType = null;

  images.forEach((src) => {
    const isDikey = src.includes('dikey');
    
    if (isDikey) {
      if (currentType === 'dikey' && currentRow.length < 3) {
        currentRow.push(src);
      } else {
        if (currentRow.length > 0) rows.push({ type: currentType, images: currentRow });
        currentRow = [src];
        currentType = 'dikey';
      }
    } else {
      // yatay (or default)
      if (currentRow.length > 0) rows.push({ type: currentType, images: currentRow });
      currentRow = [src];
      currentType = 'yatay';
    }
  });
  if (currentRow.length > 0) rows.push({ type: currentType, images: currentRow });

  return (
    <motion.div
      className="pd-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── CLOSE BUTTON ── */}
      <button
        className="pd-close-btn"
        onClick={() => navigate('/projects')}
        aria-label="Kapat"
      >
        ✕
      </button>

      {/* ── HERO ── */}
      <div className="pd-hero">
        <div
          className="pd-hero-bg"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className="pd-hero-overlay" />
        <motion.div
          className="pd-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h1 className="pd-hero-title">{project.title.toUpperCase()}</h1>
          <div className="pd-hero-meta">
            <span>{t('projectDetail.location')}: {project.location}</span>
            <span>{t('projectDetail.year')}: {project.year}</span>
            <span>{t('projectDetail.type')}: {project.type}</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="pd-scroll-hint">
          <span className="pd-scroll-arrow">↓</span>
        </div>
      </div>

      {/* ── GALLERY ── */}
      <div className="pd-gallery">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`pd-gallery-row pd-gallery-row--${row.type}`}
          >
            {row.images.map((src, imgIdx) => (
              <div key={imgIdx} className="pd-gallery-img-wrap">
                <img
                  src={src}
                  alt={`${project.title} — görsel ${rowIdx + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── RETURN TO PROJECTS BUTTON ── */}
      <div className="pd-return-wrapper">
        <button className="pd-return-btn" onClick={() => navigate('/projects')}>
          {t('projectDetail.otherProjects')}
        </button>
      </div>

      {/* ── PREV / NEXT ── */}
      <div className="pd-nav">
        {prevProject ? (
          <button
            className="pd-nav-btn pd-nav-btn--prev"
            onClick={() => navigate(`/projects/${prevProject.id}`)}
          >
            <span className="pd-nav-arrow">←</span>
            <span className="pd-nav-label">
              <span className="pd-nav-hint">{t('projectDetail.prevProject')}</span>
              <span className="pd-nav-name">{prevProject.title}</span>
            </span>
          </button>
        ) : <div />}

        {nextProject ? (
          <button
            className="pd-nav-btn pd-nav-btn--next"
            onClick={() => navigate(`/projects/${nextProject.id}`)}
          >
            <span className="pd-nav-label">
              <span className="pd-nav-hint">{t('projectDetail.nextProject')}</span>
              <span className="pd-nav-name">{nextProject.title}</span>
            </span>
            <span className="pd-nav-arrow">→</span>
          </button>
        ) : <div />}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
