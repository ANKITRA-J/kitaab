import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import styles from './AdminPanel.module.css';

interface Poem {
  id: string;
  title: string;
  subtitle?: string;
  content_hindi: string;
  content_english: string;
  explanation?: string;
  audio_url?: string;
  background_music_url?: string;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [poems, setPoems] = useState<Poem[]>([]);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [contentHindi, setContentHindi] = useState('');
  const [contentEnglish, setContentEnglish] = useState('');
  const [explanation, setExplanation] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [backgroundMusicUrl, setBackgroundMusicUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // File upload refs
  const audioFileRef = useRef<HTMLInputElement>(null);
  const bgMusicFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPoems();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Check credentials against Supabase database
      const { data, error } = await supabase
        .from('admin_users')
        .select('username, password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        setError('Invalid username or password');
        return;
      }

      // Simple password check (in production, use proper hashing)
      // For now, we store plain text password in database
      if (data.password_hash === password) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_username', username);
      } else {
        setError('Invalid username or password');
      }
    } catch (err: any) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  // Check if already authenticated on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_username');
  };

  // Upload file to Supabase Storage
  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploading(false);
      return publicUrl;
    } catch (err: any) {
      setUploading(false);
      setError(`Upload failed: ${err.message}`);
      return null;
    }
  };

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('Please select an audio file');
      return;
    }

    const url = await uploadFile(file, 'poetry-audio');
    if (url) {
      setAudioUrl(url);
      setSuccess('Audio file uploaded successfully!');
    }
  };

  const handleBgMusicFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('Please select an audio file');
      return;
    }

    const url = await uploadFile(file, 'Background Music');
    if (url) {
      setBackgroundMusicUrl(url);
      setSuccess('Background music uploaded successfully!');
    }
  };

  const fetchPoems = async () => {
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching poems:', error);
    } else {
      setPoems(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !contentHindi || !contentEnglish) {
      setError('Title and both language contents are required');
      return;
    }

    try {
      if (editingPoem) {
        // Update existing poem
        const { error } = await supabase
          .from('poems')
          .update({
            title,
            subtitle: subtitle || null,
            content_hindi: contentHindi,
            content_english: contentEnglish,
            explanation: explanation || null,
            audio_url: audioUrl || null,
            background_music_url: backgroundMusicUrl || null,
          })
          .eq('id', editingPoem.id);

        if (error) throw error;
        setSuccess('Poem updated successfully!');
      } else {
        // Create new poem
        const { error } = await supabase
          .from('poems')
          .insert([
            {
              title,
              subtitle: subtitle || null,
              content_hindi: contentHindi,
              content_english: contentEnglish,
              explanation: explanation || null,
              audio_url: audioUrl || null,
              background_music_url: backgroundMusicUrl || null,
            },
          ]);

        if (error) throw error;
        setSuccess('Poem added successfully!');
      }

      // Reset form
      setTitle('');
      setSubtitle('');
      setContentHindi('');
      setContentEnglish('');
      setExplanation('');
      setAudioUrl('');
      setBackgroundMusicUrl('');
      setEditingPoem(null);
      fetchPoems();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleEdit = (poem: Poem) => {
    setEditingPoem(poem);
    setTitle(poem.title);
    setSubtitle(poem.subtitle || '');
    setContentHindi(poem.content_hindi);
    setContentEnglish(poem.content_english);
    setExplanation(poem.explanation || '');
    setAudioUrl(poem.audio_url || '');
    setBackgroundMusicUrl(poem.background_music_url || '');
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this poem?')) return;

    try {
      const { error } = await supabase.from('poems').delete().eq('id', id);
      if (error) throw error;
      setSuccess('Poem deleted successfully!');
      fetchPoems();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleCancelEdit = () => {
    setEditingPoem(null);
    setTitle('');
    setSubtitle('');
    setContentHindi('');
    setContentEnglish('');
    setExplanation('');
    setAudioUrl('');
    setBackgroundMusicUrl('');
    setError('');
    setSuccess('');
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <motion.div
          className={styles.loginBox}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.loginTitle}>Admin Login</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Poetry Admin Panel</h1>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      <div className={styles.content}>
        {/* Form Section */}
        <motion.div
          className={styles.formSection}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className={styles.sectionTitle}>
            {editingPoem ? 'Edit Poem' : 'Add New Poem'}
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter poem title"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Subtitle (optional)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={styles.input}
                placeholder="Enter subtitle (appears below title)"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Content (Hindi) *</label>
              <textarea
                value={contentHindi}
                onChange={(e) => setContentHindi(e.target.value)}
                className={styles.textarea}
                placeholder="Enter poem in Hindi"
                rows={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Content (English) *</label>
              <textarea
                value={contentEnglish}
                onChange={(e) => setContentEnglish(e.target.value)}
                className={styles.textarea}
                placeholder="Enter poem in English"
                rows={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Explanation (optional)</label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className={styles.textarea}
                placeholder="Enter explanation or context (appears on right page)"
                rows={5}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Poetry Audio</label>
              <div className={styles.fileUploadGroup}>
                <input
                  type="url"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className={styles.input}
                  placeholder="https://example.com/audio/poem.mp3 or upload below"
                />
                <div className={styles.uploadSection}>
                  <input
                    ref={audioFileRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => audioFileRef.current?.click()}
                    className={styles.uploadButton}
                    disabled={uploading}
                  >
                    {uploading ? '⏳ Uploading...' : '📁 Upload Audio File'}
                  </button>
                </div>
              </div>
              <small className={styles.hint}>Upload MP3 file or paste URL to audio recording of the poetry narration</small>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Background Music (optional)</label>
              <div className={styles.fileUploadGroup}>
                <input
                  type="url"
                  value={backgroundMusicUrl}
                  onChange={(e) => setBackgroundMusicUrl(e.target.value)}
                  className={styles.input}
                  placeholder="https://example.com/music/instrumental.mp3 or upload below"
                />
                <div className={styles.uploadSection}>
                  <input
                    ref={bgMusicFileRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleBgMusicFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => bgMusicFileRef.current?.click()}
                    className={styles.uploadButton}
                    disabled={uploading}
                  >
                    {uploading ? '⏳ Uploading...' : '📁 Upload Music File'}
                  </button>
                </div>
              </div>
              <small className={styles.hint}>Upload MP3 file or paste URL to instrumental background music</small>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                {editingPoem ? 'Update Poem' : 'Add Poem'}
              </button>
              {editingPoem && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Poems List Section */}
        <motion.div
          className={styles.listSection}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className={styles.sectionTitle}>Existing Poems ({poems.length})</h2>
          <div className={styles.poemsList}>
            {poems.map((poem) => (
              <div key={poem.id} className={styles.poemItem}>
                <h3 className={styles.poemItemTitle}>{poem.title}</h3>
                <p className={styles.poemItemPreview}>
                  {poem.content_hindi.substring(0, 100)}...
                </p>
                <div className={styles.poemItemActions}>
                  <button
                    onClick={() => handleEdit(poem)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(poem.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
