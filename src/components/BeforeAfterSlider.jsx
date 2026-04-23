import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'ÖNCESİ',
  afterLabel = 'SONRASI',
  title,
  place,
  caption,
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updateFromClientX]);

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <motion.figure
      className="ba-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={containerRef}
        className={`ba-stage ${dragging ? 'is-dragging' : ''}`}
        onMouseDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          updateFromClientX(e.touches[0].clientX);
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label={`${beforeLabel} - ${afterLabel} karşılaştırma`}
        tabIndex={0}
        onKeyDown={handleKey}
      >
        <img src={afterImage} alt={afterLabel} className="ba-img ba-img--after" draggable="false" loading="lazy" />
        <div
          className="ba-clip"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={beforeImage} alt={beforeLabel} className="ba-img ba-img--before" draggable="false" loading="lazy" />
        </div>

        <span className="ba-tag ba-tag--before">{beforeLabel}</span>
        <span className="ba-tag ba-tag--after">{afterLabel}</span>

        <div
          className="ba-divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="ba-handle">
            <span className="ba-handle-arrow">‹</span>
            <span className="ba-handle-arrow">›</span>
          </div>
        </div>
      </div>

      {(title || place || caption) && (
        <figcaption className="ba-meta">
          {title && <span className="ba-meta-title">{title}</span>}
          {place && <span className="ba-meta-place">{place}</span>}
          {caption && <p className="ba-meta-caption">{caption}</p>}
        </figcaption>
      )}
    </motion.figure>
  );
};

export default BeforeAfterSlider;
