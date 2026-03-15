import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import styles from './PoemCard.module.css';

interface PoemCardProps {
  id: string;
  title: string;
  language: 'en' | 'hi';
  preview: string;
  onClick: (id: string) => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ id, title, language, preview, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 350;
    canvas.height = 280;

    // Vibrant background colors (rotate through poster palette)
    const bgColors = ['#FF6B9D', '#FFC857', '#4ECDC4', '#8338EC', '#3A86FF', '#FB5607'];
    const bgColor = bgColors[parseInt(id) % bgColors.length];
    const accentColors = ['#FFBE0B', '#FF006E', '#3A86FF', '#FB5607', '#8338EC'];
    const accentColor = accentColors[parseInt(id) % accentColors.length];

    // Clear and fill with vibrant color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw card background with rough.js (poster style)
    rc.rectangle(10, 10, 330, 260, {
      fill: bgColor,
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 4,
      roughness: 2.8,
    });

    // Decorative corner circles
    rc.circle(30, 30, 25, {
      fill: accentColor,
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
    });

    rc.circle(320, 30, 25, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
    });

    // Title background box
    rc.rectangle(30, 60, 290, 70, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
    });

    // Title
    ctx.font = language === 'hi' 
      ? 'bold 26px "Noto Serif Devanagari", serif' 
      : 'bold 26px "Playfair Display", serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(title, 175, 105);

    // Suspense text (no preview)
    ctx.font = '18px "Playfair Display", serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Discover the story ✨', 175, 165);

    // "Read More" button (vibrant)
    rc.rectangle(110, 220, 130, 40, {
      fill: accentColor,
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
    });

    ctx.font = 'bold 16px "Playfair Display", serif';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.fillText('Read More', 175, 246);

    // Decorative doodles
    rc.circle(50, 250, 15, {
      stroke: '#000',
      strokeWidth: 2,
      roughness: 2,
    });

    rc.line(300, 240, 320, 260, {
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2.5,
    });

  }, [title, preview, language, id]);

  return (
    <div 
      className={styles.poemCard}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default PoemCard;
