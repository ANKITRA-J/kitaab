import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalMusicPlayer.module.css';

interface GlobalMusicPlayerProps {
  musicUrl: string;
}

const GlobalMusicPlayer: React.FC<GlobalMusicPlayerProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Listen for pause events from poem audio
  useEffect(() => {
    const handlePause = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pauseGlobalMusic', handlePause);
    return () => window.removeEventListener('pauseGlobalMusic', handlePause);
  }, [isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <motion.button
        className={styles.musicButton}
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isPlaying ? '🎧' : '🎵'}
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className={styles.nowPlaying}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Now Playing
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={musicUrl} loop />
    </>
  );
};

export default GlobalMusicPlayer;
