import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import styles from './HomePage.module.css';

interface HomePageProps {
  onEnter: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(1);

  // Wiggle animation - redraw with slight variations
  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(prev => prev + 1);
    }, 100); // Redraw every 100ms for wiggle effect

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas) as RoughCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isMobile = canvas.width <= 768;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Scale factor so everything fits on small screens
    const scale = isMobile ? Math.min(canvas.width / 480, 1) : 1;

    // Background blocks
    rc.rectangle(0, 0, canvas.width * 0.35, canvas.height, { fill: '#FF6B9D', fillStyle: 'solid', roughness: 2.5, seed });
    rc.rectangle(canvas.width * 0.35, 0, canvas.width * 0.35, canvas.height, { fill: '#FFC857', fillStyle: 'solid', roughness: 2.5, seed: seed + 1 });
    rc.rectangle(canvas.width * 0.7, 0, canvas.width * 0.3, canvas.height, { fill: '#4ECDC4', fillStyle: 'solid', roughness: 2.5, seed: seed + 2 });

    // Hand with flowers - scaled and repositioned for mobile
    const handX = isMobile ? centerX - canvas.width * 0.25 : centerX - 200;
    const handY = isMobile ? centerY + canvas.height * 0.22 : centerY + 150;
    const fs = scale; // flower scale

    rc.ellipse(handX, handY, 100 * fs, 120 * fs, { fill: '#FFB4A2', fillStyle: 'solid', stroke: '#000', strokeWidth: 3, roughness: 2.8, seed: seed + 3 });
    rc.line(handX - 10 * fs, handY - 60 * fs, handX - 50 * fs, handY - 220 * fs, { stroke: '#2D6A4F', strokeWidth: 4, roughness: 2.5, seed: seed + 4 });
    rc.line(handX + 10 * fs, handY - 60 * fs, handX + 30 * fs, handY - 240 * fs, { stroke: '#2D6A4F', strokeWidth: 4, roughness: 2.5, seed: seed + 5 });
    rc.line(handX, handY - 60 * fs, handX - 10 * fs, handY - 200 * fs, { stroke: '#2D6A4F', strokeWidth: 3, roughness: 2.5, seed: seed + 6 });

    rc.circle(handX - 50 * fs, handY - 220 * fs, 50 * fs, { fill: '#FF006E', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 2.5, seed: seed + 7 });
    rc.circle(handX + 30 * fs, handY - 240 * fs, 45 * fs, { fill: '#FFBE0B', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 2.5, seed: seed + 8 });
    rc.circle(handX - 10 * fs, handY - 200 * fs, 40 * fs, { fill: '#FB5607', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 2.5, seed: seed + 9 });
    rc.circle(handX - 50 * fs, handY - 220 * fs, 15 * fs, { fill: '#FFF', fillStyle: 'solid', stroke: '#000', strokeWidth: 1.5, roughness: 1.5, seed: seed + 10 });
    rc.circle(handX + 30 * fs, handY - 240 * fs, 15 * fs, { fill: '#FFF', fillStyle: 'solid', stroke: '#000', strokeWidth: 1.5, roughness: 1.5, seed: seed + 11 });

    // Title box - scaled
    const boxW = isMobile ? Math.min(canvas.width * 0.8, 320) : 560;
    const boxH = isMobile ? 120 : 180;
    rc.rectangle(centerX - boxW / 2, centerY - (isMobile ? 220 : 320), boxW, boxH, { fill: '#FFF', fillStyle: 'solid', stroke: '#000', strokeWidth: 3, roughness: 2.8, seed: seed + 12 });
    rc.circle(centerX - boxW / 2, centerY - (isMobile ? 220 : 320), isMobile ? 14 : 20, { fill: '#8338EC', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 2, seed: seed + 13 });
    rc.circle(centerX + boxW / 2, centerY - (isMobile ? 220 : 320), isMobile ? 14 : 20, { fill: '#3A86FF', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 2, seed: seed + 14 });

    // Enter button
    const btnW = isMobile ? 200 : 280;
    const btnH = isMobile ? 60 : 80;
    const btnY = isMobile ? centerY + 100 : centerY + 180;
    rc.rectangle(centerX - btnW / 2, btnY, btnW, btnH, { fill: '#FF006E', fillStyle: 'solid', stroke: '#000', strokeWidth: 3, roughness: 3, seed: seed + 15 });

    // Stars - only on desktop or scaled for mobile
    if (!isMobile) {
      for (let i = 0; i < 8; i++) {
        const x = canvas.width * 0.75 + (i % 3) * 60;
        const y = 80 + Math.floor(i / 3) * 80;
        const size = 12 + (i % 3) * 4;
        rc.line(x - size, y, x + size, y, { stroke: '#FFBE0B', strokeWidth: 4, roughness: 2.5, seed: seed + 16 + i });
        rc.line(x, y - size, x, y + size, { stroke: '#FFBE0B', strokeWidth: 4, roughness: 2.5, seed: seed + 24 + i });
      }
      rc.circle(centerX + 250, centerY - 150, 80, { stroke: '#8338EC', strokeWidth: 5, roughness: 2.8, seed: seed + 32 });
      rc.circle(centerX + 280, centerY + 50, 60, { fill: '#3A86FF', fillStyle: 'solid', stroke: '#000', strokeWidth: 4, roughness: 2.5, seed: seed + 33 });
      rc.circle(100, 150, 30, { fill: '#FB5607', fillStyle: 'solid', stroke: '#000', strokeWidth: 3, roughness: 2, seed: seed + 34 });
      rc.circle(canvas.width - 120, canvas.height - 180, 40, { fill: '#FFBE0B', fillStyle: 'solid', stroke: '#000', strokeWidth: 3, roughness: 2, seed: seed + 35 });
    }

    // Text
    const titleFontSize = isMobile ? 48 : 72;
    const enterFontSize = isMobile ? 24 : 32;
    const titleY = isMobile ? centerY - 170 : centerY - 220;
    const enterY = isMobile ? btnY + btnH / 2 + 10 : centerY + 230;

    ctx.font = `bold ${titleFontSize}px "Playfair Display", serif`;
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('Kitaab', centerX, titleY);

    ctx.font = `bold ${enterFontSize}px "Playfair Display", serif`;
    ctx.fillStyle = '#FFF';
    ctx.fillText('ENTER', centerX, enterY);

  }, [seed]);

  return (
    <div className={styles.container}>
      <canvas 
        ref={canvasRef} 
        className={styles.canvas}
        onClick={onEnter}
      />
      
      {/* Overlay text for better readability */}
      <div className={styles.overlay}>
        <motion.div
          className={styles.titleBox}
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <h1 className={styles.title}>Kitaab</h1>
        </motion.div>

        <motion.button
          className={styles.enterButton}
          onClick={onEnter}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ENTER
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;
