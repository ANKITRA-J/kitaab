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

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Vibrant colorful background blocks (poster aesthetic)
    rc.rectangle(0, 0, canvas.width * 0.35, canvas.height, {
      fill: '#FF6B9D',
      fillStyle: 'solid',
      roughness: 2.5,
      seed: seed,
    });

    rc.rectangle(canvas.width * 0.35, 0, canvas.width * 0.35, canvas.height, {
      fill: '#FFC857',
      fillStyle: 'solid',
      roughness: 2.5,
      seed: seed + 1,
    });

    rc.rectangle(canvas.width * 0.7, 0, canvas.width * 0.3, canvas.height, {
      fill: '#4ECDC4',
      fillStyle: 'solid',
      roughness: 2.5,
      seed: seed + 2,
    });

    // Draw decorative hand with flowers (poster style)
    const handX = centerX - 200;
    const handY = centerY + 150;

    // Hand/arm
    rc.ellipse(handX, handY, 100, 120, {
      fill: '#FFB4A2',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 4,
      roughness: 2.8,
      seed: seed + 3,
    });

    // Flower stems (green)
    rc.line(handX - 10, handY - 60, handX - 50, handY - 220, {
      stroke: '#2D6A4F',
      strokeWidth: 5,
      roughness: 2.5,
      seed: seed + 4,
    });

    rc.line(handX + 10, handY - 60, handX + 30, handY - 240, {
      stroke: '#2D6A4F',
      strokeWidth: 5,
      roughness: 2.5,
      seed: seed + 5,
    });

    rc.line(handX, handY - 60, handX - 10, handY - 200, {
      stroke: '#2D6A4F',
      strokeWidth: 4,
      roughness: 2.5,
      seed: seed + 6,
    });

    // Flowers (vibrant colors)
    rc.circle(handX - 50, handY - 220, 50, {
      fill: '#FF006E',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
      seed: seed + 7,
    });

    rc.circle(handX + 30, handY - 240, 45, {
      fill: '#FFBE0B',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
      seed: seed + 8,
    });

    rc.circle(handX - 10, handY - 200, 40, {
      fill: '#FB5607',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
      seed: seed + 9,
    });

    // Flower centers
    rc.circle(handX - 50, handY - 220, 15, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 10,
    });

    rc.circle(handX + 30, handY - 240, 15, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 11,
    });

    // Title text box (white background)
    rc.rectangle(centerX - 280, centerY - 320, 560, 180, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 4,
      roughness: 2.8,
      seed: seed + 12,
    });

    // Decorative corner elements on title box
    rc.circle(centerX - 280, centerY - 320, 20, {
      fill: '#8338EC',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 13,
    });

    rc.circle(centerX + 280, centerY - 320, 20, {
      fill: '#3A86FF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 14,
    });

    // Enter button (vibrant)
    rc.rectangle(centerX - 140, centerY + 180, 280, 80, {
      fill: '#FF006E',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 4,
      roughness: 3,
      seed: seed + 15,
    });

    // Decorative elements - stars, circles, doodles
    // Stars (scattered)
    for (let i = 0; i < 8; i++) {
      const x = canvas.width * 0.75 + (i % 3) * 60;
      const y = 80 + Math.floor(i / 3) * 80;
      const size = 12 + (i % 3) * 4;
      
      rc.line(x - size, y, x + size, y, {
        stroke: '#FFBE0B',
        strokeWidth: 4,
        roughness: 2.5,
        seed: seed + 16 + i,
      });
      rc.line(x, y - size, x, y + size, {
        stroke: '#FFBE0B',
        strokeWidth: 4,
        roughness: 2.5,
        seed: seed + 24 + i,
      });
    }

    // Decorative circles (poster style)
    rc.circle(centerX + 250, centerY - 150, 80, {
      stroke: '#8338EC',
      strokeWidth: 5,
      roughness: 2.8,
      seed: seed + 32,
    });

    rc.circle(centerX + 280, centerY + 50, 60, {
      fill: '#3A86FF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 4,
      roughness: 2.5,
      seed: seed + 33,
    });

    // Small accent circles
    rc.circle(100, 150, 30, {
      fill: '#FB5607',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 34,
    });

    rc.circle(canvas.width - 120, canvas.height - 180, 40, {
      fill: '#FFBE0B',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
      seed: seed + 35,
    });

    // Wavy lines (doodles)
    rc.curve(
      [[50, centerY - 100], [100, centerY - 80], [150, centerY - 100], [200, centerY - 80]],
      {
        stroke: '#FF006E',
        strokeWidth: 4,
        roughness: 2.5,
        seed: seed + 36,
      }
    );

    rc.curve(
      [[canvas.width - 200, centerY + 100], [canvas.width - 150, centerY + 120], [canvas.width - 100, centerY + 100]],
      {
        stroke: '#3A86FF',
        strokeWidth: 4,
        roughness: 2.5,
        seed: seed + 37,
      }
    );

    // Text (drawn with canvas, not rough.js) - positioned to match overlay
    ctx.font = 'bold 72px "Playfair Display", serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('Kitaab', centerX, centerY - 220);

    ctx.font = 'bold 32px "Playfair Display", serif';
    ctx.fillStyle = '#FFF';
    ctx.fillText('ENTER', centerX, centerY + 230);

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
