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

const BookViewer: React.FC<BookViewerProps> = ({ title, subtitle, contentHindi, contentEnglish, explanation, audioUrl, backgroundMusicUrl, onClose }) => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [seed, setSeed] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);

  const content = language === 'hi' ? contentHindi : contentEnglish;

  // Subtle wiggle for book pages
  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(prev => prev + 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!leftPageRef.current) return;
      
      const element = leftPageRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    const element = leftPageRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
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

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const bookWidth = Math.min(900, canvas.width * 0.9);
    const bookHeight = Math.min(600, canvas.height * 0.8);

    // Book shadow
    rc.rectangle(centerX - bookWidth / 2 + 10, centerY - bookHeight / 2 + 10, bookWidth, bookHeight, {
      fill: 'rgba(0,0,0,0.3)',
      fillStyle: 'solid',
      roughness: 1,
      seed: seed,
    });

    // Left page
    rc.rectangle(centerX - bookWidth / 2, centerY - bookHeight / 2, bookWidth / 2, bookHeight, {
      fill: '#F5E6D3',
      fillStyle: 'solid',
      stroke: '#8B7355',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 1,
    });

    // Right page
    rc.rectangle(centerX, centerY - bookHeight / 2, bookWidth / 2, bookHeight, {
      fill: '#F5E6D3',
      fillStyle: 'solid',
      stroke: '#8B7355',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 2,
    });

    // Center binding
    rc.line(centerX, centerY - bookHeight / 2, centerX, centerY + bookHeight / 2, {
      stroke: '#6B5345',
      strokeWidth: 4,
      roughness: 1.5,
      seed: seed + 3,
    });

    // Decorative corners on left page
    rc.circle(centerX - bookWidth / 2 + 30, centerY - bookHeight / 2 + 30, 15, {
      stroke: '#D4AF37',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 4,
    });

    rc.circle(centerX - 30, centerY - bookHeight / 2 + 30, 15, {
      stroke: '#D4AF37',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 5,
    });

  }, [seed]);

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

        <div className={styles.bookContent}>
          {/* Home button - top left */}
          <motion.button
            className={styles.homeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Back to Home"
          >
            🏠
          </motion.button>

          {/* Close button */}
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          {/* Language toggle */}
          <motion.div className={styles.languageToggle}>
            <button
              className={`${styles.langButton} ${language === 'hi' ? styles.active : ''}`}
              onClick={() => setLanguage('hi')}
            >
              हिंदी
            </button>
            <button
              className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            {explanation && (
              <button
                className={`${styles.langButton} ${showExplanation ? styles.active : ''}`}
                onClick={() => setShowExplanation(!showExplanation)}
              >
                📖 About
              </button>
            )}
          </motion.div>

          {/* Left page - poem content */}
          <motion.div
            ref={leftPageRef}
            className={styles.leftPage}
            key={language}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className={styles.poemTitle}>{title}</h2>
            {subtitle && <p className={styles.poemSubtitle}>{subtitle}</p>}
            <div className={styles.poemContent}>
              {content.split('\n').map((line, index) => (
                <p key={index} className={language === 'hi' ? styles.hindiText : styles.englishText}>
                  {line}
                </p>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
              <div className={styles.scrollLine}></div>
              <motion.div 
                className={styles.scrollDot}
                animate={{ top: `${scrollProgress * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Right page - vinyl player or explanation */}
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookViewer;
