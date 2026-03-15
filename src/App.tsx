import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HomePage from './components/HomePage/HomePage'
import PoemCard from './components/PoemCard/PoemCard'
import BookViewer from './components/BookViewer/BookViewer'
import AdminPanel from './components/AdminPanel/AdminPanel'
import GlobalMusicPlayer from './components/GlobalMusicPlayer/GlobalMusicPlayer'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'
import { supabase } from './lib/supabase'
import type { Poem } from './types/poem'
import './App.css'

// Background music from Supabase Storage
// User's uploaded background music
const BACKGROUND_MUSIC_URL = 'https://lziulkylvlpxtnymoume.supabase.co/storage/v1/object/public/Background%20Music/Lights%20Are%20On%20(Instrumental).mp3'

function App() {
  const [showPoems, setShowPoems] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null)
  const [poems, setPoems] = useState<Poem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if URL has /admin
    if (window.location.pathname === '/admin') {
      setShowAdmin(true)
    }
  }, [])

  useEffect(() => {
    if (showPoems) {
      fetchPoems()
    }
  }, [showPoems])

  const fetchPoems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching poems:', error)
    } else {
      setPoems(data || [])
    }
    setLoading(false)
  }

  const handlePoemClick = (id: string) => {
    const poem = poems.find(p => p.id === id)
    if (poem) {
      setSelectedPoem(poem)
    }
  }

  const handleClosePoem = () => {
    setSelectedPoem(null)
  }

  const handleCloseBook = () => {
    setSelectedPoem(null)
  }

  if (showAdmin) {
    return <AdminPanel />
  }

  if (selectedPoem) {
    return (
      <>
        <BookViewer
          title={selectedPoem.title}
          subtitle={selectedPoem.subtitle}
          contentHindi={selectedPoem.content_hindi}
          contentEnglish={selectedPoem.content_english}
          explanation={selectedPoem.explanation}
          audioUrl={selectedPoem.audio_url}
          backgroundMusicUrl={selectedPoem.background_music_url}
          onClose={handleClosePoem}
        />
        <GlobalMusicPlayer musicUrl={BACKGROUND_MUSIC_URL} />
        <DarkModeToggle />
      </>
    )
  }

  if (!showPoems) {
    return (
      <>
        <HomePage onEnter={() => setShowPoems(true)} />
        <GlobalMusicPlayer musicUrl={BACKGROUND_MUSIC_URL} />
        <DarkModeToggle />
      </>
    )
  }

  return (
    <>
      <motion.div
        style={{
          minHeight: '100vh',
          background: '#1a1a1a',
          padding: '4rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        {/* Back to Home button */}
        <button
          onClick={() => setShowPoems(false)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: '#FFC857',
            border: '3px solid #000',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          title="Back to Home"
        >
          🏠
        </button>

        {loading ? (
          <div style={{ color: '#FFF', fontSize: '24px', fontFamily: 'Playfair Display' }}>
            Loading poems...
          </div>
        ) : poems.length === 0 ? (
          <div style={{ color: '#FFF', fontSize: '24px', fontFamily: 'Playfair Display', textAlign: 'center' }}>
            No poems yet. Visit /admin to add some!
          </div>
        ) : (
          poems.map(poem => (
            <PoemCard
              key={poem.id}
              id={poem.id}
              title={poem.title}
              language={poem.language}
              preview={poem.content_hindi.substring(0, 100)}
              onClick={handlePoemClick}
            />
          ))
        )}
      </motion.div>
      <GlobalMusicPlayer musicUrl={BACKGROUND_MUSIC_URL} />
      <DarkModeToggle />
    </>
  )
}

export default App
