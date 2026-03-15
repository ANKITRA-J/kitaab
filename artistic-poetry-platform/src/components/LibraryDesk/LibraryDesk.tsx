import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rough from 'roughjs';
import p5 from 'p5';
import PoemCard from '../PoemCard/PoemCard';
import type { Poem } from '../../types/poem';
import styles from './LibraryDesk.module.css';

interface LibraryDeskProps {}

const mockPoems: Poem[] = [
  {
    id: '1',
    title: 'Raat',
    content: 'रात की चुप्पी में\nतारे बोलते हैं\nचाँद सुनता है',
    language: 'hi',
    audioUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Khamoshi',
    content: 'खामोशी में छुपे\nहज़ारों लफ़्ज़\nदिल की ज़ुबान',
    language: 'hi',
    audioUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Midnight Whispers',
    content: 'In the silence of the night\nWords dance on paper\nInk flows like dreams',
    language: 'en',
    audioUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Particle class for p5.js
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  
  constructor(p: p5, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = p.random(-0.5, 0.5);
    this.vy = p.random(-1, -0.3);
    this.size = p.random(2, 5);
    this.alpha = p.random(100, 200);
  }
  
  update(p: p5) {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
    
    // Wrap around
    if (this.y < 0) this.y = p.height;
    if (this.x < 0) this.x = p.width;
    if (this.x > p.width) this.x = 0;
  }
  
  display(p: p5) {
    p.noStroke();
    p.fill(139, 90, 43, this.alpha);
    p.ellipse(this.x, this.y, this.size);
  }
  
  isDead() {
    return this.alpha <= 0;
  }
}

const LibraryDesk: React.FC<LibraryDeskProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [showPoems, setShowPoems] = useState(false);
  const [poems] = useState<Poem[]>(mockPoems);
  const [buttonHover, setButtonHover] = useState(false);

  // p5.js sketch for particles
  useEffect(() => {
    if (!p5ContainerRef.current || showPoems) return;

    const particles: Particle[] = [];
    
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);
      };

      p.draw = () => {
        p.clear();
        
        // Add new particles occasionally
        if (p.frameCount % 10 === 0 && particles.length < 50) {
          particles.push(new Particle(p, p.random(p.width), p.random(p.height)));
        }
        
        // Update and display particles
        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update(p);
          particles[i].display(p);
          
          if (particles[i].isDead()) {
            particles.splice(i, 1);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5InstanceRef.current = new p5(sketch, p5ContainerRef.current);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [showPoems]);

  // Rough.js journal cover
  useEffect(() => {
    if (!canvasRef.current || showPoems) return;

    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = '#f4e8d0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Journal cover with shadow
    rc.rectangle(centerX - 250, centerY - 350, 500, 700, {
      fill: '#8b4513',
      fillStyle: 'solid',
      stroke: '#654321',
      strokeWidth: 3,
      roughness: 1.5,
    });

    // Inner decorative border
    rc.rectangle(centerX - 230, centerY - 330, 460, 660, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1.2,
    });

    // Corner decorations
    const cornerSize = 30;
    rc.circle(centerX - 220, centerY - 320, cornerSize, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1,
    });
    rc.circle(centerX + 220, centerY - 320, cornerSize, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1,
    });
    rc.circle(centerX - 220, centerY + 320, cornerSize, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1,
    });
    rc.circle(centerX + 220, centerY + 320, cornerSize, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1,
    });

    // Title
    ctx.font = '52px "Playfair Display", serif';
    ctx.fillStyle = '#f4e8d0';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 4;
    ctx.fillText('Poetry', centerX, centerY - 100);
    ctx.fillText('Journal', centerX, centerY - 40);
    ctx.shadowBlur = 0;

    // Decorative lines
    rc.line(centerX - 150, centerY + 20, centerX + 150, centerY + 20, {
      stroke: '#d4af37',
      strokeWidth: 2,
      roughness: 1,
    });

    // Open button
    const buttonColor = buttonHover ? '#f4d03f' : '#d4af37';
    rc.rectangle(centerX - 100, centerY + 150, 200, 60, {
      fill: buttonColor,
      fillStyle: 'solid',
      stroke: '#8b7355',
      strokeWidth: 2,
      roughness: 1.3,
    });

    ctx.font = '24px "Playfair Display", serif';
    ctx.fillStyle = '#3a2a1a';
    ctx.fillText('Open Journal', centerX, centerY + 190);

  }, [showPoems, buttonHover]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (showPoems) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (
      x >= centerX - 100 &&
      x <= centerX + 100 &&
      y >= centerY + 150 &&
      y <= centerY + 210
    ) {
      setShowPoems(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (showPoems) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const isHovering =
      x >= centerX - 100 &&
      x <= centerX + 100 &&
      y >= centerY + 150 &&
      y <= centerY + 210;

    if (isHovering !== buttonHover) {
      setButtonHover(isHovering);
    }
  };

  const handlePoemClick = (id: string) => {
    console.log('Opening poem:', id);
  };

  return (
    <div className={styles.container}>
      {/* p5.js particles background */}
      {!showPoems && <div ref={p5ContainerRef} className={styles.particlesLayer} />}
      
      <AnimatePresence mode="wait">
        {!showPoems ? (
          <motion.canvas
            key="journal"
            ref={canvasRef}
            className={styles.canvas}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
        ) : (
          <motion.div
            key="poems"
            className={styles.poemsView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.poemsGrid}>
              {poems.map((poem, index) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 30, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <PoemCard
                    id={poem.id}
                    title={poem.title}
                    language={poem.language}
                    preview={poem.content.split('\n').slice(0, 3).join('\n')}
                    onClick={handlePoemClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LibraryDesk;
