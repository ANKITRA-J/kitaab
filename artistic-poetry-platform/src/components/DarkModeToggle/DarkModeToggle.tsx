import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDark(saved === 'true');
      document.documentElement.setAttribute('data-theme', saved === 'true' ? 'dark' : 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  return (
    <motion.button
      className={styles.toggleButton}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {isDark ? '☀️' : '🌙'}
    </motion.button>
  );
};

export default DarkModeToggle;
