# Kitaab 

A beautiful, bilingual poetry platform with hand-drawn aesthetic, vinyl player, and secure admin panel.

## Features

- Book-like poem viewer with smooth animations
-  Vinyl player with spinning record and animated tonearm
-  Background music player
- Dark mode (grayscale effect)
-  Bilingual support (Hindi & English)
- Vibrant poster-style design
- Fully responsive
- Secure admin authentication
- Direct audio file uploads
- Hand-drawn aesthetic with Rough.js

## Quick Start

### 1. Database Setup
```bash
# In Supabase SQL Editor:
# Copy supabase-final-setup.sql and run it
# Then change admin password in Table Editor
```

### 2. Install & Run
```bash
npm install
npm run dev
```



##  Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- Supabase (database & storage)
- Framer Motion (animations)
- Rough.js (hand-drawn style)

##  Project Structure

```
src/
├── components/
│   ├── HomePage/
│   ├── PoemCard/
│   ├── BookViewer/
│   ├── VinylPlayer/
│   ├── AdminPanel/
│   ├── GlobalMusicPlayer/
│   └── DarkModeToggle/
├── lib/
│   └── supabase.ts
├── types/
│   └── poem.ts
└── App.tsx
```

##  Security

- Admin credentials stored in Supabase (not code)
- Row Level Security policies


## future notes for me

- Change color palette
- Add more decorative elements
- Create custom fonts
- Add categories/tags
- Add search functionality

