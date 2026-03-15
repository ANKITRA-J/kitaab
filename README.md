# Kitaab 📖

A beautiful, bilingual poetry platform with hand-drawn aesthetic, vinyl player, and secure admin panel.

## ✨ Features

- 📖 Book-like poem viewer with smooth animations
- 🎵 Vinyl player with spinning record and animated tonearm
- 🎧 Background music player
- 🌙 Dark mode (grayscale effect)
- 🌐 Bilingual support (Hindi & English)
- 🎨 Vibrant poster-style design
- 📱 Fully responsive
- 🔐 Secure admin authentication
- 📤 Direct audio file uploads
- ✨ Hand-drawn aesthetic with Rough.js

## 🚀 Quick Start

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

### 3. Access Admin Panel
- Visit: `http://localhost:5173/admin`
- Username: `admin`
- Password: `admin123` (change this!)

## 📚 Documentation

- **QUICK-START.md** - 3-step setup guide
- **SECURITY-SETUP.md** - Authentication & database
- **ADMIN-GUIDE.md** - How to use admin panel
- **AUDIO-HOSTING-GUIDE.md** - Audio management
- **GITHUB-SETUP.md** - Push to GitHub & deploy
- **FINAL-SUMMARY.md** - Complete overview

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- Supabase (database & storage)
- Framer Motion (animations)
- Rough.js (hand-drawn style)

## 📦 Project Structure

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

## 🔐 Security

- Admin credentials stored in Supabase (not code)
- `.env.local` gitignored (won't be uploaded)
- HTTPS on Vercel
- Row Level Security policies

## 🌍 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect GitHub to Vercel
3. Add Supabase environment variables
4. Deploy!

## 📝 Default Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change password immediately after setup!**

## 🎯 Next Steps

1. Run database setup SQL
2. Change admin password
3. Test locally
4. Push to GitHub
5. Deploy to Vercel

See **GITHUB-SETUP.md** for detailed instructions.

## 💡 Tips

- Test on mobile before deploying
- Keep `.env.local` private
- Backup poems regularly
- Monitor Supabase usage

## 📞 Need Help?

Check the relevant documentation file:
- Setup issues → QUICK-START.md
- Auth issues → SECURITY-SETUP.md
- Admin panel → ADMIN-GUIDE.md
- Audio issues → AUDIO-HOSTING-GUIDE.md
- GitHub/Vercel → GITHUB-SETUP.md

## 🎨 Customization

Want to make it unique?
- Change color palette
- Add more decorative elements
- Create custom fonts
- Add categories/tags
- Add search functionality

## 📄 License

Open source - feel free to use and modify!

---

**Built with ❤️ for poetry lovers everywhere** ✨
