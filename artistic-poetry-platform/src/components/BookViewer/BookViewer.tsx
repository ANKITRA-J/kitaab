import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import VinylPlayer from '../VinylPlayer/VinylPlayer';
import styles from './BookViewer.module.css';

interface BookViewerProps {
  title: string;
  subtitle?: string;
  contentHindi: string;
  contentEnglish: string;
  explanation?: string;
  audioUrl?: string;
  backgroundMusicUrl?: string;
  onClose: () => void;
}

const BookViewer: React.FC<BookViewerProps> = ({ title, subtitle, contentHindi, contentEnglish, explanation, audioUrl, onClose }) => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [seed, setSeed] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const content = language === 'hi' ? contentHindi : contentEnglish;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSeed(prev => prev + 1), 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!pageRef.current) return;
      const el = pageRef.current;
      const progress = el.scrollHeight - el.clientHeight > 0
        ? el.scrollTop / (el.scrollHeight - el.clientHeight)
        : 0;
      setScrollProgress(progress);
    };
    const el = pageRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rc = rough.canvas(canvas) as RoughCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const bookWidth = Math.min(isMobile ? canvas.width * 0.92 : 900, canvas.width * 0.92);
    const bookHeight = Math.min(isMobile ? canvas.height * 0.88 : 600, canvas.height * 0.88);

    // Shadow
    rc.rectangle(centerX - bookWidth / 2 + 8, centerY - bookHeight / 2 + 8, bookWidth, bookHeight, {
      fill: 'rgba(0,0,0,0.3)', fillStyle: 'solid', roughness: 1, seed,
    });

    if (isMobile) {
      // Single page on mobile
      rc.rectangle(centerX - bookWidth / 2, centerY - bookHeight / 2, bookWidth, bookHeight, {
        fill: '#F5E6D3', fillStyle: 'solid', stroke: '#8B7355', strokeWidth: 3, roughness: 2, seed: seed + 1,
      });
    } else {
      // Two pages on desktop
      rc.rectangle(centerX - bookWidth / 2, centerY - bookHeight / 2, bookWidth / 2, bookHeight, {
        fill: '#F5E6D3', fillStyle: 'solid', stroke: '#8B7355', strokeWidth: 3, roughness: 2, seed: seed + 1,
      });
      rc.rectangle(centerX, centerY - bookHeight / 2, bookWidth / 2, bookHeight, {
        fill: '#F5E6D3', fillStyle: 'solid', stroke: '#8B7355', strokeWidth: 3, roughness: 2, seed: seed + 2,
      });
      rc.line(centerX, centerY - bookHeight / 2, centerX, centerY + bookHeight / 2, {
        stroke: '#6B5345', strokeWidth: 4, roughness: 1.5, seed: seed + 3,
      });
    }

    // Corner decorations
    rc.circle(centerX - bookWidth / 2 + 25, centerY - bookHeight / 2 + 25, 14, {
      stroke: '#D4AF37', strokeWidth: 2, roughness: 1.5, seed: seed + 4,
    });
    rc.circle(centerX + bookWidth / 2 - 25, centerY - bookHeight / 2 + 25, 14, {
      stroke: '#D4AF37', strokeWidth: 2, roughness: 1.5, seed: seed + 5,
    });
  }, [seed, isMobile]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <canvas ref={canvasRef} className={styles.canvas} />

        <div className={`${styles.bookContent} ${isMobile ? styles.mobile : ''}`}>
          {/* Home button */}
          <motion.button className={styles.homeButton} onClick={onClose}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Back to Home">
            🏠
          </motion.button>

          {/* Close button */}
          <motion.button className={styles.closeButton} onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
            ✕
          </motion.button>

          {/* Language + audio toggle */}
          <motion.div className={styles.languageToggle}>
            <button className={`${styles.langButton} ${language === 'hi' ? styles.active : ''}`}
              onClick={() => setLanguage('hi')}>हिंदी</button>
            <button className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}>English</button>
            {explanation && (
              <button className={`${styles.langButton} ${showExplanation ? styles.active : ''}`}
                onClick={() => { setShowExplanation(!showExplanation); setShowAudio(false); }}>
                📖 About
              </button>
            )}
            {/* Sketched bookmark audio button */}
            {audioUrl && (
              <motion.button
                className={`${styles.bookmarkBtn} ${showAudio ? styles.bookmarkActive : ''}`}
                onClick={() => { setShowAudio(!showAudio); setShowExplanation(false); }}
                whileTap={{ scale: 0.95 }}
                title="Listen"
              >
                <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sketchy bookmark shape */}
                  <path d="M4 2 C3 2, 2 3, 2 4 L2 44 L18 36 L34 44 L34 4 C34 3, 33 2, 32 2 Z"
                    fill={showAudio ? '#FF006E' : '#FFC857'}
                    stroke="#000" strokeWidth="2.5"
                    strokeLinejoin="round"
                    style={{ filter: 'url(#rough)' }}
                  />
                  {/* Music note */}
                  <motion.g
                    animate={{ y: showAudio ? [0, -2, 0] : 0 }}
                    transition={{ duration: 0.8, repeat: showAudio ? Infinity : 0, ease: 'easeInOut' }}
                  >
                    <circle cx="13" cy="26" r="3" fill={showAudio ? '#FFF' : '#3A2A1A'} />
                    <circle cx="22" cy="23" r="3" fill={showAudio ? '#FFF' : '#3A2A1A'} />
                    <line x1="16" y1="26" x2="16" y2="16" stroke={showAudio ? '#FFF' : '#3A2A1A'} strokeWidth="2" strokeLinecap="round" />
                    <line x1="25" y1="23" x2="25" y2="13" stroke={showAudio ? '#FFF' : '#3A2A1A'} strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="16" x2="25" y2="13" stroke={showAudio ? '#FFF' : '#3A2A1A'} strokeWidth="2" strokeLinecap="round" />
                  </motion.g>
                </svg>
              </motion.button>
            )}
          </motion.div>

          {/* Left/main page */}
          <motion.div ref={pageRef} className={styles.leftPage}
            key={language} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}>
            <h2 className={styles.poemTitle}>{title}</h2>
            {subtitle && <p className={styles.poemSubtitle}>{subtitle}</p>}
            <div className={styles.poemContent}>
              {content.split('\n').map((line, i) => (
                <p key={i} className={language === 'hi' ? styles.hindiText : styles.englishText}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>

            {/* Inline audio on mobile */}
            {isMobile && showAudio && audioUrl && (
              <motion.div className={styles.inlineAudio}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <VinylPlayer audioUrl={audioUrl} />
              </motion.div>
            )}

            {/* Inline explanation on mobile */}
            {isMobile && showExplanation && explanation && (
              <motion.div className={styles.explanationBox}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className={styles.explanationTitle}>About this poem</h3>
                <p className={styles.explanationText}>{explanation}</p>
              </motion.div>
            )}

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
              <div className={styles.scrollLine}></div>
              <motion.div className={styles.scrollDot}
                animate={{ top: `${scrollProgress * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              </motion.div>
            </div>
          </motion.div>

          {/* Right page - desktop only */}
          {!isMobile && (
            <div className={styles.rightPage}>
              {showExplanation && explanation ? (
                <div className={styles.explanationBox}>
                  <h3 className={styles.explanationTitle}>About this poem</h3>
                  <p className={styles.explanationText}>{explanation}</p>
                </div>
              ) : (
                <VinylPlayer audioUrl={audioUrl || ''} />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookViewer;
