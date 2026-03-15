import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import styles from './VinylPlayer.module.css';

interface VinylPlayerProps {
  audioUrl: string;
}

const VinylPlayer: React.FC<VinylPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(1);

  // Wiggle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(prev => prev + 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Pause background music when poem audio plays
  useEffect(() => {
    const handlePlay = () => {
      // Dispatch event to pause global music
      window.dispatchEvent(new CustomEvent('pauseGlobalMusic'));
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handlePlay);
      return () => audio.removeEventListener('play', handlePlay);
    }
  }, []);

  // Draw vinyl record with tonearm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas) as RoughCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 250;
    canvas.height = 250;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 100;
    const centerY = 125;

    // Vinyl disc (black) - this will be rotated by motion.div
    rc.circle(centerX, centerY, 160, {
      fill: '#1a1a1a',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 2,
      seed: seed,
    });

    // Inner circle (label area)
    rc.circle(centerX, centerY, 60, {
      fill: '#8B4513',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 1,
    });

    // Center hole
    rc.circle(centerX, centerY, 15, {
      fill: '#FFF',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1,
      seed: seed + 2,
    });

    // Grooves (decorative lines)
    for (let i = 0; i < 5; i++) {
      rc.circle(centerX, centerY, 140 - i * 15, {
        stroke: '#333',
        strokeWidth: 1,
        roughness: 1.5,
        seed: seed + 3 + i,
      });
    }

    // Tonearm (needle arm) - STATIC, positioned on the right side
    const armBaseX = centerX + 85;
    const armBaseY = centerY - 70;
    // When playing: arm moves onto the record
    // When stopped: arm rests away from record
    const armEndX = isPlaying ? centerX + 50 : armBaseX + 5;
    const armEndY = isPlaying ? centerY - 10 : centerY - 40;

    // Tonearm base
    rc.circle(armBaseX, armBaseY, 12, {
      fill: '#C0C0C0',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1.5,
      seed: seed + 8,
    });

    // Tonearm
    rc.line(armBaseX, armBaseY, armEndX, armEndY, {
      stroke: '#C0C0C0',
      strokeWidth: 4,
      roughness: 1.5,
      seed: seed + 9,
    });

    // Needle tip
    rc.circle(armEndX, armEndY, 6, {
      fill: '#FFD700',
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 2,
      roughness: 1,
      seed: seed + 10,
    });
  }, [seed, isPlaying]);

  const togglePlay = () => {
    if (!audioUrl || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <h3 className={styles.title}>Poetry Audio</h3>
        
        {/* Vinyl Record with Tonearm - Only vinyl spins */}
        <div className={styles.playerWrapper}>
          <canvas ref={canvasRef} className={styles.vinyl} />
          <motion.div
            className={styles.vinylOverlay}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Simple Play/Pause Controls */}
        <div className={styles.controls}>
          {audioUrl ? (
            <button 
              onClick={togglePlay} 
              className={styles.playButton}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          ) : (
            <p style={{ fontFamily: 'Playfair Display', color: '#6A5A4A', fontSize: '14px' }}>
              No audio available
            </p>
          )}
        </div>
      </div>

      {/* Hidden audio element */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </div>
  );
};

export default VinylPlayer;
